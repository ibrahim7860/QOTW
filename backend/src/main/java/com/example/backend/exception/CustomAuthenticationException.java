package com.example.backend.exception;

import org.springframework.http.HttpStatus;

public class CustomAuthenticationException extends RuntimeException {

    private final HttpStatus status;

    public CustomAuthenticationException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}

