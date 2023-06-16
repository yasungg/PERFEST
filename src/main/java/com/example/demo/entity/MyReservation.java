package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter @Setter @ToString
@Table(name = "my_reservation")
public class MyReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "my_reservation_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;
}
