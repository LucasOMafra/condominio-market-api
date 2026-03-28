package com.condominiomarket.api.repository;

import com.condominiomarket.api.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    // Busca todos os pedidos de um cliente específico
    java.util.List<Pedido> findByClienteId(Long clienteId);
}