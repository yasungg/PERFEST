package com.example.demo.controller;

import com.example.demo.dto.NoticeDTO;
import com.example.demo.entity.Member;
import com.example.demo.service.NoticeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/auth/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;

    // 사용자의 알림 목록 가져오기(GET)
    @GetMapping("/noticeList")
    public ResponseEntity<List<NoticeDTO>> getNoticeList(@RequestParam("memberId") Long memberId) {
        List<NoticeDTO> noticeDTOList = noticeService.getNoticesByMember(memberId);
        return new ResponseEntity<>(noticeDTOList, HttpStatus.OK);


    }
}