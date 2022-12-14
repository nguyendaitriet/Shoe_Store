package com.shoe.dao;

import com.shoe.entity.Product;
import com.shoe.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeDAO extends JpaRepository<Size, Integer> {
}
