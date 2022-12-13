package com.shoe.dao;

import com.shoe.dto.product.HomeProductResult;
import com.shoe.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDAO extends JpaRepository<Product, Integer> {

    @Query("SELECT NEW com.shoe.dto.product.HomeProductResult (" +
                "d.title, " +
                "d.price, " +
                "d.photo " +
            ")" +
            "FROM Product AS d " +
            "GROUP BY d.title ")
    List<HomeProductResult> findAllHomeProducts();
}
