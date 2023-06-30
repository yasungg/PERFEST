package com.example.demo.security;

import com.example.demo.jwt.JwtExceptionFilter;
import com.example.demo.jwt.JwtFilter;
import com.example.demo.jwt.TokenProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final TokenProvider tokenProvider;
    private final ObjectMapper objectMapper;
    @Override
    public void configure(HttpSecurity http) {
        JwtFilter jwtFilter= new JwtFilter(tokenProvider);
        JwtExceptionFilter jwtExceptionFilter = new JwtExceptionFilter(objectMapper);
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(jwtExceptionFilter, JwtFilter.class);
    }


}
