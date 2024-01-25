package com.example.backend.service;

import com.example.backend.dto.AuthenticationRequestDto;
import com.example.backend.dto.AuthenticationResponseDto;
import com.example.backend.dto.UserRegistrationDto;
import com.example.backend.entity.User;

public interface AuthService {
    User createUser(UserRegistrationDto userRegistrationDto);
    AuthenticationResponseDto authenticateUser(AuthenticationRequestDto authenticationRequest);
}
