package com.example.demo.entity;

import com.example.demo.constant.PaymentStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@Table(name = "reservation_payment")
public class ReservationPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "reservation_payment_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
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
