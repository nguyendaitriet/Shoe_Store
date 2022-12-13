package com.shoe.controller.api;

import com.shoe.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductAPI {

    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity<?> getHomePageProductList() {
        return new ResponseEntity<>(productService.findAllHomeProducts(), HttpStatus.OK);
    }


}
