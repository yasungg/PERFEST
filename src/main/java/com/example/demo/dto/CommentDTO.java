package com.example.demo.dto;

import com.example.demo.entity.Community;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CommentDTO {
    private String commentBody;
    private LocalDateTime commentWrittenTime;
    private int commentLikeCount;
    private List<CommunityDTO> communitys; // 게시글 번호
}