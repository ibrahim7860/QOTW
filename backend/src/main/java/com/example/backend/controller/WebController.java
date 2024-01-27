package com.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class WebController {

    @GetMapping("/reset-password-form")
    public ModelAndView resetPassword(@RequestParam("token") String token) {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("token", token);
        modelAndView.setViewName("reset-password");
        return modelAndView;
    }
}
