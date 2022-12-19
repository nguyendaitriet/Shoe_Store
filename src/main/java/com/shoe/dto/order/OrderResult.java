package com.shoe.dto.order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.time.Instant;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class OrderResult {
    private Integer id;
    private String fullName;
    private String address;
    private String phoneNumber;
    private BigDecimal totalPrice;
    private Long totalItems;
    private Instant creationDate;
}
