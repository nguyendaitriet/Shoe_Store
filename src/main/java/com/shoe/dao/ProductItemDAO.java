package com.shoe.dao;

import com.shoe.entity.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductItemDAO extends JpaRepository<ProductItem, Integer> {

    @Query("SELECT p.id " +
            "FROM ProductItem AS p " +
            "WHERE p.product.id = :productId and p.size.id = :sizeId")
    int findProductItemId(@Param("productId") int productId, @Param("sizeId") int sizeId);
}
