package com.example.demo.service;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.entity.Review;
import com.example.demo.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor

public class ReviewService {
    private final ReviewRepository reviewRepository;

    // 리뷰 작성(POST)
    public boolean insertReview(String reviewTitle, String reviewContent, String reviewImg) {
        Review review = new Review();
        review.setReviewTitle(reviewTitle);
        review.setReviewContent(reviewContent);
        review.setReviewImg(reviewImg);
        review.setReviewWrittenTime(LocalDateTime.now());
        reviewRepository.save(review);
        return true;
    }
}
