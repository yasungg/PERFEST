package com.example.demo.controller;

import com.example.demo.dto.ProductDTO;
import com.example.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth/product")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/get-product-list")
    ResponseEntity<List<ProductDTO>> getProductList(@RequestParam int festivalId) {
        return new ResponseEntity<>(productService.getProductListByFestivalId((long) festivalId), HttpStatus.OK);
    }
}
