package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter @Setter
public class CalenderDTO {
    private Long id; // 캘린더id
    private String festivalName; // 축제 이름
    private Date startDate; // 시작일
    private Date endDate; // 종료일
    private LocalDateTime likeDate;
}
