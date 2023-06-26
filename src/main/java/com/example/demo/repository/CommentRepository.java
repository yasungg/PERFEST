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
    // 댓글 갯수 가져오기(GET)
    long count();
    // 게시판 번호를 가지고 맞는 댓글 조회
    @Query("SELECT c FROM Comment c JOIN FETCH c.community co WHERE co.id = :communityId")
    List<Comment> findByCommunityIdWithJoin(@Param("communityId") Long communityId);
}
