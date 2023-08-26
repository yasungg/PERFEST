package com.example.demo.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component("PerfestAuthenticationProvider")
@RequiredArgsConstructor
@Slf4j
public class PerfestAuthenticationProvider implements AuthenticationProvider {
    private final PerfestUserDetailsService perfestUserDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String memberId = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();
        log.info("memberId in memberAuthProvider = {}", memberId);
        PerfestUserDetails userDetails = (PerfestUserDetails) perfestUserDetailsService.loadUserByUsername(memberId);
        String dbPassword = userDetails.getPassword();
        log.info("password from database = {}", dbPassword);

        log.info("is passwords equals? = {}", passwordEncoder.matches(password, dbPassword));
        if(userDetails == null || (!passwordEncoder.matches(password, dbPassword))) { //ID,PW 틀린 경우 OR 계정이 없는 경우
            log.info("location: PerfestAuthenticationProvider, BadCredentialsException");
            throw new BadCredentialsException("비밀번호가 틀렸습니다!");
        } else if(!userDetails.isAccountNonLocked()) {			//계정이 잠긴 경우(true로 고정, 추후 옵션처리 가능)
            log.info("location: PerfestAuthenticationProvider, LockedException");
            throw new LockedException(memberId);
        } else if(!userDetails.isEnabled()) {					//계정이 비활성화된 경우
            log.info("location: PerfestAuthenticationProvider, DisabledException");
            throw new DisabledException("탈퇴한 회원입니다.");
        } else if(!userDetails.isAccountNonExpired()) {			//계정이 만료된 경우
            log.info("location: PerfestAuthenticationProvider, AccountExpiredException");
            throw new AccountExpiredException(memberId);
        } else if(!userDetails.isCredentialsNonExpired()) {		//비밀번호가 만료된 경우
            log.info("location: PerfestAuthenticationProvider, CredentialsExpiredException");
            throw new CredentialsExpiredException(memberId);
        }

        Authentication newAuth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        log.info("newAuth = {}", newAuth);
        return newAuth;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
