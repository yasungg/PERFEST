package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class MemberDTO {
    private Long id;
    private String email;
    private String memberName;
    private String nickName;
    private String address;
    private String img;
    private int badges;
    private BigDecimal totalPrice;
    private boolean isEnabled; // 회원 탈퇴여부 1 True / 탈퇴시 0 false
}
