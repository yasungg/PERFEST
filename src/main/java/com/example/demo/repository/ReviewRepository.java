package com.example.demo.repository;

import com.example.demo.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // 해당 축제에 맞는 리뷰를 가져오기 위해서
    Page<Review> findByFestivalId(Long festivalId, Pageable pageable);
    // 해당 축제의 리뷰 갯수 가져오기
    long countByFestivalId(Long festivalId);

    // 내 리뷰 조회
    List<Review> findByMemberId(Long memberId);

}
