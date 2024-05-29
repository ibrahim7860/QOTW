package com.example.backend.service;

import com.example.backend.entity.Profile;

public interface ProfileService {
    Profile saveProfile(String userId, String imageUrl);

    Profile getProfile(String userId);
}
