package com.example.backend.service;

import com.example.backend.dto.UserRegistrationDto;

public interface AuthService {
    UserRegistrationDto createUser(UserRegistrationDto userRegistrationDto);
}
