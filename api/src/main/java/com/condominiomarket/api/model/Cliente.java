package com.condominiomarket.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

// Representa o morador do condomínio que faz compras no market
@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nome;

    // CPF único por cliente
    @NotBlank
    @Column(nullable = false, unique = true)
    private String cpf;

    // Email único por cliente
    @Email
    @NotBlank
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String telefone;

    // Número do apartamento do morador
    @NotBlank
    @Column(nullable = false)
    private String apartamento;

    // Torre do apartamento do morador
    @NotBlank
    @Column(nullable = false)
    private String torre;
}