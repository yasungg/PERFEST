package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String productName;
    private String productDesc;
    private String productImg;
    private BigDecimal productPrice;
    private int productQuantity;
}
