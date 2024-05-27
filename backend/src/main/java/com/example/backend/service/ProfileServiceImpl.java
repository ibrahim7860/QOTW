package com.example.backend.service;

import com.example.backend.entity.Profile;
import com.example.backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Profile saveProfile(String userId, String imageUrl) {
        Profile existingProfile = profileRepository.findByUserId(userId).orElse(null);

        if (existingProfile != null) {
            existingProfile.setProfilePicture(imageUrl);
            return profileRepository.save(existingProfile);
        } else {
            Profile profile = new Profile(userId, imageUrl);
            return profileRepository.save(profile);
        }
    }

    @Override
    public Profile getProfile(String userId) {
        return profileRepository.findByUserId(userId).orElse(null);
    }
}
