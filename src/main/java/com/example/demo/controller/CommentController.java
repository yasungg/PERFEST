package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.service.CommentService;
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
@RequestMapping("/auth/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final MyPageService myPageService;

    // 댓글 작성(POST)
    @PostMapping(value = "/writecomment")
    public ResponseEntity<Boolean> commentInsert(@RequestBody Map<String, Object> commentData) {
        String commentBody = (String) commentData.get("commentBody");
        String communityId = (String) commentData.get("communityId");
        int memberId = (Integer) commentData.get("memberId");
        boolean result = commentService.insertComment(commentBody, Long.parseLong(communityId), (long) memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 대댓글 작성(POST)
    @PostMapping(value = "/writereplycomment")
    public ResponseEntity<Boolean> replycommentInsert(@RequestBody Map<String, Object> replycommentData) {
        int parentId = (Integer) replycommentData.get("commentId");
        int memberId = (Integer) replycommentData.get("memberId");
        String commentBody = (String)replycommentData.get("commentBody");
        boolean result = commentService.insertReplyComment((long) parentId,(long) memberId, commentBody);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 대댓글 조회(GET)
    @GetMapping(value = "/getreplycomment")
    public ResponseEntity<List<CommentDTO>> getReplyComment(@RequestParam int parentId) {
        List<CommentDTO> list = commentService.getReplyCommentList((long) parentId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 댓글 수정(POST)
    @PostMapping(value = "/updatecomment")
    public ResponseEntity<Boolean> commentUpdate(@RequestBody Map<String, Object> updateCommentData) {
        int commentId = (Integer)updateCommentData.get("commentId");
        String commentBody = (String)updateCommentData.get("commentBody");
        boolean result = commentService.updateComment((long) commentId,commentBody);
        return new ResponseEntity<>(result, HttpStatus.OK);
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
