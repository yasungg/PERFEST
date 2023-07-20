package com.example.demo.service;

import com.example.demo.constant.Authority;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminService {
    public boolean isAdmin() {
        Authentication context = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = context.getAuthorities();
        String auth = authorities.toString();

        return auth.equals(Authority.ROLE_ADMIN.name());
    }
}
