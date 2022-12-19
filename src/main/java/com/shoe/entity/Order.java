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
@Table(name = "\"order\"")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "totalPrice", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "createdAt")
    private Instant createdAt;

    @ManyToOne(optional = false)
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(name = "fullName", length = 100)
    private String fullName;

    @Column(name = "phoneNumber", length = 50)
    private String phoneNumber;

    @Column(name = "address", length = 500)
    private String address;
}
