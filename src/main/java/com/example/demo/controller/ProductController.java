package com.example.demo.controller;

import com.example.demo.dto.ProductDTO;
import com.example.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth/product")
@CrossOrigin(value = "http://localhost:3000")
public class ProductController {
    private final ProductService productService;

    @GetMapping("/get-product-list")
    ResponseEntity<List<ProductDTO>> getProductList(@RequestParam int festivalId) {
        return new ResponseEntity<>(productService.getProductListByFestivalId((long) festivalId), HttpStatus.OK);
    }
}
