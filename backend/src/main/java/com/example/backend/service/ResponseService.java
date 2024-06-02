package com.example.backend.service;

import com.example.backend.dto.ResponseDto;
import com.example.backend.entity.Response;

import java.util.List;

public interface ResponseService {

    Response createResponse(ResponseDto responseDto);

    ResponseDto getUserResponse(String userId);
    
    List<ResponseDto> getAllResponses();
}
