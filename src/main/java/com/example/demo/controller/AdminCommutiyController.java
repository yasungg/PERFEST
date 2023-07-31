package com.example.demo.controller;


import com.example.demo.dto.CommunityDTO;
import com.example.demo.service.CommunityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/admin-community")
public class AdminCommutiyController {
    private final CommunityService communityService;


    // 관리자 전체 게시글 조회
//    @GetMapping("/get-community-all")
//    public ResponseEntity<Page<CommunityDTO>> adminCommunityList(@RequestParam(defaultValue = "0") int pageNumber,
//                                                                 @RequestParam(defaultValue = "10") int pageSize) {
//        Page<CommunityDTO> communityDTOPage = communityService.getCommunityList(pageNumber, pageSize);
//        return new ResponseEntity<>(communityDTOPage, HttpStatus.OK);
//    }
    // 관리자 게시판 삭제

}
