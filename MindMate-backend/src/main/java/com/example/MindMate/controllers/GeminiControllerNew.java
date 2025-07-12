package com.example.MindMate.controllers;

import com.example.MindMate.Repositories.JournalEntryRepo;
import com.example.MindMate.Repositories.UserRepo;
import com.example.MindMate.entities.User;
import com.example.MindMate.service.GeminiServiceNew;
import com.example.MindMate.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/gemini")
public class GeminiControllerNew {
    @Autowired
    private GeminiServiceNew geminiService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepo userRepo;

   /* public GeminiController(GeminiService geminiService, UserService userService) {
        this.geminiService = geminiService;
        this.userService = userService;
    }*/


    @PostMapping("/ask")
    public ResponseEntity<String> askGemini(@RequestBody Map<String, String> body) {
        String question = body.get("question");
        if (question == null || question.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Question cannot be empty.");
        }

        String response = geminiService.getGeminiAnswer(question);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/chat")
    public ResponseEntity<?> getGeminiReply(@RequestBody Map<String, String> request) {
        String prompt = request.get("prompt");
        if (prompt == null || prompt.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Prompt cannot be empty.");
        }

        // 🔐 Get authenticated user
        UsernamePasswordAuthenticationToken authentication =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();

        User user = userRepo.findByEmail(userName)
                .orElseThrow(() -> new RuntimeException("User not found"));
        //Increasing chat sessions
        int sessions = user.getChatSessions() + 1;
        user.setChatSessions(sessions);

        String context = user.getContext();
        String fullPrompt;

        // ✅ Inject concise-response instruction
        if (context != null && !context.isBlank()) {
            fullPrompt = """
                You are a supportive, psychologically safe AI assistant trained in mental health conversations.

                Below is some emotional background information about the user. Use it **only for additional understanding**, but prioritize the user’s **current message** when responding.

                --- User Context ---
                %s

                --- Current Query ---
                %s

                Please keep your response helpful, neutral, and emotionally safe.
                Keep it concise and no longer than 100 words.
                Do not make assumptions not grounded in the current message.
                """.formatted(context.trim(), prompt.trim());
        } else {
            fullPrompt = """
                You are a supportive, psychologically safe AI assistant trained in mental health conversations.

                Below is a user message. Focus entirely on responding empathetically, clearly, and safely.

                --- Current Query ---
                %s

                Please do not guess or assume emotional states beyond what’s in the message.
                Keep your reply short and within 100 words.
                """.formatted(prompt.trim());
        }

        String reply;

        try {
            reply = geminiService.getGeminiAnswer(fullPrompt);

            if (reply == null || reply.isBlank()) {
                reply = "Sorry, I couldn’t generate a response right now. Please try again later.";
            }

        } catch (Exception e) {
            System.err.println("Gemini error: " + e.getMessage());
            reply = "Sorry, we couldn’t provide a response at the moment. Please try again later.";
        }

        // 🔁 Step 2: Summarize and save updated user context
        String combinedContext = (context == null || context.isBlank())
                ? prompt.trim()
                : context.trim() + "\n\n" + prompt.trim();

        try {
            String newSummary = geminiService.summarize(combinedContext);
            if (newSummary != null && !newSummary.isBlank()) {
                user.setContext(newSummary);
                userRepo.save(user);
            }
        } catch (Exception e) {
            System.err.println("Context summarization error: " + e.getMessage());
        }

        return ResponseEntity.ok(Map.of("response", reply));
    }




}

