package com.example.demo.repository;

import com.example.demo.constant.CommunityCategory;
import com.example.demo.dto.CommunityDTO;
import com.example.demo.entity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface CommunityRepository extends JpaRepository<Community, Long> {
    // 게시판 전체 글 조회
    Page<Community> findAll(Pageable pageable);
    // 게시판 카테고리 선택 조회
    List<Community> findByCommunityCategory(CommunityCategory communityCategory);
    // 게시판 수정을 위한 게시판 아이디 갖고 오기
    Optional<Community> findById(Long id);
    // 게시판 내림차순 정렬 최신순
    List<Community> findByCommunityCategoryOrderByWrittenTimeDesc(CommunityCategory communityCategory);
    // 게시판 내림차순 정렬 인기순
    List<Community> findByCommunityCategoryOrderByLikeCountDesc(CommunityCategory communityCategory);

    // 회원이 쓴 게시글 조회
    List<Community> findByMemberId(Long memberId);

    // 게시글 제목 검색
    List<Community> findByCommunityTitleContaining(String communityTitle);
    // 게시판 내림차순 전체 정렬 인기순
    List<Community> findAllByOrderByLikeCountDesc();
    // 게시판 내림차순 전체 정렬 최신순
    List<Community> findAllByOrderByWrittenTimeDesc();


}
