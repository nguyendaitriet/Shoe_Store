package com.shoe.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "order_item")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "createdAt")
    private Instant createdAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "orderId", nullable = false)
    private Order order;

    @ManyToOne(optional = false)
    @JoinColumn(name = "productItemId", nullable = false)
    private ProductItem productItem;
}
