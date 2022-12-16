package com.shoe.model;

import com.shoe.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class CartProduct {
    private int productItemId;
    private int sizeId;
    private String photo;
    private String title;
    private BigDecimal price;
    private int quantity;
    private BigDecimal totalPrice;
    private List<Size> sizeList;
    private int productId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartProduct that = (CartProduct) o;
        return productItemId == that.productItemId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(productItemId);
    }

}
