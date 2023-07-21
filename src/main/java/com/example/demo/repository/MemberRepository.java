package com.example.demo.repository;

import com.example.demo.dto.memberDTOs.MemberListDTO;
import com.example.demo.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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
    @Query("SELECT new com.example.demo.dto.memberDTOs.MemberListDTO (m.id, m.badges, m.isEnabled, m.username, m.nickname, m.totalPrice, m.memberName, m.joinTime, m.address, m.authority) FROM Member m")
    Page<MemberListDTO> findAllMemberExceptPassword(Pageable pageable);
}
