package com.rensystem.apirest.apirest.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity //Con este decorador JAVA ya sabe que esta clase es de tipo ENTIDAD
public class Product {

    @Id //Identificador unico de cada producto, clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Estrategia de Creacion

    //Atributo al cual nos referimos(ID)
    private Long id;
    private String nombre;
    private double precio;


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public double getPrecio() {
        return precio;
    }
    public void setPrecio(double precio) {
        this.precio = precio;
    }

}
