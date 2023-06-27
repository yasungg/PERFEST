package com.example.demo.entity;

import com.example.demo.constant.PaymentStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@Table(name = "t_payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "payment_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "projuct_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "price", nullable = false)
    private int price;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @Column(name = "tid_key", nullable = false)
    private String tid;

    @Column(name = "tax_free_amount", nullable = false)
    private int tax_free_amount;

    @Column(name = "create")
    private LocalDateTime create_date;

    @Enumerated(EnumType.STRING)
    @Column(name = "is_cancel")
    private PaymentStatus paymentStatus;

    @Column(name = "cancel_date")
    private LocalDateTime cancel_date;
}
