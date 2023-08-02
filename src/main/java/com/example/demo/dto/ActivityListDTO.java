package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor

public class ActivityListDTO {
    private String activityName;
    private String activityDesc;
    private BigDecimal activityPrice;
    private int activityQuantity;
}
