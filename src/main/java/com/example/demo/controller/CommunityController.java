package com.example.demo.controller;

import com.example.demo.constant.CommunityCategory;
import com.example.demo.dto.CommunityDTO;
import com.example.demo.service.CommentService;
import com.example.demo.service.CommunityService;
import com.example.demo.user.ContextGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/community")
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService communityService;
    private final ContextGetter info;

    // 커뮤니티 게시글 작성(POST)
    @PostMapping(value="/writeboard")
    public ResponseEntity<Boolean> boardInsert(@RequestBody Map<String, Object> communityData) {
        String communityTitle = (String)communityData.get("communityTitle");
        String communityCategory = (String)communityData.get("communityCategory");
        String communityDesc = (String)communityData.get("communityDesc");
//      int memberId = (Integer)communityData.get("memberId");
        Long memberId = info.getId();
        String communityImg = (String)communityData.get("communityImg");
        boolean result = communityService.insertCommunity(communityTitle, CommunityCategory.valueOf(communityCategory), communityDesc, memberId, communityImg);
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
