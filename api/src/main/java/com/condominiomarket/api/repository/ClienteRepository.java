package com.condominiomarket.api.repository;

import com.condominiomarket.api.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    // O Spring gera a query automaticamente pelo nome do método
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
}