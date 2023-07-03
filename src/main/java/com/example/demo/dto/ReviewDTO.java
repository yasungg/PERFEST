package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class ReviewDTO {
    private Long reviewId;
    private String reviewTitle;
    private LocalDateTime reviewWrittenTime;
    private String reviewImg;
    private String reviewContent;
}
