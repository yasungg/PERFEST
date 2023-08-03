//package com.example.demo.repository;
//
//import com.example.demo.dto.ActivityListDTO;
//import com.example.demo.entity.Activity;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@TestPropertySource(locations = "classpath:application.properties")
//class ActivityRepositoryTest {
//    @Autowired
//    ActivityRepository activityRepository;
//
//    @Test
//    @DisplayName("get-activity-list")
//    void getActivityList() {
//        List<ActivityListDTO> result = activityRepository.findByFestivalId(1L);
//        for(ActivityListDTO list : result) {
//            System.out.println(list.getActivityName());
//        }
//    }
//}