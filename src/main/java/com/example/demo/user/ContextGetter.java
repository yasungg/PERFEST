package com.example.demo.user;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component("ContextGetter")
public class ContextGetter {
    private Authentication authentication;
    private PerfestUserDetails info;
    public ContextGetter() {
        // 생성자에서 SecurityContextHolder.getContext().getAuthentication() 호출하지 않음
    }

    private void initialize() {
        authentication = SecurityContextHolder.getContext().getAuthentication();
        info = (PerfestUserDetails) authentication.getPrincipal();
    }

    public Long getId() {
        if (authentication == null) {
            initialize();
        }
        return info.getId();
    }

    public String getUsername() {
        if (authentication == null) {
            initialize();
        }
        return info.getUsername();
    }

    public String getNickname() {
        if (authentication == null) {
            initialize();
        }
        return info.getNickname();
    }
}
