package com.shopverse.config;

import com.shopverse.product.Product;
import com.shopverse.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.math.BigDecimal;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedProducts(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new Product("Studio Headphones", "Immersive sound, soft ear cushions and a foldable design for everyday listening.", "Electronics", new BigDecimal("3499.00"), "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900", 24));
                repository.save(new Product("Everyday Backpack", "A clean, durable backpack with a padded laptop sleeve and smart storage.", "Accessories", new BigDecimal("2199.00"), "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900", 18));
                repository.save(new Product("Minimal Watch", "A timeless everyday watch with a simple dial and comfortable strap.", "Accessories", new BigDecimal("4299.00"), "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900", 12));
                repository.save(new Product("Running Sneakers", "Lightweight trainers designed for comfortable daily movement.", "Fashion", new BigDecimal("2899.00"), "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900", 30));
                repository.save(new Product("Desk Lamp", "Warm, focused lighting with a compact silhouette for your workspace.", "Home", new BigDecimal("1599.00"), "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900", 15));
                repository.save(new Product("Ceramic Coffee Set", "A modern ceramic cup set for slow mornings and relaxed evenings.", "Home", new BigDecimal("999.00"), "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=900", 40));
            }
        };
    }
}
