//package com.example.demo.repository;
//
//import com.example.demo.dto.FestivalTmpDTO;
//import com.example.demo.entity.Festival;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.test.context.TestPropertySource;
//
//import java.awt.print.Pageable;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@TestPropertySource(locations="classpath:application.properties")
//class FestivalRepositoryTest {
//    @Autowired
//    FestivalRepository festivalRepository;
//    @Test
//    @DisplayName("festival search")
//    void FestivalSearch() {
//        PageRequest pageRequest = PageRequest.of(0, 10);
//        Page<Festival> result = festivalRepository.findbySearchKeyword("서울", pageRequest);
//        System.out.println(result);
//    }
//
//    @Test
//    @DisplayName("getFestivalNameAndFestivalDesc")
//    void getFestivalNameAndFestivalDesc() {
//        FestivalTmpDTO result = festivalRepository.findFestivalNameAndFestivalDescById(3L);
//        System.out.println(result.getFestivalDesc());
//    }
//}