package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
@Getter @Setter
public class PaymentResponseDTO {
    private String productName;
    private BigDecimal productPrice;
    private BigDecimal totalPrice;
    private int quantity;
    private String productImg;
}
