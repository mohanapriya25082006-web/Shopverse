package com.shopverse.product;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Product> getProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category) {
        List<Product> products;
        if (q != null && !q.isBlank()) {
            products = repository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q);
        } else if (category != null && !category.equalsIgnoreCase("All")) {
            products = repository.findByCategoryIgnoreCase(category);
        } else {
            products = repository.findAll();
        }

        if (q != null && !q.isBlank() && category != null && !category.equalsIgnoreCase("All")) {
            products = products.stream()
                    .filter(p -> p.getCategory().equalsIgnoreCase(category))
                    .toList();
        }
        return products;
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }
}
