package com.example.demo.repository;

import com.example.demo.constant.CommunityCategory;
import com.example.demo.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long> {
    // 게시판 전체 글 조회
    List<Community> findAll();
    // 게시판 카테고리 선택 조회
    List<Community> findByCommunityCategory(CommunityCategory communityCategory);
    // 게시판 수정을 위한 게시판 아이디 갖고 오기
    Optional<Community> findById(Long id);
    List<Community> findByOrderBywrittenTimeDesc();

}
