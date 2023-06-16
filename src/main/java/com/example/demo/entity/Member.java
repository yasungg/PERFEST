package com.example.demo.entity;

import com.example.demo.constant.Authority;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@Table(name = "member")
public class Member {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "e_mail", nullable = false, unique = true)
    private String mail;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, name = "user_name")
    private String userName;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column(nullable = false, columnDefinition = "0")
    private int badges;

    @Column(name = "total_price", nullable = false, columnDefinition = "0")
    private BigDecimal totalPrice;

    @Column(name = "join_time", nullable = false)
    private LocalDateTime joinTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Authority authority;
}
