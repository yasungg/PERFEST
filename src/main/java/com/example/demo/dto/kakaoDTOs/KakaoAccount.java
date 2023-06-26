package com.example.demo.dto.kakaoDTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter @Setter
@NoArgsConstructor
public class KakaoAccount {

    private boolean profile_image_needs_agreement;

    @JsonProperty("profile")
    private KakaoLoginProfile kakaoLoginProfile;

    private boolean has_email;
    private boolean email_needs_agreement;
    private boolean is_email_valid;
    private boolean is_email_verified;
    private String email;
}
