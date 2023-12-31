package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.service.CommentService;
import com.example.demo.service.MyPageService;
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
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    private final ContextGetter info;

    // 댓글 작성(POST)
    @PostMapping(value = "/writecomment")
    public ResponseEntity<Boolean> commentInsert(@RequestBody Map<String, Object> commentData) {
        String commentBody = (String) commentData.get("commentBody");
        String communityId = (String) commentData.get("communityId");
        Long memberId = info.getId();
        boolean result = commentService.insertComment(commentBody, Long.parseLong(communityId), memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 대댓글 작성(POST)
    @PostMapping(value = "/writereplycomment")
    public ResponseEntity<Boolean> replycommentInsert(@RequestBody Map<String, Object> replycommentData) {
        int parentId = (Integer)replycommentData.get("commentId");
        Long memberId = info.getId();
        String commentBody = (String)replycommentData.get("commentBody");
        boolean result = commentService.insertReplyComment((long) parentId, memberId, commentBody);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 댓글 수정(POST)
    @PostMapping(value = "/updatecomment")
    public ResponseEntity<Boolean> commentUpdate(@RequestBody Map<String, Object> updateCommentData) {
        int commentId = (Integer)updateCommentData.get("commentId");
        String commentBody = (String)updateCommentData.get("commentBody");
        boolean result = commentService.updateComment((long) commentId,commentBody);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
