package com.example.demo.controller;

import com.example.demo.service.KakaoLoginService;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.StandardCharsets;


@Slf4j
@RequiredArgsConstructor
@Controller
@CrossOrigin(origins = "*", allowedHeaders= "*")
@RequestMapping("/koauth/login")
public class KakaoController {
    private final KakaoLoginService kakaoLoginService;
    private final MemberService memberService;
    // authorization code를 받아옴
    @GetMapping("/kakao")
    public String redirectKakaoLogin(@RequestParam(value = "code") String authCode, RedirectAttributes redirectAttributes) {
        kakaoLoginService.requestKakaoAccessToken(authCode); // access token을 신청하고 받아와서 세션에 저장

        if (kakaoLoginService.kakaoCheckIsMember()) {
            String jwt = kakaoLoginService.stringifyJWT(memberService.kakaoLogin());
            log.info("JWT = {}", kakaoLoginService.stringifyJWT(memberService.kakaoLogin()));

            redirectAttributes.addAttribute("isKakao", true);
            redirectAttributes.addAttribute("needSignup", false);
            redirectAttributes.addAttribute("jwt", jwt);

            return "redirect:http://localhost:3000/";
        }
        return "redirect:" + UriComponentsBuilder.fromUriString("http://localhost:3000/login")
                .queryParam("isKakao", true)
                .queryParam("needSignup", true)
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUriString();
    }
}
