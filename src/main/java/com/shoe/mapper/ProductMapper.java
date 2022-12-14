package com.shoe.mapper;

import com.shoe.dto.product.HomeProductResult;
import com.shoe.entity.Product;
import com.shoe.entity.Size;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductMapper {

    public HomeProductResult toDTO(Product product, List<Size> sizeList) {
        return new HomeProductResult()
                .setId(product.getId())
                .setPhoto(product.getPhoto())
                .setPrice(product.getPrice())
                .setTitle(product.getTitle())
                .setSizeList(sizeList);
    }
}
