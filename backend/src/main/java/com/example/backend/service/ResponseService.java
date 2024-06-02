package com.example.backend.service;

import com.example.backend.dto.ResponseDto;
import com.example.backend.entity.Response;

import java.util.Map;

public interface ResponseService {

    Response createResponse(ResponseDto responseDto);

    ResponseDto getUserResponse(String userId);
    
    Map<Long,ResponseDto> getAllResponses();
}
