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

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final TokenProvider tokenProvider;
    private final HttpSession session;
    @Override
    public void configure(HttpSecurity http) {
        JwtFilter jwtFilter= new JwtFilter(tokenProvider, session);

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }


}
