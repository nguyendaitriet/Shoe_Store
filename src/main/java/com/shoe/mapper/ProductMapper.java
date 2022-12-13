package com.shoe.mapper;

import com.shoe.dto.product.HomeProductResult;
import com.shoe.entity.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public HomeProductResult toDTO(Product product) {
        return new HomeProductResult()
                .setPhoto(product.getPhoto())
                .setPrice(product.getPrice())
                .setTitle(product.getTitle());
    }
}
