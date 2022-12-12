package com.shoe.entity;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "user")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "username", length = 100, nullable = false)
    private String username;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "fullName", length = 100, nullable = false)
    private String fullName;

    @Column(name = "phoneNumber", length = 50, nullable = false)
    private String phoneNumber;

    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "registeredAt")
    private Instant registeredAt;

    @Column(name = "role", length = 50, nullable = false)
    private String role;

}
