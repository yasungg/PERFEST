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


    @Column(name = "username", unique = true) // 이메일;
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(name = "member_name")
    private String memberName;

    @Column(unique = true, nullable = false, length = 20)
    private String nickname;

    @Column(name = "address") // 주소
    private String address;

    @Column(name = "img", length = 500) // 프로필사진
    private String img;

    @ColumnDefault("0")
    private int badges;

    @Column(name = "total_price")
    @ColumnDefault("0")
    private BigDecimal totalPrice;

    @Column(name = "is_delete") // 회원탈퇴여부
    @ColumnDefault("'N'")
    private String isDelete;

    @Column(name = "join_time")
    private LocalDateTime joinTime;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Member(String username, String password, String memberName, String nickname, int badges, BigDecimal totalPrice, LocalDateTime joinTime, Authority authority) {
        this.username = username;
        this.password = password;
        this.memberName = memberName;
        this.nickname = nickname;
        this.badges = badges;
        this.totalPrice = totalPrice;
        this.joinTime = joinTime;
        this.authority = authority;
    }
}