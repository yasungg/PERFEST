package com.example.demo.service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<ProductDTO> getProductListByFestivalId(Long festivalId) {
        return productRepository.findByFestivalId(festivalId);
    }
}
