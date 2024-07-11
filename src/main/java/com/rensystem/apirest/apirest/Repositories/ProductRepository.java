package com.rensystem.apirest.apirest.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rensystem.apirest.apirest.Entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
       
}
