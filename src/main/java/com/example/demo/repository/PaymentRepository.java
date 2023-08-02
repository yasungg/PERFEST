package com.example.demo.repository;

import com.example.demo.entity.Member;
import com.example.demo.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // 회원 결제 조회
    List<Payment> findByMemberId(Long memberId);
    Optional<Payment> findByMemberIdAndProductId(Long memberId, Long productId);
    Optional<Payment> findByMemberIdAndProductIdAndId(Long memberId, Long productId, Long Id);
}
