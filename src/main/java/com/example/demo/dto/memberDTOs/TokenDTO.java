package com.example.demo.dto.memberDTOs;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDTO {
    private String grantType;       // 토큰 유형
    private String accessToken;     // 실제 사용되는 토큰
    private Long tokenExpiresIn;    // 만료 시간
}
