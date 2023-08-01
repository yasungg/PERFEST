package com.example.demo.controller;

import com.example.demo.dto.NoticeDTO;
import com.example.demo.entity.Member;
import com.example.demo.jwt.TokenProvider;
import com.example.demo.service.NoticeService;
import com.example.demo.user.ContextGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;


@RestController
@Slf4j
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;
    private final ContextGetter contextGetter;
    private final HttpServletResponse response;
    private final TokenProvider tokenProvider;



    // 사용자의 알림 목록 가져오기(GET)
    @GetMapping("/noticeList")
    public ResponseEntity<List<NoticeDTO>> getNoticeList() {
        Long memberId = contextGetter.getId();
        List<NoticeDTO> noticeDTOList = noticeService.getNoticesByMember(memberId);
        tokenProvider.setNewAccessTokenToHeader(response);
        return new ResponseEntity<>(noticeDTOList, HttpStatus.OK);
    }
}