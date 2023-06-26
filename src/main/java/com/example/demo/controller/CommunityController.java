package com.example.demo.controller;

import com.example.demo.constant.CommunityCategory;
import com.example.demo.dto.CommunityDTO;
import com.example.demo.service.CommunityService;
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
@RequestMapping("/community")
@RequiredArgsConstructor
public class CommunityController {
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
    public ResponseEntity<List<CommunityDTO>> communityNewestList() {
        List<CommunityDTO> list = communityService.getCommunityNewestList();
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
    // 커뮤니티 게시글 작성(POST)
    @PostMapping(value="/writeboard")
    public ResponseEntity<Boolean> boardInsert(@RequestBody Map<String, Object> communityData) {
        String communityTitle = (String)communityData.get("communityTitle");
        String communityCategory = (String)communityData.get("communityCategory");
        String communityDesc = (String)communityData.get("communityDesc");
        boolean result = communityService.insertCommunity(communityTitle, CommunityCategory.valueOf(communityCategory), communityDesc);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 커뮤니티 게시글 수정(POST)
    @PostMapping(value="/updateboard")
    public ResponseEntity<Boolean> boardUpdate(@RequestBody Map<String, Object> updateCommunityData) {
        int communityId = (Integer) updateCommunityData.get("communityId");
        String communityTitle = (String)updateCommunityData.get("communityTitle");
        String communityCategory = (String)updateCommunityData.get("communityCategory");
        String communityDesc = (String)updateCommunityData.get("communityDesc");
        boolean result = communityService.updateCommunity((long) communityId, communityTitle, CommunityCategory.valueOf(communityCategory), communityDesc);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
