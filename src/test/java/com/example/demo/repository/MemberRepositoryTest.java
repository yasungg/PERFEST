package com.example.demo.repository;

import com.example.demo.dto.memberDTOs.MemberListDTO;
import com.example.demo.entity.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.repository.query.Param;
import org.springframework.test.context.TestPropertySource;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestPropertySource(locations="classpath:application.properties")
class MemberRepositoryTest {
    @Autowired
    MemberRepository memberRepository;
    @Test
    @DisplayName("change status")
    void changeIsEnabled() {
        List<Long> memberIds = new ArrayList<>();
        memberIds.add(1L);
        memberIds.add(2L);
        memberIds.add(3L);
        memberIds.add(4L);
        memberRepository.updateIsEnabledByIdIn(memberIds, false);
        List<Member> result = memberRepository.findAll();
        for(Member member : result) {
            System.out.println(member);
        }
    }
    @Test
    @DisplayName("checkIsEnabled")
    void checkIsEnabled() {
        List<Long> memberIds = new ArrayList<>();
        memberIds.add(1L);
        memberIds.add(2L);
        memberIds.add(3L);
        memberIds.add(4L);
        List<Boolean> result = memberRepository.findIsEnabledByIdIn(memberIds);
        for(boolean rst : result) {
            System.out.println(rst);
        }
        System.out.println(result);
    }
}