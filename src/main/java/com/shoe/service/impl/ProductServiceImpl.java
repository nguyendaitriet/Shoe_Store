package com.shoe.service.impl;

import com.shoe.dao.ProductDAO;
import com.shoe.dto.product.HomeProductResult;
import com.shoe.entity.Product;
import com.shoe.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductDAO productDAO;

    @Override
    public List<HomeProductResult> findAllHomeProducts() {
        return productDAO.findAllHomeProducts();
    }
}
