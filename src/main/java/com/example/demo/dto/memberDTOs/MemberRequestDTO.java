package com.example.demo.dto.memberDTOs;

import com.example.demo.constant.Authority;
import com.example.demo.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRequestDTO {
    private String username;
    private String password;
    private String nickname;
    private String memberName;

    //일반 회원가입
    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .memberName(memberName)
                .nickname(nickname)
                .badges(0)
                .totalPrice(BigDecimal.ZERO)
                .joinTime(LocalDateTime.now())
                .authority(Authority.ROLE_USER)
                .build();
    }

    //카카오 회원가입
    public Member toKakaoMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .memberName(memberName)
                .nickname(nickname)
                .badges(0)
                .totalPrice(BigDecimal.ZERO)
                .joinTime(LocalDateTime.now())
                .authority(Authority.ROLE_KAKAO)
                .build();
    }

    //관리자 등록
    public Member toAdminMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .memberName(memberName)
                .nickname(nickname)
                .badges(0)
                .totalPrice(BigDecimal.ZERO)
                .joinTime(LocalDateTime.now())
                .authority(Authority.ROLE_ADMIN)
                .build();
    }

    //회원정보가 DB에 존재하는지, 비밀번호는 DB 속 정보와 일치하는지 검사하는 메소드
    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(username, password);
    }
}
