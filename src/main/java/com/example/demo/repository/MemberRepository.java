package com.example.demo.repository;

import com.example.demo.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String email);
    Optional<Member> findById(Long id);
    // 큰손 랭킹
    List<Member> findAllByOrderByTotalPriceDesc();
    // 뱃지 수 랭킹
    List<Member> findAllByOrderByBadgesDesc();
    Page<Member> findAll(Pageable pageable);
}
