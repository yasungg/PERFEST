package com.example.demo.entity;

import com.example.demo.constant.Authority;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

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

    @Column(name = "e_mail", unique = true, nullable = false, length = 50)
    private String mail;

    @Column(nullable = false)
    private String password;

    @Column(name = "user_name", nullable = false, length = 20)
    private String userName;

    @Column(unique = true, nullable = false, length = 20)
    private String nickname;

    @Column(name = "img", length = 500) // 프로필사진
    private String img;

    @ColumnDefault("0")
    private int badges;

    @ColumnDefault("0")
    private BigDecimal totalPrice;

    @ColumnDefault("'N'") // 회원 탈퇴여부 default N
    private String isDelete;

    // 가입일자
    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime regDate;


    @Enumerated(EnumType.STRING) // 일반회원 계정, 관리자 계정
    private Authority authority;
}
