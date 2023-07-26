package com.example.demo.repository;

import com.example.demo.entity.MemberLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberLikeRepository extends JpaRepository<MemberLike, Long> {
    Boolean existsByCommunityIdAndMemberId(Long communityId, Long memberId);
    Boolean existsByCommentIdAndMemberId(Long commentId, Long memberId);
    Boolean existsByReviewIdAndMemberId(Long reviewId, Long memberId);
}
