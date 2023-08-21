package com.example.demo.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Slf4j
@Component("PerfestKakaoAuthenticationProvider")
@RequiredArgsConstructor
public class PerfestKakaoAuthenticationProvider implements AuthenticationProvider {
    private final PerfestUserDetailsService perfestUserDetailsService;
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String memberId = (String) authentication.getPrincipal();

        PerfestUserDetails userDetails = (PerfestUserDetails) perfestUserDetailsService.loadUserByUsername(memberId);

        if(userDetails == null) { // 카카오로부터 전달받은 email을 통해 회원정보 검색만 하고 로그인 처리.
            throw new BadCredentialsException(memberId);
        } else if(!userDetails.isAccountNonLocked()) {			//계정이 잠긴 경우(true로 고정, 추후 옵션처리 가능)
            log.info("2");
        throw new LockedException(memberId);
        } else if(!userDetails.isEnabled()) {					//계정이 비활성화된 경우
            log.info("3");
        throw new DisabledException(memberId + "는 비활성화된 계정입니다!");
        } else if(!userDetails.isAccountNonExpired()) {			//계정이 만료된 경우
            log.info("4");
        throw new AccountExpiredException(memberId);
        } else if(!userDetails.isCredentialsNonExpired()) {		//비밀번호가 만료된 경우
            log.info("5");
        throw new CredentialsExpiredException(memberId);
        }

        Authentication newAuth = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
        return newAuth;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
