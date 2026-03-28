package com.condominiomarket.api.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// Representa uma compra no mini market
@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Morador que está fazendo a compra
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    // Status atual do pedido
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusPedido status;

    // Total calculado na finalização
    @Column(nullable = false)
    private BigDecimal total;

    // Data e hora da criação do pedido
    @Column(nullable = false)
    private LocalDateTime dataCriacao;

    // Lista de itens do carrinho
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ItemPedido> itens = new ArrayList<>();
}