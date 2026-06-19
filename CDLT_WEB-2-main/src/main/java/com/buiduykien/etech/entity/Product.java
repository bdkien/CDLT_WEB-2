package com.buiduykien.etech.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String brand;

    @Column(columnDefinition = "TEXT")
    private String description;

   @Column(nullable = false)
    private BigDecimal price;

    // URL hình ảnh sản phẩm
    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    // Một sản phẩm có nhiều biến thể (màu sắc, bộ nhớ)
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductVariant> variants;
}
