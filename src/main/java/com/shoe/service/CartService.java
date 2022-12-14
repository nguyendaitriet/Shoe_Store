package com.shoe.service;

import com.shoe.dto.cart.CartProductParam;
import com.shoe.model.CartProduct;

import java.util.List;

public interface CartService {
    List<CartProduct> getAllCartProducts();
    void addProduct(CartProductParam cartProductParam);
    void removeProduct(int id);
}
