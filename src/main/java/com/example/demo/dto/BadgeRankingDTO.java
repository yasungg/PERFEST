package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class BadgeRankingDTO {
    public long memberId;
    private String nickname;
    private BigDecimal badges;
}
