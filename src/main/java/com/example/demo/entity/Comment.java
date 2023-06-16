package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@Table(name = "comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "comment_id")

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;

    @Column(name = "comment_written_time")
    private LocalDateTime commentWrittenTime;

    @Column(nullable = false)
    private String commentBody;

    @Column(name = "comment_like_count", columnDefinition = "0")
    private int commentLikeCount;
}
