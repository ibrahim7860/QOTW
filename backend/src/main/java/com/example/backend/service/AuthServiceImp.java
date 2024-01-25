package com.example.backend.service;

import com.example.backend.dto.AuthenticationRequestDto;
import com.example.backend.dto.AuthenticationResponseDto;
import com.example.backend.dto.UserRegistrationDto;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomAuthenticationException;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImp implements AuthService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User createUser(UserRegistrationDto userRegistrationDto) {
        if (userRepository.existsByUserId(userRegistrationDto.getUserId())) {
            throw new CustomAuthenticationException("Username already in use", HttpStatus.CONFLICT);
        }
        if (userRepository.existsByEmail(userRegistrationDto.getEmail())) {
            throw new CustomAuthenticationException("Email already in use", HttpStatus.CONFLICT);
        }

        User user = new User();
        user.setUserId(userRegistrationDto.getUserId());
        user.setFirstName(userRegistrationDto.getFirstName());
        user.setLastName(userRegistrationDto.getLastName());
        user.setEmail(userRegistrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(userRegistrationDto.getPassword()));
        return userRepository.save(user);
    }

    public AuthenticationResponseDto authenticateUser(AuthenticationRequestDto authenticationRequest) {
        User user = userRepository.findFirstByUserId(authenticationRequest.getUserId());
        if (user == null) {
            throw new CustomAuthenticationException("Username not found.", HttpStatus.NOT_FOUND);
        }
        if (passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())) {
            return new AuthenticationResponseDto("Login successful.");
        } else {
            throw new CustomAuthenticationException("Incorrect password.", HttpStatus.UNAUTHORIZED);
        }
    }
}
