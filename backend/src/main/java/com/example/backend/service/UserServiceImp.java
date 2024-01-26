package com.example.backend.service;

import com.example.backend.dto.AuthenticationRequestDto;
import com.example.backend.dto.AuthenticationResponseDto;
import com.example.backend.dto.UserRegistrationDto;
import com.example.backend.entity.PasswordResetToken;
import com.example.backend.entity.User;
import com.example.backend.entity.VerificationToken;
import com.example.backend.exception.CustomAuthenticationException;
import com.example.backend.repository.PasswordResetTokenRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailServiceImpl emailServiceImpl;

    @Override
    public User registerUser(UserRegistrationDto userRegistrationDto) {
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
        user = userRepository.save(user);

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, user);
        verificationTokenRepository.save(verificationToken);

        emailServiceImpl.sendVerificationEmail(user, token);

        return user;
    }

    public void verifyUser(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        if (verificationToken == null || verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new CustomAuthenticationException("Token is invalid or expired", HttpStatus.BAD_REQUEST);
        }

        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);

        verificationTokenRepository.delete(verificationToken);
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

    public void processForgotPassword(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND);
        }

        String token = UUID.randomUUID().toString();
        PasswordResetToken myToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(myToken);
        emailServiceImpl.sendPasswordResetEmail(user, token);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new CustomAuthenticationException("Invalid or expired token", HttpStatus.BAD_REQUEST);
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        passwordResetTokenRepository.delete(resetToken);
    }
}
