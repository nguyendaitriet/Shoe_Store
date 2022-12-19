package com.shoe.service;

import com.shoe.dto.order.OrderInfoParam;
import com.shoe.dto.order.OrderResult;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface OrderService {
    void createNewOrder(OrderInfoParam orderInfoParam, Authentication authentication);
    List<OrderResult> getAllOrderResult(Authentication authentication);
}
