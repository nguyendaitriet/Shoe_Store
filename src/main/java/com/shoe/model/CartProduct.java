package com.shoe.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class CartProduct {
    private int productId;
    private int sizeId;
    private String photo;
    private String title;
    private int quantity;
    private BigDecimal totalPrice;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartProduct that = (CartProduct) o;
        return productId == that.productId && sizeId == that.sizeId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, sizeId);
    }
}
