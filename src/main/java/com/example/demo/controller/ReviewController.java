package com.example.demo.controller;

import com.example.demo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    // 리뷰 작성(POST)
    @PostMapping(value = "writereview")
    public ResponseEntity<Boolean> reviewInsert(@RequestBody Map<String, Object> reviewData) {
        String reviewTitle = (String)reviewData.get("reviewTitle");
        String reviewContent = (String)reviewData.get("reviewContent");
        String reviewImg = (String)reviewData.get("reviewImg");
        boolean result = reviewService.insertReview(reviewTitle, reviewContent, reviewImg);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
