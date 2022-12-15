package com.shoe.service.impl;

import com.shoe.dao.ProductDAO;
import com.shoe.dto.cart.CartProductParam;
import com.shoe.entity.Product;
import com.shoe.model.CartProduct;
import com.shoe.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.math.BigDecimal;
import java.util.*;

@Service
@SessionScope
public class CartServiceImpl implements CartService {

    private final ArrayList<CartProduct> cartList;

    @Autowired
    ProductDAO productDAO;

    public CartServiceImpl(ArrayList<CartProduct> cartList) {
        this.cartList = cartList;
    }

    @Override
    public List<CartProduct> getAllCartProducts() {
        modifyCartProductList(cartList);
        return cartList;
    }

    @Override
    public void addProduct(CartProductParam cartProductParam) {
        Product product = productDAO.findById(cartProductParam.getProductId()).get();
        BigDecimal totalPrice = product.getPrice().multiply(new BigDecimal(cartProductParam.getQuantity()));
        CartProduct newCartProduct = new CartProduct()
                .setProductId(cartProductParam.getProductId())
                .setTitle(product.getTitle())
                .setPhoto(product.getPhoto())
                .setQuantity(cartProductParam.getQuantity())
                .setPrice(product.getPrice())
                .setTotalPrice(totalPrice)
                .setSizeId(cartProductParam.getSizeId());
        cartList.add(newCartProduct);
        System.out.println(cartList);
    }

    public void modifyCartProductList(ArrayList<CartProduct> cartProductList) {
        cartProductList.sort(Comparator.comparing(CartProduct::getProductId).thenComparingInt(CartProduct::getQuantity));
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
    public void removeProduct(int id) {

    }
}
