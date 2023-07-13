package com.example.demo.repository;

import com.example.demo.constant.CommunityCategory;
import com.example.demo.entity.Community;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

//@SpringBootTest
//@TestPropertySource(locations="classpath:application.properties")
//class CommunityRepositoryTest {
//    @Autowired
//    CommunityRepository communityRepository;
//    @Test
//    @DisplayName("게시판 테스트")
//    public void insertCommunityTest() {
//        Community community = new Community();
//        community.setCommunityTitle("테스트1");
//        community.setCommunityCategory(CommunityCategory.FREE_BOARD);
//        community.setCommunityDesc("테스트입니다.");
//        community.setWrittenTime(LocalDateTime.now());
//        community.setCommunityImgLink("testrtttt");
//        community.setLikeCount(10);
//        Community rst = communityRepository.save(community);
//        System.out.println("테스트 결과" + rst.toString());
//    }
//
//
//}