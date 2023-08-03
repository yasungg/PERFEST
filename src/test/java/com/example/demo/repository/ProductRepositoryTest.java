package com.example.demo.repository;

import com.example.demo.dto.ProductDTO;
import com.example.demo.entity.Product;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.List;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
class ProductRepositoryTest {
//    @Autowired
//    ProductRepository productRepository;
//    @Test
//    @DisplayName("product find by festivalId")
//    void findByFestvialId() {
//        List<ProductDTO> result = productRepository.findByFestivalId(1L);
//        for(ProductDTO rst : result) {
//            System.out.println(rst.getId());
//        }
//    }
}