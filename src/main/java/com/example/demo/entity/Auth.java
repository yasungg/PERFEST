package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter @ToString
@Table(name = "t_auth")
@NoArgsConstructor
public class Auth {
    @Id
    @Column(name = "auth_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String grantType;

    private String refreshToken;

    private Date refreshTokenExpiresIn;

    @Builder
    public Auth(Member member, String grantType, String refreshToken, Date refreshTokenExpiresIn) {
        this.member = member;
        this.grantType = grantType;
        this.refreshToken = refreshToken;
        this.refreshTokenExpiresIn = refreshTokenExpiresIn;
    }
}
