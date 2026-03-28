package com.condominiomarket.api.dto;

import lombok.*;
import java.math.BigDecimal;

// Objeto que define exatamente o que retornamos ao cliente
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProdutoResponseDTO {

    private Long id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private Integer estoque;

    // Retorna apenas o necessário da categoria, sem expor a entidade inteira
    private Long categoriaId;
    private String categoriaNome;
}