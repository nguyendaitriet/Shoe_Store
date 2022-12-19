package com.shoe.service;

import com.shoe.dto.order.OrderInfoParam;
import org.springframework.security.core.Authentication;

public interface OrderService {
    void createNewOrder(OrderInfoParam orderInfoParam, Authentication authentication);
}
