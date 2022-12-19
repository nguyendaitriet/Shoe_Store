package com.shoe.dao;

import com.shoe.entity.Order;
import com.shoe.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemDAO extends JpaRepository<OrderItem, Integer> {
}
