package com.example.MindMate.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.example.MindMate.Repositories.JournalEntryRepo;
import com.example.MindMate.entities.JournalEntry;
import com.example.MindMate.entities.User;
import com.example.MindMate.service.GeminiServiceNew;
import com.example.MindMate.service.JournalEntryService;
import com.example.MindMate.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/journal")

public class JournalEntryController {
    // private Map<Long, JournalEntry> journalEntries = new HashMap<>();
    @Autowired
    private JournalEntryService journalEntryService;
    @Autowired
    private UserService userService;
    @Autowired
    private JournalEntryRepo journalEntryRepo;



    @GetMapping
    public ResponseEntity<?> getAllJournalEntriesOfUser() {
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        // Optional: check if user exists (for validation/logging)
        User user = userService.findByEmail(email);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        // ✅ Fetch journals directly from the repository using userName
        List<JournalEntry> entries = journalEntryRepo.findByEmail(email);

        if (entries == null || entries.isEmpty()) {
            return new ResponseEntity<>("No journal entries found", HttpStatus.OK);
        }

        return new ResponseEntity<>(entries, HttpStatus.OK);
    }



    @PostMapping
    public ResponseEntity<JournalEntry> createEntry(@RequestBody JournalEntry myEntry){
        try{
            UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            JournalEntry savedEntry = journalEntryService.saveJournalAndUpdateContext(myEntry ,email);
            return new ResponseEntity<JournalEntry>(savedEntry, HttpStatus.CREATED);
        }
        catch(IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        catch(Exception e){
            e.printStackTrace(); // Log the exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("id/{myId}")
    public ResponseEntity<JournalEntry> getEntryById(@PathVariable String myId) {
        // Get authenticated user
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        // Find the journal entry by ID
        Optional<JournalEntry> entryOpt = journalEntryService.findById(myId);

        if (entryOpt.isPresent()) {
            JournalEntry entry = entryOpt.get();

            // Check ownership
            if (entry.getEmail().equals(email)) {
                return new ResponseEntity<>(entry, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("delete/{myId}")
    public ResponseEntity<?> deleteById(@PathVariable String myId ){
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        boolean removed = journalEntryService.deleteById(myId , email);
        if(removed){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("update/{myId}")
    public ResponseEntity<?> updateById(@PathVariable String myId , @RequestBody JournalEntry newEntry){
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        JournalEntry updated = journalEntryService.updateById(myId,email,newEntry);
        return new ResponseEntity<JournalEntry>(updated, HttpStatus.OK);
    }



}

