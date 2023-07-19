package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/auth/comment")
@RequiredArgsConstructor

public class AuthCommentController {
    private final CommentService commentService;
    // 대댓글 조회(GET)
    @GetMapping(value = "/getreplycomment")
    public ResponseEntity<List<CommentDTO>> getReplyComment(@RequestParam int parentId) {
        List<CommentDTO> list = commentService.getReplyCommentList((long) parentId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 댓글 개수 가져오기(GET)
    @GetMapping(value = "/commentcount")
    public ResponseEntity<Long> commentCount(@RequestParam String communityId) {
        long result = commentService.getCommentCount(Long.parseLong(communityId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    //해당 게시글 댓글 조회하기(GET)
    @GetMapping(value = "/getcomment")
    public ResponseEntity<List<CommentDTO>> communitySelectList(@RequestParam int communityId) {
        List<CommentDTO> list = commentService.getCommentList((long) communityId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 댓글 좋아요 추가(POST)
    @PostMapping(value = "/addcommentlike")
    public ResponseEntity<Boolean> likeCommentInsert(@RequestBody Map<String, Object> commentData) {
        int commentId = (Integer) commentData.get("commentId");
        boolean result = commentService.insertHeart((long) commentId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}

