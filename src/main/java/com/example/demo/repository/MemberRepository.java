package com.example.demo.repository;

import com.example.demo.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String mail);

    // 이메일로 회원 조회
    List<Member> findByMail(String email);

    // 회원 탈퇴 (status N -> Y 업데이트)
    @Modifying
    @Query("UPDATE Member m SET m.isDelete = 'Y' WHERE m.id = :memberId")
    void deleteMemberById(@Param("memberId") Long memberId);
}
