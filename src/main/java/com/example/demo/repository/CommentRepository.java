package com.example.demo.repository;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 댓글 수정하기위해 댓글 번호(POST)
    Optional<Comment> findById(Long id);
    // 해당 게시판의 댓글 갯수 가져오기(GET)
    long countByCommunityId(Long communityId);
    // 게시판 번호를 가지고 맞는 댓글 조회

    List<Comment> findByCommunityId(Long communityId);

    // 회원이 쓴 게시글 조회
    List<Comment> findByMemberId(Long memberId);
    // 대댓글 조회
    List<Comment> findByParentId(Long parentId);
}
