package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponseDto {
    private String jwt;
    private String message;
    public AuthenticationResponseDto(String message) {
        this.message = message;
    }
}
