package com.example.demo.entity;

import com.example.demo.constant.Authority;
import com.example.demo.constant.IsDelete;
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

    @ColumnDefault("0")
    private BigDecimal totalPrice;

    @Column(name = "join_time")
    private LocalDateTime joinTime;

    @Enumerated(EnumType.STRING) // 탈퇴 여부 X, O
    private IsDelete isDelete;

    @Enumerated(EnumType.STRING) // 일반회원 계정, 관리자 계정
    private Authority authority;
}
