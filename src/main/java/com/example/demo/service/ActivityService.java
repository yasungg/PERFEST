package com.example.demo.service;

import com.example.demo.dto.ActivityListDTO;
import com.example.demo.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityService {
    private final ActivityRepository activityRepository;


    public List<ActivityListDTO> sendActivityListToController(Long festivalId) {
        return activityRepository.findByFestivalId(festivalId);
    }
}
