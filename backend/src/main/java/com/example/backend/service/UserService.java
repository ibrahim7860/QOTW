package com.example.backend.service;

import com.example.backend.dto.UserRegistrationDto;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(UserRegistrationDto userDto) {
        if (userRepository.existsByUserId(userDto.getUserId())) {
            throw new IllegalStateException("Username already in use");
        }
        if (userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalStateException("Email already in use");
        }

        User user = new User();
        user.setUserId(userDto.getUserId());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        return userRepository.save(user);
    }
}
