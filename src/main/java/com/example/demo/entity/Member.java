package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;
import javax.persistence.*;
import java.math.BigDecimal;

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

    @Column(name = "img") // 프로필사진
    private String img;

    @ColumnDefault("0")
    private int badges;

    @ColumnDefault("0")
    private BigDecimal totalPrice;

    @ColumnDefault("'N'") // 회원 탈퇴여부 default N
    private String isDelete;


//    @Column(name = "join_time")
//    private LocalDateTime joinTime;


//    @Enumerated(EnumType.STRING) // 일반회원 계정, 관리자 계정
//    private Authority authority;
}
