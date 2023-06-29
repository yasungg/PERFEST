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
    private final ObjectMapper objectMapper;

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
        if(isAuthEndpoint(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = resolveToken(request);
        log.info("resolved jwt = {}", jwt);

        try {

        log.info("validateToken result = {}", tokenProvider.validateToken(jwt));

        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            throw new ExpiredJwtException(null, null, "Token expired"); // 토큰 만료 예외 던지기
        }

        } catch (ExpiredJwtException ex) {
            // 만료된 토큰 예외 처리
            SecurityContextHolder.clearContext(); // 만료된 인증 컨텍스트 제거

            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, "Token Expired!");
            objectMapper.writeValue(response.getWriter(), apiError);
        }
            filterChain.doFilter(request, response);
    }

    private boolean isAuthEndpoint(HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        return requestURI.startsWith("/auth");
    }
}
