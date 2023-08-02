package com.example.demo.controller;

import com.example.demo.constant.CommunityCategory;
import com.example.demo.dto.CommunityDTO;
import com.example.demo.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/auth/community")
@RequiredArgsConstructor
public class AuthCommunityController {
    private final CommunityService communityService;

    // 커뮤니티 게시글 전체 조회(GET)
    @GetMapping(value = "/getallboard")
    public ResponseEntity<List<CommunityDTO>> communityList() {
        List<CommunityDTO> list = communityService.getCommunityList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 커뮤니티 게시글 카테고리별 조회(GET)
    @GetMapping(value = "/getselectboard")
    public ResponseEntity<List<CommunityDTO>> communitySelectList(@RequestParam String communityCategory) {
        List<CommunityDTO> list = communityService.getCommunitySelectList(CommunityCategory.valueOf(communityCategory));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 커뮤니티 게시글 최신순 조회(GET)
    @GetMapping(value = "/getnewestboard")
    public ResponseEntity<List<CommunityDTO>> communityNewestList(@RequestParam String communityCategory) {
        List<CommunityDTO> list = communityService.getCommunityNewestList(CommunityCategory.valueOf(communityCategory));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 커뮤니티 게시글 인기순 조회(GET)
    @GetMapping(value = "/getlikestboard")
    public ResponseEntity<List<CommunityDTO>> communityLikestList(@RequestParam String communityCategory) {
        List<CommunityDTO> list = communityService.getCommunityLikestList(CommunityCategory.valueOf(communityCategory));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 커뮤니티 게시글 최신순 전체 조회(GET)
    @GetMapping(value = "/getAllnewestboard")
    public ResponseEntity<List<CommunityDTO>> communityAllNewestList() {
        List<CommunityDTO> list = communityService.getCommunityAllNewestList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 커뮤니티 게시글 인기순 전체 조회(GET)
    @GetMapping(value = "/getAlllikestboard")
    public ResponseEntity<List<CommunityDTO>> communityAllLikestList() {
        List<CommunityDTO> list = communityService.getCommunityAllLikestList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 커뮤니티 게시글 본문 조회(GET)
    @GetMapping(value = "/getboardarticle")
    public ResponseEntity<List<CommunityDTO>> communityBoardArticle(@RequestParam long communityId) {
        List<CommunityDTO> list = communityService.getCommunityBoardArticle(communityId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 커뮤니티 게시글 좋아요 누르면 좋아요 +1(POST)
    @PostMapping(value="/BoardArticle/{communityId}/addlike")
    public ResponseEntity<Boolean> likeInsert(@RequestBody Map<String, Object> communityData) {
        String communityId = (String) communityData.get("communityId");
        boolean result = communityService.insertHeart(Long.parseLong(communityId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 커뮤니티 게시판 제목 검색(GET)
    @GetMapping(value="/getboardtitle")
    public ResponseEntity<List<CommunityDTO>> communityBoardTitle(@RequestParam String communityTitle) {
        List<CommunityDTO> list = communityService.getCommunityBoardTitle(communityTitle);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 커뮤니티 게시판 닉네임 검색(GET)
    @GetMapping(value = "/getboardnickname")
    public ResponseEntity<List<CommunityDTO>> communityBoardNickName(@RequestParam String nickName) {
        List<CommunityDTO> list = communityService.getCommunityByNickName(nickName);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
