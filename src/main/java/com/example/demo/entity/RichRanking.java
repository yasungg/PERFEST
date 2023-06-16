package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter @Setter @ToString
@Table(name = "rich_ranking")
public class RichRanking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "rich_ranking_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "rich_rank")
    private int richRank;
}
