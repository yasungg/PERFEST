package com.example.demo.controller;

import com.example.demo.service.FestivalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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
}