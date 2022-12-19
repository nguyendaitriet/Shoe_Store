package com.shoe.service;

import com.shoe.dto.cart.CartProductParam;
import com.shoe.model.CartProduct;

import java.util.ArrayList;
import java.util.List;

public interface CartService {
    ArrayList<CartProduct> getAllCartProducts();
    void addProduct(CartProductParam cartProductParam);
    void updateProduct(ArrayList<CartProductParam> cartProductUpdateList);
    void removeAllProducts();
    void removeProduct(int id);
}
