package com.shoe.dao;

import com.shoe.dto.order.OrderResult;
import com.shoe.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDAO extends JpaRepository<Order, Integer> {
    @Query("SELECT NEW com.shoe.dto.order.OrderResult (" +
                "o.id, " +
                "o.fullName, " +
                "o.address, " +
                "o.phoneNumber, " +
                "o.totalPrice, " +
                "SUM(i.quantity), " +
                "o.createdAt " +
            ")" +
            "FROM Order AS o " +
            "INNER JOIN OrderItem  AS i " +
            "ON o.id = i.order.id " +
            "WHERE o.user.id = :userId " +
            "GROUP BY i.order.id " +
            "ORDER BY o.id"
    )
    List<OrderResult> findAllOrderResult(@Param("userId") int userId);
}
