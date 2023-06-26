package com.example.demo.controller;

import com.example.demo.service.KakaoLoginService;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;


@Slf4j
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders= "*")
@RequestMapping("/koauth/login")
public class KakaoController {
    private final KakaoLoginService kakaoLoginService;
    private final MemberService memberService;


    // authorization code를 받아옴
    @GetMapping("/kakao")
    public RedirectView redirectKakaoLogin(@RequestParam(value = "code") String authCode) {
        RedirectView redirectView = new RedirectView();
        kakaoLoginService.requestAccessToken(authCode); // access token을 신청하고 받아와서 세션에 저장
        if (kakaoLoginService.kakaoCheckIsMember()) {
            kakaoLoginService.stringifyJWT(memberService.kakaoLogin());
            log.info("JWT = {}", kakaoLoginService.stringifyJWT(memberService.kakaoLogin()));
            redirectView.setUrl("http://localhost:3000/Login");
        }
        redirectView.setUrl("http://localhost:3000/SignUp");
        return redirectView;
    }
}
