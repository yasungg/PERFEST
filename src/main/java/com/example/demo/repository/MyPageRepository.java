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

    // 닉네임으로 회원 조회 // 닉 중복 방지위해 추가
    Optional<Member> findByNickname(String nickname);

    // 회원 닉네임 수정
    void updateNicknameByUsername(String email, String nickName);
}