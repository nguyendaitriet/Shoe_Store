package com.shoe.service;

import com.shoe.dto.product.HomeProductResult;

import java.util.List;

public interface ProductService {
    List<HomeProductResult> findAllHomeProducts();
}
