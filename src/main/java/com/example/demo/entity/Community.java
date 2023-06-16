package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@Table(name = "community")
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "community_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "community_img")
    private String communityImgLink;

    @Column(nullable = false)
    private String category;

    @Column(name = "community_title", nullable = false)
    private String communityTitle;

    @Column(nullable = false, name = "community_desc")
    private String communityDesc;

    @Column(nullable = false, name = "written_time")
    private LocalDateTime writtenTime;

    @Column(name = "like_count", columnDefinition = "0")
    private int likeCount;
}
