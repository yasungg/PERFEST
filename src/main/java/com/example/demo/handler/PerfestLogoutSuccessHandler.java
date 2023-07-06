package com.example.demo.handler;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class PerfestLogoutSuccessHandler implements LogoutSuccessHandler {
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth) throws IOException, ServletException {
        if(auth != null && auth.getDetails() != null) {
            try {
                request.getSession().invalidate();
                SecurityContextHolder.clearContext();
            } catch(Exception e) {
                e.printStackTrace();
            }
        }
        response.setStatus(response.getStatus());
        response.sendRedirect("http://127.0.0.1:3000/");
    }
}
