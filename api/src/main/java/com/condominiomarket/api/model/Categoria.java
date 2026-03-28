package com.condominiomarket.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

// Representa a tabela de categorias no banco
@Entity
@Table(name = "categorias")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Categoria {

    // Chave primária gerada automaticamente
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Nome da categoria — obrigatório e único
    @NotBlank
    @Column(nullable = false, unique = true)
    private String nome;

    // Descrição opcional da categoria
    private String descricao;
}