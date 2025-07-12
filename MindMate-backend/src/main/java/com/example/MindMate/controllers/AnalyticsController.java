package com.example.MindMate.controllers;

import com.example.MindMate.service.AnalyticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticService analyticService;

    @GetMapping("/weekly")
    public ResponseEntity<?> getWeeklyActivity() {
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        try {

            return ResponseEntity.ok(analyticService.getWeeklyActivity(email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No Entries!");
        }
    }

    @GetMapping("/mood-distribution")
    public ResponseEntity<List<Map<String, Object>>> getMoodDistribution() {
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        List<Map<String, Object>> data = analyticService.getMoodDistribution(email);
        return ResponseEntity.ok(data);
    }



}
