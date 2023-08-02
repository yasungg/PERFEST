package com.example.demo.controller;

import com.example.demo.dto.ActivityListDTO;
import com.example.demo.service.ActivityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth/activity")
public class ActivityController {
    private final ActivityService activityService;
    @GetMapping("/get-activity-list")
    ResponseEntity<List<ActivityListDTO>> getActivityList(@RequestParam int festivalId) {
        return new ResponseEntity<>(activityService.sendActivityListToController((long) festivalId), HttpStatus.OK);
    }
}
