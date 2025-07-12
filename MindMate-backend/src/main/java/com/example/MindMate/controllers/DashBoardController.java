package com.example.MindMate.controllers;

import com.example.MindMate.entities.JournalEntry;
import com.example.MindMate.service.DashboardService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/dashboard-stats")
    public ResponseEntity<?> moodStats() {
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Map<String, Object> stats = dashboardService.getDashBoardStats(email);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/recent-entries")
    public ResponseEntity<?> getRecentEntries() {
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        List<JournalEntry> recentEntries = dashboardService.getRecentEntries(email);
        return ResponseEntity.ok(recentEntries);
    }




}
