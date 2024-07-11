package com.rensystem.apirest.apirest.Controllers;

import org.springframework.web.bind.annotation.RestController;

import com.rensystem.apirest.apirest.Repositories.ProductRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.rensystem.apirest.apirest.Entities.Product;

//JPA trae todas las herramientas para poder conectarme a una base de datos

//direcciones, urls para que las personas puedan consumir la informacion
@RestController
@RequestMapping("/product")
//Con esas 2 lineas ya tenemos disponible /productos

public class ProductController {

    @Autowired //inyectamos una instancia en nuestro repositorio.
    private ProductRepository productRepository;

    //===============METODOS HTTP===============//
    //TRAEMOS INFORMACION
    @GetMapping
    public List<Product> getAllProducts(){
        return productRepository.findAll(); //Traemos todos los productos del repositorio
    }

    @GetMapping("/{id}") //reciba en la barra id
    public Product getProductByID(@PathVariable Long id){
        return productRepository.findById(id)
        .orElseThrow(()-> new RuntimeException("No se encontro el producto con el ID: " + id));
    }


    @PostMapping
    public Product createProduct(@RequestBody Product producto){
        return productRepository.save(producto);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id ,@RequestBody Product detallesProducto ) {
        Product productFinded = productRepository.findById(id)
        .orElseThrow(()-> new RuntimeException("No se encontro el producto con el ID: " + id));

        productFinded.setNombre(detallesProducto.getNombre());
        productFinded.setPrecio(detallesProducto.getPrecio());

        return productRepository.save(productFinded);
    }
    
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id){
        Product productFinded = productRepository.findById(id)
        .orElseThrow(()-> new RuntimeException("No se encontro el producto con el ID: " + id));

        productRepository.delete(productFinded);
        return "El producto con el ID: " + id + " fue eliminado correctamente";
    }

}
