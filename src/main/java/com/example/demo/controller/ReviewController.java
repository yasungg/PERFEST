package com.example.demo.controller;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.service.ReviewService;
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
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final ContextGetter info;

    // 리뷰 작성(POST)
    @PostMapping(value = "/writereview")
    public ResponseEntity<Boolean> reviewInsert(@RequestBody Map<String, Object> reviewData) {
        int festivalId = (Integer) reviewData.get("festivalId");
        String reviewContent = (String)reviewData.get("reviewContent");
        Long memberId = info.getId();
//        String reviewImg = (String)reviewData.get("reviewImg");
        boolean result = reviewService.insertReview((long) festivalId, reviewContent, memberId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
