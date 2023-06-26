package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter@Setter
public class CommunityDTO {
    private String communityTitle;
    private String communityCategory;
    private String communityDesc;
    private String communityImgLink;
    private int likeCount;
    private LocalDateTime writtenTime;
}
