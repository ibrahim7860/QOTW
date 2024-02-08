package com.example.backend.service;

import com.example.backend.entity.Profile;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomAuthenticationException;
import com.example.backend.repository.ProfileRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    private final String FOLDER_PATH = System.getProperty("user.home");

    public byte[] downloadImage(String userId) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));

        Optional<Profile> imageData = profileRepository.findByUser(user);
        if (imageData.isEmpty()) {
            throw new CustomAuthenticationException("Profile not found", HttpStatus.NOT_FOUND);
        }

        String filePath = imageData.get().getProfilePicture();
        return Files.readAllBytes(new File(filePath).toPath());
    }

    public void uploadImage(String userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));

        String filePath = FOLDER_PATH + "/" + file.getOriginalFilename();

        Profile profile = new Profile();
        profile.setUser(user);
        profile.setName(file.getOriginalFilename());
        profile.setProfilePicture(filePath);
        profileRepository.save(profile);

        file.transferTo(new File(filePath));
    }

    public void updateProfilePicture(String userId, MultipartFile file) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new CustomAuthenticationException("User not found", HttpStatus.NOT_FOUND));

        String newFilePath = FOLDER_PATH + "/" + file.getOriginalFilename();

        File oldFile = new File(profile.getProfilePicture());
        if (oldFile.exists()) {
            boolean deleted = oldFile.delete();
            if (!deleted) {
                throw new IOException("Failed to delete old profile picture.");
            }
        }

        profile.setProfilePicture(newFilePath);
        profileRepository.save(profile);

        file.transferTo(new File(newFilePath));
    }
}
