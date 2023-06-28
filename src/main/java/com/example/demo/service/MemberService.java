package com.example.demo.service;

import com.example.demo.constant.Authority;
import com.example.demo.dto.memberDTOs.MemberRequestDTO;
import com.example.demo.dto.memberDTOs.MemberResponseDTO;
import com.example.demo.dto.memberDTOs.TokenDTO;
import com.example.demo.entity.Member;
import com.example.demo.jwt.TokenProvider;
import com.example.demo.repository.MemberRepository;
import com.example.demo.user.PerfestAuthenticationProvider;
import com.example.demo.user.PerfestKakaoAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder managerBuilder;
    private final PerfestAuthenticationProvider provider;
    private final PerfestKakaoAuthenticationProvider kakaoAuthProvider;
    private final PasswordEncoder passwordEncoder;
    private final HttpSession session;

    private final MemberRepository memberRepository;

    public MemberResponseDTO signup(MemberRequestDTO requestDto) {
        if (memberRepository.findByUsername(requestDto.getUsername()).isPresent()) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }
        Member member = requestDto.toMember(passwordEncoder);
        return MemberResponseDTO.of(memberRepository.save(member));
    }

    public MemberResponseDTO kakaoSignup(MemberRequestDTO requestDto) {
        if (memberRepository.findByUsername(requestDto.getUsername()).isPresent()) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }
        Member member = requestDto.toKakaoMember(passwordEncoder);
        return MemberResponseDTO.of(memberRepository.save(member));
    }

    public MemberResponseDTO adminSignup(MemberRequestDTO requestDto) {
        if (memberRepository.findByUsername(requestDto.getUsername()).isPresent()) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }
        Member member = requestDto.toAdminMember(passwordEncoder);
        return MemberResponseDTO.of(memberRepository.save(member));
    }

    public TokenDTO login(MemberRequestDTO requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();

        Authentication authentication = provider.authenticate(authenticationToken);

        return tokenProvider.generateTokenDTO(authentication);
    }

    public TokenDTO kakaoLogin() {
        String mail = (String) session.getAttribute("mail");
        log.info("memberService.kakaoLogin mail check = {}", mail);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(mail, "");
        log.info("memberService.kakaoLogin authentication token check = {}", authenticationToken);

        Authentication authentication = kakaoAuthProvider.authenticate(authenticationToken);
        log.info("authentication = {}", authentication);

        return tokenProvider.generateTokenDTO(authentication);
    }
}
