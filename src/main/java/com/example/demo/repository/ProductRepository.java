package com.example.demo.repository;

import com.example.demo.dto.ProductDTO;
import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findById(Long id);

    @Query("SELECT new com.example.demo.dto.ProductDTO (p.id, p.productName, p.productDesc, p.productImg, p.productPrice) from Product p WHERE p.festival.id = :festivalId")
    List<ProductDTO> findByFestivalId(@Param("festivalId") Long id);
}
