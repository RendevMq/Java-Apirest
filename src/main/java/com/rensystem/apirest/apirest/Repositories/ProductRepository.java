package com.rensystem.apirest.apirest.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rensystem.apirest.apirest.Entities.Product;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByOrderByOrdenAsc();
    @Query("SELECT COALESCE(MAX(p.orden), 0) FROM Product p")
    Long findMaxOrden();
}
