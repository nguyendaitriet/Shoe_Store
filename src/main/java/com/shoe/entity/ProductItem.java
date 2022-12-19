package com.shoe.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "product_item")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProductItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "createdAt")
    private Instant createdAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sizeId", nullable = false)
    private Size size;

    @ManyToOne(optional = false)
    @JoinColumn(name = "productId", nullable = false)
    private Product product;

    public ProductItem(int id) {
        this.id = id;
    }
}


