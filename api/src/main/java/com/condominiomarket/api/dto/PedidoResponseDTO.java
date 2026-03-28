package com.condominiomarket.api.dto;

import com.condominiomarket.api.model.StatusPedido;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PedidoResponseDTO {
    private Long id;
    private Long clienteId;
    private String clienteNome;
    private StatusPedido status;
    private BigDecimal total;
    private LocalDateTime dataCriacao;
    private List<ItemPedidoResponseDTO> itens;
}