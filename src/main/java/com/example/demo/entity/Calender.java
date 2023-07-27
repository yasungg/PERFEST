package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@Table(name = "t_calender")
public class Calender {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "calender_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "festival_id")
    private Festival festival;

    @Column(name = "liked_date")
    private LocalDateTime likedDate; // 좋아요를 누른 시점의 날짜와 시간
}
