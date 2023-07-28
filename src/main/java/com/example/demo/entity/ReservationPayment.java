package com.example.demo.entity;

import com.example.demo.constant.PaymentStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@Table(name = "t_reservation_payment")
public class ReservationPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_payment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @Column(nullable = false)
    private int amount;

    @Column(name = "reservation_payment_time", nullable = false)
    private LocalDateTime rPayTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "is_cancelled", nullable = false)
    private PaymentStatus paymentStatus;

    @Column(name = "cancel_date")
    private LocalDateTime rCancelDate;
}
