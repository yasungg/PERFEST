package com.example.demo.dto.memberDTOs;

import com.example.demo.constant.Authority;
import com.example.demo.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberRequestDTO {

    @NotBlank(message = "e-mail을 입력하세요.")
    @Email(message = "올바른 이메일 형식을 입력해 주세요.")
    private String username;

    @NotBlank(message = "비밀번호를 입력하세요.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{10,}$", message = "비밀번호는 영문 대, 소문자와 숫자, 특수기호를 포함한 10자리 이상의 문자입니다.")
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
                .isEnabled(true)
                .totalPrice(BigDecimal.ZERO)
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
                .authority(Authority.ROLE_ADMIN)
                .build();

    }


    //회원정보가 DB에 존재하는지, 비밀번호는 DB 속 정보와 일치하는지 검사하는 메소드
    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(username, password);
    }
}
