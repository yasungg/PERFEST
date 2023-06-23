package com.example.demo.controller;

import com.example.demo.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    // 댓글 작성(POST)
    @PostMapping(value = "/writecomment")
    public ResponseEntity<Boolean> commentInsert(@RequestBody Map<String, Object> commentData) {
        String commentBody = (String)commentData.get("commentBody");
        boolean result = commentService.insertComment(commentBody);
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
