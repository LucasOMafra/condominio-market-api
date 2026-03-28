package com.condominiomarket.api.service;

import com.condominiomarket.api.dto.ItemPedidoResponseDTO;
import com.condominiomarket.api.dto.PedidoResponseDTO;
import com.condominiomarket.api.model.*;
import com.condominiomarket.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;
    private final ItemPedidoRepository itemPedidoRepository;

    // Converte o pedido para DTO evitando referência circular
    private PedidoResponseDTO toDTO(Pedido pedido) {
        List<ItemPedidoResponseDTO> itensDTO = pedido.getItens().stream()
                .map(item -> ItemPedidoResponseDTO.builder()
                        .id(item.getId())
                        .produtoId(item.getProduto().getId())
                        .produtoNome(item.getProduto().getNome())
                        .quantidade(item.getQuantidade())
                        .precoUnitario(item.getPrecoUnitario())
                        .subtotal(item.getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuantidade())))
                        .build())
                .toList();

        return PedidoResponseDTO.builder()
                .id(pedido.getId())
                .clienteId(pedido.getCliente().getId())
                .clienteNome(pedido.getCliente().getNome())
                .status(pedido.getStatus())
                .total(pedido.getTotal())
                .dataCriacao(pedido.getDataCriacao())
                .itens(itensDTO)
                .build();
    }

    public PedidoResponseDTO criarPedido(Long clienteId) {
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com id: " + clienteId));

        Pedido pedido = Pedido.builder()
                .cliente(cliente)
                .status(StatusPedido.ABERTO)
                .total(BigDecimal.ZERO)
                .dataCriacao(LocalDateTime.now())
                .build();

        return toDTO(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponseDTO adicionarItem(Long pedidoId, Long produtoId, Integer quantidade) {
        Pedido pedido = buscarPedidoPorId(pedidoId);

        if (pedido.getStatus() != StatusPedido.ABERTO) {
            throw new RuntimeException("Não é possível adicionar itens a um pedido " + pedido.getStatus());
        }

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com id: " + produtoId));

        if (produto.getEstoque() < quantidade) {
            throw new RuntimeException("Estoque insuficiente. Disponível: " + produto.getEstoque());
        }

        pedido.getItens().stream()
                .filter(item -> item.getProduto().getId().equals(produtoId))
                .findFirst()
                .ifPresentOrElse(
                        item -> item.setQuantidade(item.getQuantidade() + quantidade),
                        () -> pedido.getItens().add(ItemPedido.builder()
                                .pedido(pedido)
                                .produto(produto)
                                .quantidade(quantidade)
                                .precoUnitario(produto.getPreco())
                                .build())
                );

        return toDTO(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponseDTO removerItem(Long pedidoId, Long itemId) {
        Pedido pedido = buscarPedidoPorId(pedidoId);

        if (pedido.getStatus() != StatusPedido.ABERTO) {
            throw new RuntimeException("Não é possível remover itens de um pedido " + pedido.getStatus());
        }

        pedido.getItens().removeIf(item -> item.getId().equals(itemId));
        return toDTO(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponseDTO finalizar(Long pedidoId) {
        Pedido pedido = buscarPedidoPorId(pedidoId);

        if (pedido.getStatus() != StatusPedido.ABERTO) {
            throw new RuntimeException("Pedido já está " + pedido.getStatus());
        }

        if (pedido.getItens().isEmpty()) {
            throw new RuntimeException("Não é possível finalizar um pedido sem itens");
        }

        BigDecimal total = BigDecimal.ZERO;
        for (ItemPedido item : pedido.getItens()) {
            Produto produto = item.getProduto();
            produto.setEstoque(produto.getEstoque() - item.getQuantidade());
            produtoRepository.save(produto);
            total = total.add(item.getPrecoUnitario().multiply(BigDecimal.valueOf(item.getQuantidade())));
        }

        pedido.setTotal(total);
        pedido.setStatus(StatusPedido.FECHADO);
        return toDTO(pedidoRepository.save(pedido));
    }

    @Transactional
    public PedidoResponseDTO cancelar(Long pedidoId) {
        Pedido pedido = buscarPedidoPorId(pedidoId);

        if (pedido.getStatus() != StatusPedido.ABERTO) {
            throw new RuntimeException("Pedido já está " + pedido.getStatus());
        }

        pedido.setStatus(StatusPedido.CANCELADO);
        return toDTO(pedidoRepository.save(pedido));
    }

    public List<PedidoResponseDTO> listarTodos() {
        return pedidoRepository.findAll().stream().map(this::toDTO).toList();
    }

    public List<PedidoResponseDTO> listarPorCliente(Long clienteId) {
        return pedidoRepository.findByClienteId(clienteId).stream().map(this::toDTO).toList();
    }

    public PedidoResponseDTO buscarPorId(Long id) {
        return toDTO(buscarPedidoPorId(id));
    }

    // Método interno que retorna a entidade para uso dentro do service
    private Pedido buscarPedidoPorId(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com id: " + id));
    }
}