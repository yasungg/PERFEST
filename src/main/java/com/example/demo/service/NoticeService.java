package com.example.demo.service;

import com.example.demo.dto.NoticeDTO;
import com.example.demo.entity.Member;
import com.example.demo.entity.Notice;
import com.example.demo.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class NoticeService {

    private final NoticeRepository noticeRepository;


    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void createAndSaveNotification(Member member, String contents) {
        // 알림 생성 및 저장
        Notice notice = new Notice();
        notice.setMember(member); // 알림을 받을 회원(Member) 설정
        notice.setContents(contents); // 알림 내용 설정
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
            noticeDTO.setCreated(LocalDateTime.now());

            noticeDTOList.add(noticeDTO);
        }
        return noticeDTOList;
    }
}