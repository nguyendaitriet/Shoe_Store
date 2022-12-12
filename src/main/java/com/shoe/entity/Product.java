package com.shoe.entity;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "product")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "createdAt")
    private Instant createdAt;

    @Column(name = "photo", length = 500)
    private String photo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sizeId", nullable = false)
    private Size size;

    @ManyToOne(optional = false)
    @JoinColumn(name = "brandId", nullable = false)
    private Brand brand;
}
