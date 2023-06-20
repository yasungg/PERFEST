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
@Table(name = "t_member")
public class Member {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "e_mail", unique = true)
    private String mail;

    private String password;

    @Column(name = "user_name")
    private String userName;

    private String nickname;

    @ColumnDefault("0")
    private int badges;

    @Column(name = "total_price")
    private BigDecimal totalPrice;

    @Column(name = "join_time")
    private LocalDateTime joinTime;

    @Enumerated(EnumType.STRING)
    private Authority authority;
}
