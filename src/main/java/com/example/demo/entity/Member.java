package com.example.demo.entity;

import com.example.demo.constant.Authority;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.jetbrains.annotations.NotNull;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@NoArgsConstructor(force = true)
@Table(name = "t_member")
@AllArgsConstructor
public class Member {
    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "username", unique = true) // 이메일;
    private String username;

    @Column
    @NotNull
    private String password;

    @Column(name = "member_name")
    private String memberName;

    @Column(unique = true,  length = 20)
    @NotNull
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

    @Column(name = "is_enabled", columnDefinition = "TINYINT(1)") // 회원탈퇴여부
    @ColumnDefault("true")
    private boolean isEnabled;

    @Column(name = "join_time")
    private LocalDateTime joinTime;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Builder
    public Member(String username, String password, String memberName, String nickname, int badges, BigDecimal totalPrice, LocalDateTime joinTime, Authority authority, boolean isEnabled) {
        this.username = username;
        this.password = password;
        this.memberName = memberName;
        this.nickname = nickname;
        this.isEnabled = isEnabled;
        this.badges = badges;
        this.totalPrice = totalPrice;
        this.joinTime = joinTime;
        this.authority = authority;
    }

    public Member(Long id, String username, String password, String nickname, Authority authority) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.authority = authority;
    }
}