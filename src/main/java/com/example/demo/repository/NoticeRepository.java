package com.example.demo.repository;

import com.example.demo.entity.Member;
import com.example.demo.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    // 특정 회원의 알람목록 가져오기
    List<Notice> findByMemberId(Long memberId);
    // 특정 시간 이전에 생성된 알림 조회
    List<Notice> findByCreatedBefore(LocalDateTime cutoffTime);
}
