package com.shoe.service.impl;

import com.shoe.dto.order.OrderInfoParam;
import com.shoe.model.CartProduct;
import com.shoe.service.CartService;
import com.shoe.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private CartService cartService;

    @Override
    public void createNewOrder(OrderInfoParam orderInfoParam) {
        BigDecimal grandTotalPrice = new BigDecimal("0");
        cartService.updateProduct(orderInfoParam.getCartProductUpdateList());
        List<CartProduct> cartProductList = cartService.getAllCartProducts();
        for (CartProduct cartProduct: cartProductList) {
            grandTotalPrice = grandTotalPrice.add(cartProduct.getTotalPrice());
        }
        cartService.removeAllProducts();
        System.out.println(grandTotalPrice);
    }
}
