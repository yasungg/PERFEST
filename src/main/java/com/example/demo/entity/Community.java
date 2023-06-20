package com.example.demo.entity;

import com.example.demo.constant.CommunityCategory;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@Table(name = "t_community")
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "community_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "community_img")
    private String communityImgLink;

    @Column(name = "community_category")
    @Enumerated(EnumType.STRING)
    private CommunityCategory communityCategory;

    @Column(name = "community_title", nullable = false)
    private String communityTitle;

    @Column(name = "community_desc")
    private String communityDesc;

    @Column(name = "written_time")
    private LocalDateTime writtenTime;

    @Column(name = "like_count")
    @ColumnDefault("0")
    private int likeCount;
}
