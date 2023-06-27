package com.example.demo.controller;

import com.example.demo.dto.MemberDTO;
import com.example.demo.service.MyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/auth/member")
@RequiredArgsConstructor
public class MyPageController {
    private final MyPageService myPageService;

    // 이메일로 회원 조회
    @GetMapping(value = "/email")
    public ResponseEntity<List<MemberDTO>> getMemberInfoByEmail(@RequestParam String email) {
        List<MemberDTO> memberList = myPageService.getMemberByEmail(email);
        return new ResponseEntity<>(memberList, HttpStatus.OK);
    }

    // 회원 닉네임 수정
    @PostMapping(value = "/nickname")
    public ResponseEntity<Boolean> updateNickname(@RequestBody Map<String, Object> updateData) {
        String email = (String)updateData.get("username");
        String nickname = (String) updateData.get("nickname");
        boolean result = myPageService.updateNickname(email, nickname);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}