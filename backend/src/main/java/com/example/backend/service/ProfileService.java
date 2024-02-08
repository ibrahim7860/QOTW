package com.example.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProfileService {
    byte[] downloadImage(String fileName) throws IOException;
    void uploadImage(String userId, MultipartFile file) throws IOException;
    void updateProfilePicture(String userId, MultipartFile file) throws IOException;
}
