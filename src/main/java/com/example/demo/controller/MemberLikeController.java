package com.example.demo.controller;


import com.example.demo.service.MemberLikeService;
import com.example.demo.user.ContextGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/memberlike")
@RequiredArgsConstructor
public class MemberLikeController {
    private final MemberLikeService memberLikeService;
    private final ContextGetter info;

    // 게시판 좋아요 한번만 누르기
    @PostMapping(value = "/likeboard")
    public ResponseEntity<Boolean> likeBoardInsert(@RequestBody Map<String, Object> likeBoardData) {
        String communityId = (String)likeBoardData.get("communityId");
        Long memberId = info.getId();
        boolean result = memberLikeService.insertBoardLike(Long.parseLong(communityId), memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 댓글 좋아요 한번만 누르기
    @PostMapping(value = "/likecomment")
    public ResponseEntity<Boolean> likeCommentInsert(@RequestBody Map<String, Object> likeCommentData) {
        int commentId = (Integer)likeCommentData.get("commentId");
        Long memberId = info.getId();
        boolean result = memberLikeService.insertCommentLike((long)commentId, memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 리뷰 좋아요 한번 누르기
    @PostMapping(value = "/likereview")
    public ResponseEntity<Boolean> likeReviewInsert(@RequestBody Map<String, Object> likeReviewData) {
        int reviewId = (Integer)likeReviewData.get("reviewId");
        Long memberId = info.getId();
        boolean result = memberLikeService.insertReviewLike((long)reviewId, memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
