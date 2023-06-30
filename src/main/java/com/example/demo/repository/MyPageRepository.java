package com.example.demo.repository;

import com.example.demo.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyPageRepository extends JpaRepository<Member, Long> {

    // 이메일로 회원 조회
    List<Member> findByUsername(String email); // string Token

    // 전체 회원 닉네임 조회 (닉네임 수정을 위한)
    Optional<Member> findByNickname(String nickname);

    // 회원 식별자로 회원조회
    List<Member> findByMemberId(Long id);




}