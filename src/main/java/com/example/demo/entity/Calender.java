package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter @Setter @ToString
@Table(name = "calender")
public class Calender {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "calender_id")

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "festival_id")
    private Festival festival;
}
