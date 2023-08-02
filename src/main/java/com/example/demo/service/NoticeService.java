package com.example.demo.service;

import com.example.demo.dto.NoticeDTO;
import com.example.demo.entity.Member;
import com.example.demo.entity.Notice;
import com.example.demo.repository.MyPageRepository;
import com.example.demo.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
@EnableScheduling
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final MyPageRepository myPageRepository;


    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void createAndSaveNotification(String nickname, String contents, LocalDateTime created) {
        Member member = myPageRepository.findByNickname(nickname)
                .orElseThrow(() -> new IllegalArgumentException("해당 닉네임에 해당하는 회원이 존재하지 않습니다."));

        // 알림 생성 및 저장
        Notice notice = new Notice();
        notice.setMember(member); // 알림을 받을 회원 설정
        notice.setContents(contents); // 알림 내용 설정
        notice.setCreated(created); // 작성시간
        noticeRepository.save(notice); // 알림 저장
    }


    // 특정 회원의 알림 목록 가져오기
    public List<NoticeDTO> getNoticesByMember(Long memberId) {
        List<Notice> notices = noticeRepository.findByMemberId(memberId);
        return convertToDTOList(notices);
    }

    // Notice 엔티티 리스트를 NoticeDTO 리스트로 변환하는 메서드
    private List<NoticeDTO> convertToDTOList(List<Notice> notices) {
        List<NoticeDTO> noticeDTOList = new ArrayList<>();
        for (Notice notice : notices) {
            NoticeDTO noticeDTO = new NoticeDTO();
            noticeDTO.setId(notice.getId());
            noticeDTO.setContents(notice.getContents());
            noticeDTO.setCreated(notice.getCreated());

            noticeDTOList.add(noticeDTO);
        }
        return noticeDTOList;
    }

    // 한달이 지난 알림 삭제 (스케줄러)
    @Scheduled(cron = "0 0 0 * * *") // 매일 자정에 실행 순서대로 초/분/시/일/월/요일(0-7, 0과7은 일요일이며 1부터 월요일 6이 토요일)
    public void deleteOldNotices() {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
//        LocalDateTime testTimeSec = LocalDateTime.now().minusSeconds(20); // 테스트용 20초
        log.info("한달지난 알림 삭제 완료");
        deleteOldNoticesBefore(oneMonthAgo);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private void deleteOldNoticesBefore(LocalDateTime cutoffTime) {
        List<Notice> oldNotices = noticeRepository.findByCreatedBefore(cutoffTime);
        log.info("알람삭제");
        noticeRepository.deleteAll(oldNotices);

    }



}