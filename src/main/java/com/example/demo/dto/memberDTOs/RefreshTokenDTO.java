package com.example.demo.dto.memberDTOs;

import com.example.demo.entity.Auth;
import com.example.demo.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenDTO {
    private String grantType;       // 토큰 유형
    private String refreshToken; // refresh token
    private Date refreshTokenExpiresIn; // refresh token expires in

    @Builder
    public static Auth in(Member member, String grantType, String refreshToken, Date refreshTokenExpiresIn) {
        return Auth.builder()
                .member(member)
                .grantType(grantType)
                .refreshToken(refreshToken)
                .refreshTokenExpiresIn(refreshTokenExpiresIn)
                .build();
    }
}
