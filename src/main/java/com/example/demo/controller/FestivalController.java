package com.example.demo.controller;

import com.example.demo.entity.Festival;
import com.example.demo.dto.FestivalDTO;
import com.example.demo.service.FestivalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/auth/festival")
public class FestivalController {
    private final FestivalService festivalService;

    // 관리자 전용 : 축제 전체 공공 데이터 받아와서 파싱 후 DB에 저장
    @GetMapping("/get-festival-info")
    public Boolean getFestivalInfo() throws IOException {
        return festivalService.getFestivalInfo();
    }

    // 축제 상세 정보 가져오기(GET)
    @GetMapping(value = "/getfestivaldetail")
    public ResponseEntity<List<FestivalDTO>> festvialDetail(@RequestParam int festivalId) {
        List<FestivalDTO> list = festivalService.getFestivalDetail((long) festivalId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //축제 검색 결과 가져오기
    @GetMapping("/get-name-searchresult")
    public ResponseEntity<Page<Festival>> getFestivalSearchResultByName(@NotNull @RequestParam String keyword, @RequestParam int pageNum, @RequestParam int pageSize) {
        return new ResponseEntity<>(festivalService.searchFestivalByKeyword(keyword, pageNum, pageSize), HttpStatus.OK);
    }
    @GetMapping("/get-region-searchresult")
    public ResponseEntity<Page<Festival>> getFestivalSearchResultByRegion(@NotNull @RequestParam String keyword, @RequestParam int pageNum, @RequestParam int pageSize) {
        return null;
    }
}