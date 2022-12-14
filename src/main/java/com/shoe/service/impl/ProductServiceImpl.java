package com.shoe.service.impl;

import com.shoe.dao.ProductDAO;
import com.shoe.dto.product.HomeProductResult;
import com.shoe.entity.Product;
import com.shoe.mapper.ProductMapper;
import com.shoe.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductDAO productDAO;
    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<HomeProductResult> findAllHomeProducts() {
        List<Product>productList = productDAO.findAll();

        return productList.stream().map(item ->
                productMapper.toDTO(item, productDAO.findAllSizeById(item.getId()))
        ).toList();
    }
}
