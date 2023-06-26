package com.example.demo.controller;

import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.memberDTOs.MemberRequestDTO;
import com.example.demo.dto.memberDTOs.MemberResponseDTO;
import com.example.demo.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    // 이메일로 회원 조회
//    @GetMapping("/email")
//    public ResponseEntity<List<MemberDTO>> getMemberInfoByEmail(@RequestParam String email) {
//        List<MemberDTO> memberList = memberService.getMemberByEmail(email);
//        return new ResponseEntity<>(memberList, HttpStatus.OK);
//    }
//
//    // 회원 삭제
//    @PostMapping("/delete")
//    public ResponseEntity<String> deleteMember(@RequestParam Long memberId) {
//        memberService.deleteMember(memberId);
//        return new ResponseEntity<>("회원탈퇴여부 Y 변경", HttpStatus.OK);
//    }
}
