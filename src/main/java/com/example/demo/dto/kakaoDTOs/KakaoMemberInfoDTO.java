package com.example.demo.dto.kakaoDTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter @Setter
@NoArgsConstructor
public class KakaoMemberInfoDTO {
    private Long id;
    private Date connected_at;

    @JsonProperty("properties")
    private KakaoLoginProperties kakaoLoginProperties;

    @JsonProperty("kakao_account")
    private KakaoAccount kakaoAccount;

}
