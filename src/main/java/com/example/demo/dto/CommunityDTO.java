package com.example.demo.dto;


import lombok.*;


import java.time.LocalDateTime;


@Getter@Setter
public class CommunityDTO {
    private Long communityId;
    private Long memberId;
    private String communityTitle;
    private String communityCategory;
    private String communityDesc;
    private String communityImgLink;
    private int likeCount;
    private LocalDateTime writtenTime;
    private String nickname;

}
