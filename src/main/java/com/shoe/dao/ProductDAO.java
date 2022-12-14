package com.shoe.dao;

import com.shoe.entity.Product;
import com.shoe.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDAO extends JpaRepository<Product, Integer> {

    @Query("SELECT s " +
            "FROM Size AS s " +
            "INNER JOIN ProductItem AS i " +
            "ON s.id = i.size.id " +
            "WHERE i.product.id = :id " +
            "ORDER BY s.sizeNumber")
    List<Size> findAllSizeById(@Param("id") Integer id);
}
