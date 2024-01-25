package com.example.backend.service;

import com.example.backend.dto.UserRegistrationDto;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImp implements AuthService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserRegistrationDto createUser(UserRegistrationDto userRegistrationDto) {
        User user = new User();
        user.setUserId(userRegistrationDto.getUserId());
        user.setFirstName(userRegistrationDto.getFirstName());
        user.setLastName(userRegistrationDto.getLastName());
        user.setEmail(userRegistrationDto.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(userRegistrationDto.getPassword()));
        User createdUser = userRepository.save(user);

        UserRegistrationDto userDto = new UserRegistrationDto();
        userDto.setUserId(createdUser.getUserId());
        userDto.setFirstName(createdUser.getFirstName());
        userDto.setLastName(createdUser.getLastName());
        userDto.setEmail(createdUser.getEmail());
        userDto.setPassword(new BCryptPasswordEncoder().encode(createdUser.getPassword()));

        return userDto;
    }
}
