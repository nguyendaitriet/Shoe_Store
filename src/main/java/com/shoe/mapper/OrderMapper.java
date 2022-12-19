package com.shoe.mapper;

import com.shoe.dao.ProductDAO;
import com.shoe.dao.ProductItemDAO;
import com.shoe.dto.cart.CartProductParam;
import com.shoe.dto.user.UserInfoParam;
import com.shoe.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;

@Component
public class OrderMapper {
    @Autowired
    private ProductDAO productDAO;
    @Autowired
    private ProductItemDAO productItemDAO;

    public Order toOrder(User currentUser, UserInfoParam userInfoParam, BigDecimal grandTotalPrice) {
        return new Order()
                .setUser(currentUser)
                .setAddress(userInfoParam.getAddress())
                .setPhoneNumber(userInfoParam.getPhoneNumber())
                .setFullName(userInfoParam.getFullName())
                .setCreatedAt(Instant.now())
                .setTotalPrice(grandTotalPrice);
    }

    public OrderItem toOrderItem(CartProductParam cartProductParam, Order order) {
        Product product = productDAO.findById(cartProductParam.getProductId()).get();
        int quantity = cartProductParam.getQuantity();
        BigDecimal totalPrice = product.getPrice().multiply(new BigDecimal(quantity));
        int productItemId = productItemDAO.findProductItemId(cartProductParam.getProductId(), cartProductParam.getSizeId());

        return new OrderItem()
                .setOrder(order)
                .setPrice(totalPrice)
                .setQuantity(quantity)
                .setProductItem(new ProductItem(productItemId))
                .setCreatedAt(Instant.now());

    }
}
