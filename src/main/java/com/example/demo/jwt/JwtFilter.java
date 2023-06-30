package com.example.demo.jwt;

import com.example.demo.security.ApiError;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
//OncePerRequestFilter를 상속받아 JWT 토큰을 필터링하는 역할을 수행하는 JWT Filter class
public class JwtFilter extends OncePerRequestFilter {
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    private final TokenProvider tokenProvider;

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ExpiredJwtException, ServletException, IOException {
        // "/auth"로 시작하는 endpoint는 jwt 인증 로직을 예외 없이 완전히 건너뜀.
        if (isAuthEndpoint(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        // jwt 유효성 검사
        String jwt = resolveToken(request);
        log.info("resolved jwt = {}", jwt);
        log.info("validateToken result = {}", tokenProvider.validateToken(jwt));

        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    //요청 URI가 /auth로 시작하는지 아닌지 검사 후, boolean을 리턴하는 메소드
    private boolean isAuthEndpoint(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        return requestURI.startsWith("/auth");
    }
}
