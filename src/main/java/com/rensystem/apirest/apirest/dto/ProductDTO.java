package com.rensystem.apirest.apirest.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;
    private String nombre;
    private Double precio;
    private Long orden;
}

