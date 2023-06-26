package com.example.demo.dto.kakaoDTOs;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class KakaoLoginProfile {
    private String thumbnail_image_url;
    private String profile_image_url;
    private boolean is_default_image;
}
