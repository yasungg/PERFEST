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
    private CommentService commentService;

    // 댓글 작성(POST)
    @PostMapping(value = "/writecomment")
    public ResponseEntity<Boolean> commentInsert(@RequestBody Map<String, Object> commentData) {
        String commentBody = (String)commentData.get("commentBody");
        boolean result = commentService.insertComment(commentBody);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
