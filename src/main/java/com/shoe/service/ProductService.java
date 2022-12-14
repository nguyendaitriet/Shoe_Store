package com.shoe.service;

import com.shoe.dto.product.HomeProductResult;
import com.shoe.entity.Product;

import java.util.List;

public interface ProductService {

    List<HomeProductResult> findAllHomeProducts();
}
