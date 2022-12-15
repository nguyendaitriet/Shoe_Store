package com.shoe.dto.product;

import com.shoe.dto.cart.CartProductParam;
import com.shoe.entity.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class HomeProductResult {
    private Integer id;
    private String title;
    private BigDecimal price;
    private String photo;
    private List<Size> sizeList;

}

