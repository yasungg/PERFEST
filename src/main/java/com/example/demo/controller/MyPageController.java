package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.CommunityDTO;
import com.example.demo.dto.MemberDTO;
import com.example.demo.entity.Community;
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

    // 닉네임 중복값 체크
    @GetMapping("/nicknameCheck")
    public ResponseEntity<Boolean> checkNicknameAvailability(@RequestParam String nickname) {
        boolean isAvailable = myPageService.isNicknameAvailable(nickname);
        return ResponseEntity.ok(isAvailable);
    }

    // 회원 탈퇴
    @PostMapping(value = "/del")
    public ResponseEntity<Boolean> deleteMember(@RequestBody Map<String, Object> updateData) {
        String email = (String) updateData.get("username");
        boolean result = myPageService.deleteMember(email);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 회원 주소 수정
    @PostMapping(value = "/updateAdd")
    public ResponseEntity<Boolean> updateAddress(@RequestBody Map<String, Object> updateData) {
        String email = (String) updateData.get("username");
        String address = (String) updateData.get("address");
        boolean result = myPageService.updateAddress(email, address);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 동일 회원 주소 중복값 체크
    @GetMapping("/addressCheck")
    public ResponseEntity<Boolean> checkAddressDuplicate(@RequestParam("email") String email, @RequestParam("address") String address) {
        boolean isDuplicate = myPageService.isAddressAlreadyRegisteredForSelf(email, address);
        return new ResponseEntity<>(isDuplicate, HttpStatus.OK);
    }

    // 마이페이지 내 게시글 조회
    @GetMapping("/communities")
    public ResponseEntity<List<CommunityDTO>> getCommunitiesByMemberId(@RequestParam("memberId") Long memberId) {
        List<CommunityDTO> communities = myPageService.getCommunitiesByMemberId(memberId);
        return new ResponseEntity<>(communities, HttpStatus.OK);
    }

    // 마이페이지에서 특정 회원의 게시글 삭제
    @DeleteMapping("/deleteMyCommunities")
    public ResponseEntity<Boolean> deleteCommunitiesByMemberId(@RequestParam("memberId") Long memberId) {
        boolean result = myPageService.deleteCommunityPostsByMemberId(memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 마이페이지 내 댓글 조회
    @GetMapping("/comments")
    public ResponseEntity<List<CommentDTO>> getCommentsByMemberId(@RequestParam("memberId") Long memberId) {
        List<CommentDTO> comments = myPageService.getCommentByMemberId(memberId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    // 마이페이지 내 댓글 삭제
    @DeleteMapping("/deleteMyComments")
    public ResponseEntity<Boolean> deleteCommentsByMemberId(@RequestParam("memberId") Long memberId) {
        boolean result = myPageService.deleteCommentPostsByMemberId(memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
