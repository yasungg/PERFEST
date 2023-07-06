package com.example.demo.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
@Controller
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*", allowedHeaders= "*")
@RequestMapping("/logout")
public class LogoutController {
    private final HttpSession session;
    @GetMapping("/bye")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        log.info("로그아웃 컨트롤러 진입");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
            session.invalidate();
            log.info("로그아웃 완료!!");
        }
    }
}
