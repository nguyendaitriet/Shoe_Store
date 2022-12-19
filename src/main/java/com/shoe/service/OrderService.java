package com.shoe.service;

import com.shoe.dto.order.OrderInfoParam;

public interface OrderService {
    void createNewOrder(OrderInfoParam orderInfoParam);
}
