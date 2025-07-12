package com.example.MindMate.service;

import com.example.MindMate.Repositories.JournalEntryRepo;
import com.example.MindMate.entities.JournalEntry;
import com.example.MindMate.entities.Mood;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticService {

    @Autowired
    private JournalEntryRepo journalEntryRepo;

    public List<Map<String, Object>> getWeeklyActivity(String email) {

        LocalDateTime weekAgo = LocalDateTime.now().minusDays(6);


        List<JournalEntry> entries = journalEntryRepo.findEntriesFromPastWeek(email, weekAgo);

        Map<String, List<JournalEntry>> groupedByDay = entries.stream()
                .collect(Collectors.groupingBy(entry -> entry.getDate().getDayOfWeek().toString())); // e.g., MONDAY

        List<String> orderedDays = Arrays.asList("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY");

        List<Map<String, Object>> result = new ArrayList<>();

        for (String day : orderedDays) {
            List<JournalEntry> dayEntries = groupedByDay.getOrDefault(day, new ArrayList<>());
            int count = dayEntries.size();
            Map<String, Object> data = new HashMap<>();
            data.put("day", capitalize(day.toLowerCase()));
            data.put("entries", count);
            result.add(data);
        }

        return result;
    }

    private String capitalize(String input) {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }

    public List<Map<String, Object>> getMoodDistribution(String email) {
        List<JournalEntry> entries = journalEntryRepo.findByEmail(email);

        Map<String, Long> moodCountMap = entries.stream()
                .filter(entry -> entry.getMood() != null) // Guard nulls
                .collect(Collectors.groupingBy(
                        entry -> entry.getMood().toString().toLowerCase(),
                        Collectors.counting()
                ));

        long total = moodCountMap.values().stream().mapToLong(Long::longValue).sum();

        List<Map<String, Object>> result = new ArrayList<>();

        for (Map.Entry<String, Long> entry : moodCountMap.entrySet()) {
            Map<String, Object> moodData = new HashMap<>();
            moodData.put("mood", entry.getKey());
            moodData.put("percentage", (int) Math.round((entry.getValue() * 100.0) / total));
            result.add(moodData);
        }

        return result;
    }





}
