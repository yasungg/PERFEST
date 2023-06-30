package com.example.demo.controller;

import com.example.demo.dto.RichRankingDTO;
import com.example.demo.service.RichRankingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/auth/richranking")
@RequiredArgsConstructor
public class RichRankingController {
    private final RichRankingService richRankingService;

    @GetMapping(value = "/getrichranking")
    public ResponseEntity<List<RichRankingDTO>> richRankingList() {
        List<RichRankingDTO> list = richRankingService.getRichRankingList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
