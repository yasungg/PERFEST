package com.example.demo.service;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.entity.Festival;
import com.example.demo.entity.Member;
import com.example.demo.entity.Review;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
    private final MemberRepository memberRepository;

    // 리뷰 작성(POST)
    public boolean insertReview(Long festivalId, String reviewContent, Long memberId) {
        Festival festival = new Festival();
        Review review = new Review();
        festival.setId(festivalId);
        review.setFestival(festival);
        review.setReviewContent(reviewContent);
//        review.setReviewImg(reviewImg);
        review.setReviewWrittenTime(LocalDateTime.now());

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("해당 회원이 존재하지 않습니다."));

        review.setMember(member);
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
            reviewDTO.setReviewContent(review.getReviewContent());
            reviewDTO.setReviewImg(review.getReviewImg());
            reviewDTO.setReviewWrittenTime(review.getReviewWrittenTime());

            Member member = review.getMember();
            if (member != null) {
                reviewDTO.setMemberId(member.getId());
                reviewDTO.setNickname(member.getNickname());
            }
            reviewDTOS.add(reviewDTO);
        }
        return reviewDTOS;
    }
    // 해당 축제의 리뷰 갯수 가져오기(GET)
    public long getReviewCount(Long festivalId) {return reviewRepository.countByFestivalId(festivalId);}
}
