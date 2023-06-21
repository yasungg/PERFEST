package com.example.demo.controller;

import com.example.demo.constant.CommunityCategory;
import com.example.demo.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/community")
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService communityService;

    // 커뮤니티 게시글 작성(POST)
    @PostMapping(value="/writeboard")
    public ResponseEntity<Boolean> memberRegister(@RequestBody Map<String, Object> communityData) {
        String communityTitle = (String)communityData.get("communityTitle");
        String communityCategory = (String)communityData.get("communityCategory");
        String communityDesc = (String)communityData.get("communityDesc");
        boolean result = communityService.insertCommunity(communityTitle, CommunityCategory.valueOf(communityCategory), communityDesc);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
