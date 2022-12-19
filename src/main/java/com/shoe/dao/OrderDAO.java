package com.shoe.dao;

import com.shoe.entity.Order;
import com.shoe.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDAO extends JpaRepository<Order, Integer> {
}
