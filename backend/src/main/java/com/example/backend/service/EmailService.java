package com.example.backend.service;

import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(User user, String token) {
        String subject = "Email Verification";
        String verificationUrl = "http://localhost:8080/users/verify?token=" + token;
        String message = "Please click the following link to verify your email: " + verificationUrl;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject(subject);
        email.setText(message);
        mailSender.send(email);
    }
}

