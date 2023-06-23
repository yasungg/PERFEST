package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDTO {
    private String commentBody;
    private LocalDateTime commentWrittenTime;
    private int commentLikeCount;
}
