package com.example.demo.controller;

import com.example.demo.dto.FestivalDTO;
import com.example.demo.service.FestivalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}