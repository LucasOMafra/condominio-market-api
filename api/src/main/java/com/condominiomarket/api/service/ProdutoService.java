package com.condominiomarket.api.service;

import com.condominiomarket.api.model.Produto;
import com.condominiomarket.api.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

// Camada de regras de negócio
@Service
@RequiredArgsConstructor
public class ProdutoService {

    // O Spring injeta o repositório automaticamente (sem precisar de new)
    private final ProdutoRepository produtoRepository;

    // Retorna todos os produtos do banco
    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    // Busca um produto pelo ID, lança exceção se não encontrar
    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com id: " + id));
    }

    // Salva um produto novo no banco
    public Produto criar(Produto produto) {
        return produtoRepository.save(produto);
    }

    // Atualiza os dados de um produto existente
    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto produto = buscarPorId(id);
        produto.setNome(produtoAtualizado.getNome());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setPreco(produtoAtualizado.getPreco());
        produto.setEstoque(produtoAtualizado.getEstoque());
        return produtoRepository.save(produto);
    }

    // Remove um produto do banco pelo ID
    public void deletar(Long id) {
        buscarPorId(id); // garante que existe antes de deletar
        produtoRepository.deleteById(id);
    }
}