package com.example.demo.entity;

import com.example.demo.constant.Authority;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@NoArgsConstructor
@Table(name = "t_member")
public class Member {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_name", unique = true)
    private String username;

    private String password;

    @Column(name = "member_name")
    private String memberName;

    private String nickname;

    @ColumnDefault("0")
    private int badges;

    @Column(name = "total_price")
    @ColumnDefault("0")
    private BigDecimal totalPrice;

    @Column(name = "join_time")
    private LocalDateTime joinTime;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Member(String mail, String password, String userName, String nickname, int badges, BigDecimal totalPrice, LocalDateTime joinTime, Authority authority) {
        this.username = mail;
        this.password = password;
        this.memberName = userName;
        this.nickname = nickname;
        this.badges = badges;
        this.totalPrice = totalPrice;
        this.joinTime = joinTime;
        this.authority = authority;
    }
}
