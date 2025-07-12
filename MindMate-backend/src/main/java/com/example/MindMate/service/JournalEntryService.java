package com.example.MindMate.service;

import com.example.MindMate.Repositories.JournalEntryRepo;
import com.example.MindMate.Repositories.UserRepo;
import com.example.MindMate.entities.JournalEntry;
import com.example.MindMate.entities.User;
import org.bson.types.ObjectId;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ch.qos.logback.classic.Logger;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.management.RuntimeErrorException;

@Component
@Service
public class JournalEntryService {
    @Autowired
    private JournalEntryRepo journalEntryRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private GeminiServiceNew geminiService;


    @Autowired
    private UserService userService;

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(JournalEntryService.class);

    public JournalEntry saveJournalAndUpdateContext(JournalEntry journalEntry, String email) {
        // 1. Save journal entry
        JournalEntry entry = new JournalEntry();
        entry.setTitle(journalEntry.getTitle());
        entry.setContent(journalEntry.getContent());
        entry.setMood(journalEntry.getMood());
        entry.setEmail(email);
        entry.setDate(LocalDateTime.now());
        String content = journalEntry.getContent();

        journalEntryRepo.save(entry);

        // 2. Fetch user
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. Combine old context + new journal
        String oldContext = user.getContext();
        String combined = (oldContext == null)
                ? content
                : oldContext + "\n\n" + content;

        // 4. Summarize using Gemini
        String newSummary = geminiService.summarize(combined);

        // 5. Update user context
        if (newSummary != null && !newSummary.isBlank()) {
            user.setContext(newSummary);
            userRepo.save(user);
        }

        return entry;
    }



    public List<JournalEntry> getAll(){
        return journalEntryRepo.findAll();
    }

    public Optional<JournalEntry> findById(String id){
        return journalEntryRepo.findById(id);
    }


    @Transactional
    public boolean deleteById(String id, String email) {
        try {
            JournalEntry entry = journalEntryRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Journal entry not found"));

            if (!entry.getEmail().equals(email)) {
                throw new RuntimeException("Unauthorized: You cannot delete this entry.");
            }

            journalEntryRepo.deleteById(id);
            return true;

        } catch (Exception e) {
            System.out.println("❌ Error while deleting journal: " + e.getMessage());
            throw new RuntimeException("An error occurred while deleting.");
        }
    }

    @Transactional
    public JournalEntry updateById(String id, String email, JournalEntry newEntry){
        try{
            JournalEntry entry = journalEntryRepo.findById(id)
                    .orElseThrow(()-> new RuntimeException("Journal Entry not found"));

            if (!entry.getEmail().equals(email)) {
                throw new RuntimeException("Unauthorized: You cannot delete this entry.");
            }
            entry.setTitle(newEntry.getTitle());
            entry.setDate(newEntry.getDate());
            entry.setContent(newEntry.getContent());
            entry.setMood(newEntry.getMood());
            journalEntryRepo.save(entry);
            return  entry;
        }catch (NoSuchElementException e) {
            throw new RuntimeException("Journal entry not found.");
        } catch (Exception e) {
            System.out.println("❌ Error while updating journal: " + e.getMessage());
            throw new RuntimeException("An error occurred while updating.");
        }

    }




}
