package com.example.demo.repository;

import com.example.demo.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // 해당 축제에 맞는 리뷰를 가져오기 위해서
    List<Review> findByFestivalId(Long festivalId);
}
