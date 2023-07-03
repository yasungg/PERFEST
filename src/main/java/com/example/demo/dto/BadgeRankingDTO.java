package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;


@Getter @Setter
public class BadgeRankingDTO {
    public long memberId;
    private String nickname;
    private int badges;
    private int rank;
}
