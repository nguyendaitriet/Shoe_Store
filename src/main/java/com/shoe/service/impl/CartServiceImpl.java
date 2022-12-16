package com.shoe.service.impl;

import com.shoe.dto.cart.CartProductParam;
import com.shoe.mapper.CartMapper;
import com.shoe.model.CartProduct;
import com.shoe.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;


import java.util.*;

@Service
@SessionScope
public class CartServiceImpl implements CartService {

    private ArrayList<CartProduct> cartList;

    @Autowired
    private CartMapper cartMapper;

    public CartServiceImpl(ArrayList<CartProduct> cartList) {
        this.cartList = cartList;
    }

    @Override
    public ArrayList<CartProduct> getAllCartProducts() {
        modifyCartProductList(cartList);
        cartList.sort(Comparator.comparing(CartProduct::getTitle));
        return cartList;
    }

    @Override
    public void addProduct(CartProductParam cartProductParam) {
        cartList.add(cartMapper.toCartProduct(cartProductParam));
    }

    @Override
    public void updateProduct(ArrayList<CartProductParam> cartProductUpdateList) {
        List<CartProduct> newCartList = cartProductUpdateList.stream().map((item) -> cartMapper.toCartProduct(item)).toList();
        cartList = new ArrayList<>(newCartList) ;
    }

    //Interface Comparable: int compareTo(Object o);
    //Interface Comparator: int compare(Object o1, Object o2);
    public void modifyCartProductList(ArrayList<CartProduct> cartProductList) {
        cartProductList.sort(Comparator.comparing(CartProduct::getProductItemId));
        for (int i = 0; i < cartProductList.size() - 1; ) {
            CartProduct cartProduct1 = cartProductList.get(i);
            CartProduct cartProduct2 = cartProductList.get(i + 1);
            if (cartProduct1.equals(cartProduct2)) {
                cartProduct1.setQuantity(cartProduct1.getQuantity() + cartProduct2.getQuantity());
                cartProduct1.setTotalPrice(cartProduct1.getTotalPrice().add(cartProduct2.getTotalPrice()));
                cartProductList.remove(i + 1);
                continue;
            }
            i++;
        }

    }

    @Override
    public void removeProduct(int productItemId) {
        cartList.remove(new CartProduct(productItemId));
    }
}
