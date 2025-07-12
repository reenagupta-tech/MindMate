package com.example.MindMate.service;

import com.example.MindMate.Repositories.JournalEntryRepo;
import com.example.MindMate.Repositories.UserRepo;
import com.example.MindMate.entities.JournalEntry;
import com.example.MindMate.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {
    @Autowired
    private JournalEntryRepo journalEntryRepo;
    @Autowired
    private UserRepo userRepo;

    public int getCurrentStreak(String email) {
        List<JournalEntry> entries = journalEntryRepo.findByEmail(email);
        Set<LocalDate> dates = entries.stream()
                .map(e -> e.getDate().toLocalDate())
                .collect(Collectors.toSet());
        int streak = 0;
        LocalDate today = LocalDate.now();

        while (dates.contains(today.minusDays(streak))) {
            streak++;
        }
        return streak;
    }


    public String getMostFrequentMood(String email) {
        List<JournalEntry> entries = journalEntryRepo.findByEmail(email);

        if (entries.isEmpty()) {
            return "No entries found";
        }

        Map<String, Long> moodCount = entries.stream()
                .collect(Collectors.groupingBy(
                        entry -> entry.getMood().toString().toLowerCase(),
                        Collectors.counting()
                ));

        return moodCount.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("No dominant mood");
    }

    public Map<String, Object> getDashBoardStats(String email) {
        List<JournalEntry> entries = journalEntryRepo.findByEmail(email);
        Set<LocalDate> days = entries.stream().map(e -> e.getDate().toLocalDate()).collect(Collectors.toSet());

        int currentStreak = getCurrentStreak(email);
        long totalJournals = entries.size();
        String mood = getMostFrequentMood(email);
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        int sessions = user.getChatSessions();

        return Map.of(
                "totalJournals", totalJournals,
                "currentStreak", currentStreak,
                "moodScore" , mood,
                "chatSessions", sessions

        );
    }
    public List<JournalEntry> getRecentEntries(String email) {
        return journalEntryRepo.findTop3ByEmailOrderByDateDesc(email);
    }






}
