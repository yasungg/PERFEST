package com.example.demo.controller;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/auth/review")
@RequiredArgsConstructor
public class AuthReviewController {
    private final ReviewService reviewService;

    // 해당 축제 리뷰 가져오기(GET)
    @GetMapping(value = "/getreview")
    public ResponseEntity<Page<ReviewDTO>> reviewSelectList(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "5") int pageSize,@RequestParam int festivalId) {
        Page<ReviewDTO> list = reviewService.getReviewList((long) festivalId, pageNumber, pageSize);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 해당 축제의 리뷰 갯수 가져오기(GET)
    @GetMapping(value = "/getreviewcount")
    public ResponseEntity<Long> reviewCount(@RequestParam String festivalId) {
        long result = reviewService.getReviewCount(Long.parseLong(festivalId));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
