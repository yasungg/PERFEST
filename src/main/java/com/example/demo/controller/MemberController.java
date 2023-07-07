package com.example.demo.controller;

import com.example.demo.dto.memberDTOs.MemberRequestDTO;
import com.example.demo.dto.memberDTOs.MemberResponseDTO;
import com.example.demo.dto.memberDTOs.TokenDTO;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/auth/member")
public class MemberController {
    private final MemberService memberService;
    @PostMapping("/signup")
    ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO memberRequestDTO) {
        return ResponseEntity.ok(memberService.signup(memberRequestDTO));
    }
    @PostMapping("/kakaosignup")
    ResponseEntity<MemberResponseDTO> kakaosignup(@RequestBody MemberRequestDTO memberRequestDTO) {
        return ResponseEntity.ok(memberService.kakaoSignup(memberRequestDTO));
    }
    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody MemberRequestDTO requestDto) {
        return ResponseEntity.ok(memberService.login(requestDto));
    }
}
