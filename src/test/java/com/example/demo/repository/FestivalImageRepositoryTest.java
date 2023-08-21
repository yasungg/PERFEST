package com.example.demo.repository;

import com.example.demo.entity.FestivalImage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

import java.util.List;



@SpringBootTest
@TestPropertySource(locations="classpath:application.properties")
class FestivalImageRepositoryTest {
    @Autowired
    FestivalImageRepository festivalImageRepository;

    @Test
    @DisplayName("findbyfestivalId")
    void findByFestivalId() {
        List<FestivalImage> result = festivalImageRepository.findByFestivalId(1L);
        for(FestivalImage e : result) {
            System.out.println(e.getFestivalImgLink());
        }
    }

}