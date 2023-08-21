package com.example.demo.controller;

import com.example.demo.dto.memberDTOs.MemberRequestDTO;
import com.example.demo.dto.memberDTOs.MemberResponseDTO;
import com.example.demo.dto.memberDTOs.TokenDTO;
import com.example.demo.entity.Member;
import com.example.demo.repository.MemberRepository;
import com.example.demo.service.MemberService;
import com.example.demo.user.ContextGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/auth/member")
public class AuthMemberController {
    private final MemberService memberService;

    @PostMapping("/signup")
    ResponseEntity<MemberResponseDTO> signup(@Valid @RequestBody MemberRequestDTO memberRequestDTO) {
        return ResponseEntity.ok(memberService.signup(memberRequestDTO));
    }
    @PostMapping("/kakaosignup")
    ResponseEntity<MemberResponseDTO> kakaosignup(@Valid @RequestBody MemberRequestDTO memberRequestDTO) {
        return ResponseEntity.ok(memberService.kakaoSignup(memberRequestDTO));
    }
    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@Valid @RequestBody MemberRequestDTO requestDto) {
        return ResponseEntity.ok(memberService.login(requestDto));
    }
}
