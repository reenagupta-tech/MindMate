package com.example.MindMate.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheck {


        @GetMapping("/health-check")
        public String health() {
            return ("ok");
        }


}
