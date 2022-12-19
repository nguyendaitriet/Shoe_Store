package com.shoe.service.impl;

import com.shoe.dao.OrderDAO;
import com.shoe.dao.OrderItemDAO;
import com.shoe.dao.UserDAO;
import com.shoe.dto.order.OrderInfoParam;
import com.shoe.dto.order.OrderResult;
import com.shoe.entity.Order;
import com.shoe.entity.OrderItem;
import com.shoe.entity.ProductItem;
import com.shoe.entity.User;
import com.shoe.mapper.OrderMapper;
import com.shoe.model.CartProduct;
import com.shoe.service.CartService;
import com.shoe.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private CartService cartService;
    @Autowired
    private UserDAO userDAO;
    @Autowired
    private OrderDAO orderDAO;
    @Autowired
    private OrderItemDAO orderItemDAO;
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public void createNewOrder(OrderInfoParam orderInfoParam, Authentication authentication) {

        User currentUser = userDAO.findByUsername(authentication.getName()).get();

        BigDecimal grandTotalPrice = new BigDecimal("0");
        cartService.updateProduct(orderInfoParam.getCartProductUpdateList());
        List<CartProduct> cartProductList = cartService.getAllCartProducts();
        for (CartProduct cartProduct: cartProductList) {
            grandTotalPrice = grandTotalPrice.add(cartProduct.getTotalPrice());
        }

        Order newOrder = orderDAO.save(orderMapper.toOrder(currentUser, orderInfoParam.getUserInfoParam(), grandTotalPrice));

        List<OrderItem> orderItemList = orderInfoParam.getCartProductUpdateList()
                .stream().map((item) -> orderMapper.toOrderItem(item, newOrder)).toList();
        orderItemDAO.saveAll(orderItemList);

        cartService.removeAllProducts();
    }

    @Override
    public List<OrderResult> getAllOrderResult(Authentication authentication) {
        User currentUser = userDAO.findByUsername(authentication.getName()).get();
        return orderDAO.findAllOrderResult(currentUser.getId());
    }
}
