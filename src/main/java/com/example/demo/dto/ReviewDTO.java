package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class ReviewDTO {
    private Long reviewId;
    private Long memberId;
    private LocalDateTime reviewWrittenTime;
    private String reviewImg;
    private String reviewContent;
    private String nickname;
}
