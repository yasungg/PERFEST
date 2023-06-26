package com.example.demo.repository;

import com.example.demo.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyPageRepository extends JpaRepository<Member, Long> {

    // 이메일로 회원 조회
    List<Member> findByMail(String email); // string Token

    // 회원 탈퇴 (status N -> Y 업데이트)
    @Modifying
    @Query("UPDATE Member m SET m.isDelete = 'Y' WHERE m.id = :memberId")
    void deleteMemberById(@Param("memberId") Long memberId);

    // 회원 닉네임 수정

}
