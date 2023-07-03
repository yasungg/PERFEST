package com.example.demo.service;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.entity.Festival;
import com.example.demo.entity.Review;
import com.example.demo.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor

public class ReviewService {
    private final ReviewRepository reviewRepository;

    // 리뷰 작성(POST)
    public boolean insertReview(Long festivalId, String reviewTitle, String reviewContent, String reviewImg) {
        Festival festival = new Festival();
        Review review = new Review();
        festival.setId(festivalId);
        review.setFestival(festival);
        review.setReviewTitle(reviewTitle);
        review.setReviewContent(reviewContent);
        review.setReviewImg(reviewImg);
        review.setReviewWrittenTime(LocalDateTime.now());
        reviewRepository.save(review);
        return true;
    }
    // 해당 축제 리뷰 가져오기(GET)
    public List<ReviewDTO> getReviewList(Long festivalId) {
        List<Review> reviewList = reviewRepository.findByFestivalId(festivalId);
        List<ReviewDTO> reviewDTOS = new ArrayList<>();
        for(Review review : reviewList) {
            ReviewDTO reviewDTO = new ReviewDTO();
            reviewDTO.setReviewId(review.getId());
            reviewDTO.setReviewTitle(review.getReviewTitle());
            reviewDTO.setReviewContent(review.getReviewContent());
            reviewDTO.setReviewImg(review.getReviewImg());
            reviewDTO.setReviewWrittenTime(review.getReviewWrittenTime());
            reviewDTOS.add(reviewDTO);
        }
        return reviewDTOS;
    }
    // 해당 축제의 리뷰 갯수 가져오기(GET)
    public long getReviewCount(Long festivalId) {return reviewRepository.countByFestivalId(festivalId);}
}
