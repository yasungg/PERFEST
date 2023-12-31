package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class RichRankingDTO {
    public long memberId;
    private String nickname;
    private BigDecimal totalPrice;
    private int rank;
}
