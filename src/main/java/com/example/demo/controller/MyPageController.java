package com.example.demo.controller;

import com.example.demo.dto.MemberDTO;
import com.example.demo.service.MyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/auth/member")
@RequiredArgsConstructor
public class MyPageController {
    private final MyPageService myPageService;

    // 이메일로 회원 조회
    @GetMapping("/email")
    public ResponseEntity<List<MemberDTO>> getMemberInfoByEmail(@RequestParam String email) {
        List<MemberDTO> memberList = myPageService.getMemberByEmail(email);
        return new ResponseEntity<>(memberList, HttpStatus.OK);
    }

    // 회원 닉네임 수정
    @PostMapping("/nickname")
    public ResponseEntity<String> updateNickname(@RequestParam String email, @RequestParam String nickname) {
        myPageService.updateNickName(email, nickname);
        return ResponseEntity.ok("닉네임이 성공적으로 수정되었습니다.");
    }

    //

}
