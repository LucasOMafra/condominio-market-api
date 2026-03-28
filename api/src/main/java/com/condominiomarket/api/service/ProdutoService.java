package com.condominiomarket.api.service;

import com.condominiomarket.api.dto.ProdutoResponseDTO;
import com.condominiomarket.api.model.Produto;
import com.condominiomarket.api.repository.ProdutoRepository;
import com.condominiomarket.api.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    // Precisamos do CategoriaRepository para buscar a categoria completa no banco
    private final CategoriaRepository categoriaRepository;

    private ProdutoResponseDTO toDTO(Produto produto) {
        return ProdutoResponseDTO.builder()
                .id(produto.getId())
                .nome(produto.getNome())
                .descricao(produto.getDescricao())
                .preco(produto.getPreco())
                .estoque(produto.getEstoque())
                .categoriaId(produto.getCategoria() != null ? produto.getCategoria().getId() : null)
                .categoriaNome(produto.getCategoria() != null ? produto.getCategoria().getNome() : null)
                .build();
    }

    // Busca a categoria no banco pelo ID antes de salvar o produto
    private Produto resolverCategoria(Produto produto) {
        if (produto.getCategoria() != null && produto.getCategoria().getId() != null) {
            produto.setCategoria(
                categoriaRepository.findById(produto.getCategoria().getId())
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada com id: " + produto.getCategoria().getId()))
            );
        }
        return produto;
    }

    public List<ProdutoResponseDTO> listarTodos() {
        return produtoRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public ProdutoResponseDTO buscarPorId(Long id) {
        return toDTO(produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com id: " + id)));
    }

    public ProdutoResponseDTO criar(Produto produto) {
        return toDTO(produtoRepository.save(resolverCategoria(produto)));
    }

    public ProdutoResponseDTO atualizar(Long id, Produto produtoAtualizado) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com id: " + id));
        produto.setNome(produtoAtualizado.getNome());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setPreco(produtoAtualizado.getPreco());
        produto.setEstoque(produtoAtualizado.getEstoque());
        produto.setCategoria(resolverCategoria(produtoAtualizado).getCategoria());
        return toDTO(produtoRepository.save(produto));
    }

    public void deletar(Long id) {
        buscarPorId(id);
        produtoRepository.deleteById(id);
    }
}