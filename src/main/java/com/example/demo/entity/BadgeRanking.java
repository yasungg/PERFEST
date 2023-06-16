package com.example.demo.entity;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter @Setter @ToString
@Table(name = "badge_ranking")
public class BadgeRanking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "badge_ranking_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "badge_rank",nullable = false, columnDefinition = "1")
    private int badgeRank;
}
