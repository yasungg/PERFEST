package com.example.demo.controller;

import com.example.demo.service.KakaoLoginService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "3000", allowedHeaders= "*")
@RequestMapping("/koauth/login")
public class KakaoController {
    private final KakaoLoginService kakaoLoginService;

    @GetMapping("/kakao")
    public String redirectKakaoLogin(@RequestParam(value = "code") String authCode) { // authorization code를 받아옴
        String tmp = kakaoLoginService.requestAccessToken(authCode); // access token을 신청하고 받아와서 문자열로 반환
        System.out.println(tmp);
        return "success";
    }
}
