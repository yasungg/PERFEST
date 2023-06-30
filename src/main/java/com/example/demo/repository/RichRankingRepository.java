package com.example.demo.repository;

import com.example.demo.entity.RichRanking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RichRankingRepository extends JpaRepository<RichRanking, Long> {
    // 랭킹 전체 조회
    List<RichRanking> findAllByOrderByMemberTotalPriceAsc();
}
