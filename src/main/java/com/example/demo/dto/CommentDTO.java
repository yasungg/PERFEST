package com.example.demo.dto;

import com.example.demo.entity.Community;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class CommentDTO {
    private Long commentId;
    private Long memberId;
    private Long parentId;
    private Long communityId; // 안쓰면 지울예정
    private String commentBody;
    private LocalDateTime commentWrittenTime;
    private int commentLikeCount;
    private String nickname;
}
