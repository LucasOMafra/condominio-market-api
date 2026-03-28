package com.condominiomarket.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;

// Representa cada produto dentro de um pedido
@Entity
@Table(name = "itens_pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Pedido ao qual esse item pertence
    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;

    // Produto bipado
    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    // Quantidade bipada
    @NotNull
    @Min(1)
    @Column(nullable = false)
    private Integer quantidade;

    // Preço no momento da compra — congelado para não mudar se o produto for atualizado
    @NotNull
    @Column(nullable = false)
    private BigDecimal precoUnitario;
}