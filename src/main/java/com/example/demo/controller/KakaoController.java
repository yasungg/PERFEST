package com.example.demo.controller;

import com.example.demo.dto.kakaoDTOs.KakaoAccount;
import com.example.demo.service.KakaoLoginService;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;


@Slf4j
@RequiredArgsConstructor
@Controller
@CrossOrigin(origins = "*", allowedHeaders= "*")
@RequestMapping("/koauth/login")
public class KakaoController {
    private final KakaoLoginService kakaoLoginService;
    private final MemberService memberService;
    private final HttpSession session;


    // authorization code를 받아옴
    @GetMapping("/kakao")
    public String redirectKakaoLogin(@RequestParam(value = "code") String authCode) {
        boolean needSignup;
        kakaoLoginService.requestAccessToken(authCode); // access token을 신청하고 받아와서 세션에 저장
        if (kakaoLoginService.kakaoCheckIsMember()) {
            kakaoLoginService.stringifyJWT(memberService.kakaoLogin());
            log.info("JWT = {}", kakaoLoginService.stringifyJWT(memberService.kakaoLogin()));

            return "redirect: " + UriComponentsBuilder.fromUriString("http://localhost:3000/Login");
        }

        boolean isKakao = true;
        needSignup = true;

        return "redirect:" + UriComponentsBuilder.fromUriString("http://localhost:3000/login")
                .queryParam("isKakao", isKakao)
                .queryParam("needSignup", needSignup)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString();
    }
}
