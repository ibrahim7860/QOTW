package com.example.backend.config;

import com.example.backend.repository.BlacklistedTokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
public class TokenBlacklistFilter extends OncePerRequestFilter {

    @Autowired
    private BlacklistedTokenRepository blacklistedTokenRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (blacklistedTokenRepository.existsByTokenAndNotExpired(token, LocalDateTime.now())) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Token has been invalidated");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}

