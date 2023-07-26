package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.MemberLikeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor

public class MemberLikeService {
    private final MemberLikeRepository memberLikeRepository;

    public boolean insertBoardLike(Long communityId, Long memberId) {
        // 이미 해당 조합이 데이터베이스에 존재하는지 확인하기 위해 리포지토리를 이용하여 조회합니다.
        boolean isAlreadyLiked = memberLikeRepository.existsByCommunityIdAndMemberId(communityId, memberId);

        if (isAlreadyLiked) {
            return false;
        } else {
            MemberLike memberLike = new MemberLike();
            Member member = new Member();
            member.setId(memberId);
            memberLike.setMember(member);

            Community community = new Community();
            community.setId(communityId);
            memberLike.setCommunity(community);

            memberLikeRepository.save(memberLike);
            return true;
        }
    }
    public boolean insertCommentLike(Long commentId, Long memberId) {
        boolean isAlreadyLiked = memberLikeRepository.existsByCommentIdAndMemberId(commentId, memberId);

        if (isAlreadyLiked) {
            return false;
        } else {
            MemberLike memberLike = new MemberLike();
            Member member = new Member();
            member.setId(memberId);
            memberLike.setMember(member);

            Comment comment = new Comment();
            comment.setId(commentId);
            memberLike.setComment(comment);

            memberLikeRepository.save(memberLike);
            return true;
        }
    }
    public boolean insertReviewLike(Long reviewId, Long memberId) {
        boolean isAlreadyLiked = memberLikeRepository.existsByReviewIdAndMemberId(reviewId, memberId);

        if (isAlreadyLiked) {
            return false;
        } else {
            MemberLike memberLike = new MemberLike();
            Member member = new Member();
            member.setId(memberId);
            memberLike.setMember(member);

            Review review = new Review();
            review.setId(reviewId);
            memberLike.setReview(review);

            memberLikeRepository.save(memberLike);
            return true;
        }
    }
}
