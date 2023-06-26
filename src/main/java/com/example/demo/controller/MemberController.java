package com.example.demo.controller;

import com.example.demo.dto.memberDTOs.MemberRequestDTO;
import com.example.demo.dto.memberDTOs.MemberResponseDTO;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders= "*")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/auth/member")
public class MemberController {
    private final MemberService memberService;
    @PostMapping("/signup")
    ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO memberRequestDTO) {
        return ResponseEntity.ok(memberService.signup(memberRequestDTO));
    }

}
