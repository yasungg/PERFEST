package com.example.demo.service;

import com.example.demo.dto.AccessTokenDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class KakaoLoginService {
    @Value("${kakao.client-id}")
    private String kakaoId;

    @Value("${kakao.client-secret}")
    private String kakaoSecret;

    @Value("${kakao.grant-type}")
    private String kakaoAuthGrantType;

    @Value("${kakao.redirect-uri}")
    private String kakaoRedirectUri;
    public String requestAccessToken(String authCode) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> accessTokenParams = new LinkedMultiValueMap<>();
        accessTokenParams.add("grant_type", kakaoAuthGrantType);
        accessTokenParams.add("client_id", kakaoId);
        accessTokenParams.add("code", authCode);
        accessTokenParams.add("redirect_uri", kakaoRedirectUri);
        accessTokenParams.add("client_secret", kakaoSecret);

        log.info("httpHeaders = {}", httpHeaders);
        log.info("accessTokenParams = {}", accessTokenParams.toString());

        ResponseEntity<String> accessTokenResponse = restTemplate.postForEntity("https://kauth.kakao.com/oauth/token", accessTokenParams, String.class);

        log.info("accessTokenResponse = {}", accessTokenResponse.getBody());
        return accessTokenResponse.getBody();
    }
}