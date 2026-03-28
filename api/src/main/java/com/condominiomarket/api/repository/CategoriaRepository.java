package com.condominiomarket.api.repository;

import com.condominiomarket.api.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Responsável pelo acesso ao banco para operações de Categoria
@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}