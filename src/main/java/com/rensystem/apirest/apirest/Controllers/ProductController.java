package com.rensystem.apirest.apirest.Controllers;

import com.rensystem.apirest.apirest.Entities.Product;
import com.rensystem.apirest.apirest.Repositories.ProductRepository;
import com.rensystem.apirest.apirest.dto.ProductDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // Convierte un Product en un ProductDTO
    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setNombre(product.getNombre());
        dto.setPrecio(product.getPrecio());
        dto.setOrden(product.getOrden()); // Incluye el campo orden
        return dto;
    }

    // Convierte un ProductDTO en un Product
    private Product convertToEntity(ProductDTO dto) {
        Product product = new Product();
        product.setId(dto.getId());
        product.setNombre(dto.getNombre());
        product.setPrecio(dto.getPrecio());
        product.setOrden(dto.getOrden()); // Incluye el campo orden
        return product;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productRepository.findAllByOrderByOrdenAsc(); // Usa el método de ordenamiento
        List<ProductDTO> productDTOs = products.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.ok(productDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductByID(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));
        return ResponseEntity.ok(convertToDTO(product));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        // Obtener el valor máximo de orden
        Long maxOrden = productRepository.findMaxOrden();
        // Asignar el siguiente valor de orden
        Product product = convertToEntity(productDTO);
        product.setOrden(maxOrden + 1);

        Product createdProduct = productRepository.save(product);
        return ResponseEntity.status(201).body(convertToDTO(createdProduct)); // 201 Created
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        Product productFinded = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));

        productFinded.setNombre(productDTO.getNombre());
        productFinded.setPrecio(productDTO.getPrecio());
        productFinded.setOrden(productDTO.getOrden()); // Actualiza el campo orden

        Product updatedProduct = productRepository.save(productFinded);
        return ResponseEntity.ok(convertToDTO(updatedProduct));
    }

    @PostMapping("/update-order")
    @Transactional
    public ResponseEntity<Void> updateProductOrder(@RequestBody List<ProductDTO> productDTOs) {
        for (int i = 0; i < productDTOs.size(); i++) {
            ProductDTO dto = productDTOs.get(i);
            Product product = productRepository.findById(dto.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + dto.getId()));
            product.setOrden((long) i);
            productRepository.save(product);
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        Product productFinded = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No se encontró el producto con el ID: " + id));

        productRepository.delete(productFinded);

        return ResponseEntity.ok().body("{\"message\": \"El producto con el ID: " + id + " fue eliminado correctamente\"}");
    }



}