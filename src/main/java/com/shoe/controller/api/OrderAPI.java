package com.shoe.controller.api;

import com.shoe.dto.order.OrderInfoParam;
import com.shoe.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderAPI {
    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<?> createNewOrder(@RequestBody OrderInfoParam orderInfoParam, Authentication authentication) {
        if (authentication == null) {
            return new ResponseEntity<>(HttpStatus.OK);

        }
        orderService.createNewOrder(orderInfoParam, authentication);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
