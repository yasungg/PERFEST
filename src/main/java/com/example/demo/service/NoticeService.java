package com.example.demo.service;

import com.example.demo.entity.Member;
import com.example.demo.entity.Notice;
import com.example.demo.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

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
}
