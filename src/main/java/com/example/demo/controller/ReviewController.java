package com.example.demo.controller;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@Slf4j
@RequestMapping("/auth/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    // 리뷰 작성(POST)
    @PostMapping(value = "/writereview")
    public ResponseEntity<Boolean> reviewInsert(@RequestBody Map<String, Object> reviewData) {
        String festivalId = (String)reviewData.get("festivalId");
        String reviewTitle = (String)reviewData.get("reviewTitle");
        String reviewContent = (String)reviewData.get("reviewContent");
        String reviewImg = (String)reviewData.get("reviewImg");
        boolean result = reviewService.insertReview(Long.parseLong(festivalId),reviewTitle, reviewContent, reviewImg);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 해당 축제 리뷰 가져오기(GET)
    @GetMapping(value = "/getreview")
    public ResponseEntity<List<ReviewDTO>> reviewSelectList(@RequestParam int festivalId) {
        List<ReviewDTO> list = reviewService.getReviewList((long) festivalId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 해당 축제의 리뷰 갯수 가져오기(GET)
    @GetMapping(value = "/reviewcount")
    public ResponseEntity<Long> reviewCount(@RequestParam String festivalId) {
        long result = reviewService.getReviewCount(Long.parseLong(festivalId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
