package com.shopverse.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotBlank
    @Column(nullable = false, length = 1200)
    private String description;

    @NotBlank
    @Column(nullable = false)
    private String category;

    @NotNull
    @DecimalMin("0.01")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotBlank
    @Column(nullable = false, length = 1000)
    private String imageUrl;

    @Min(0)
    @Column(nullable = false)
    private int stock;

    protected Product() {}

    public Product(String name, String description, String category,
                   BigDecimal price, String imageUrl, int stock) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.imageUrl = imageUrl;
        this.stock = stock;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getCategory() { return category; }
    public BigDecimal getPrice() { return price; }
    public String getImageUrl() { return imageUrl; }
    public int getStock() { return stock; }
}
