package com.example.demo.controller;


import com.example.demo.dto.BadgeRankingDTO;
import com.example.demo.dto.RichRankingDTO;
import com.example.demo.service.BadgeRankingService;
import com.example.demo.service.RichRankingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
@RequestMapping("/auth/badgeranking")
@RequiredArgsConstructor
public class BadgeRankingController {
    private final BadgeRankingService badgeRankingService;

   @GetMapping(value = "/getbadgeranking")
    public ResponseEntity<List<BadgeRankingDTO>> badgeRankingList() {
        List<BadgeRankingDTO> list = badgeRankingService.getBadgeRankingList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
