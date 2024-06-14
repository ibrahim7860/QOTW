package com.example.backend.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class QueryParamAuthenticationFilter extends OncePerRequestFilter {

    private final JwtRequestFilter jwtRequestFilter;

    public QueryParamAuthenticationFilter(JwtRequestFilter jwtRequestFilter) {
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NotNull HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();
        if (path.startsWith("/users/verify")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = request.getParameter("token");
        if (token != null) {
            HttpServletRequest wrapper = new HttpServletRequestWrapper(request) {
                @Override
                public String getHeader(String name) {
                    if ("Authorization".equals(name)) {
                        return "Bearer " + token;
                    }
                    return super.getHeader(name);
                }
            };
            jwtRequestFilter.doFilterInternal(wrapper, response, filterChain);
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
