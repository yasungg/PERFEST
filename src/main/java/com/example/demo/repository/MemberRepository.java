package com.example.demo.repository;

import com.example.demo.dto.memberDTOs.MemberListDTO;
import com.example.demo.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByUsername(String email);
    Optional<Member> findById(Long id);

    // 로그인 후 홈페이지에 띄울 이름
    Member findMemberNameById(Long id);
    // 큰손 랭킹
    List<Member> findAllByOrderByTotalPriceDesc();

    // 뱃지 수 랭킹
    List<Member> findAllByOrderByBadgesDesc();

    //회원 전체 리스트 페이지네이션 진행하여 반환
    @Query("SELECT new com.example.demo.dto.memberDTOs.MemberListDTO (m.id, m.badges, m.isEnabled, m.username, m.nickname, m.totalPrice, m.memberName, m.joinTime, m.address, m.authority) FROM Member m")
    Page<MemberListDTO> findAllMemberExceptPassword(Pageable pageable);

    //회원 이름 검색 기능
    @Query("SELECT new com.example.demo.dto.memberDTOs.MemberListDTO (m.id, m.badges, m.isEnabled, m.username, m.nickname, m.totalPrice, m.memberName, m.joinTime, m.address, m.authority) FROM Member m WHERE m.memberName LIKE %:memberName%")
    List<MemberListDTO> findByMemberNameContaining(@Param("memberName") String memberName);

    //회원 탈퇴, 재가입 전에 해당 회원의 계정이 활성화된 상태인지 체크
    @Query("SELECT m.isEnabled from Member m WHERE m.id IN :memberIds")
    List<Boolean> findIsEnabledByIdIn(@Param("memberIds")List<Long> memberIds);

    //회원 탈퇴, 재가입 기능
    @Modifying
    @Query("UPDATE Member m SET m.isEnabled = :isEnabled WHERE m.id IN :memberIds")
    void updateIsEnabledByIdIn(@Param("memberIds") List<Long> memberIds, @Param("isEnabled")boolean isEnabled);
}
