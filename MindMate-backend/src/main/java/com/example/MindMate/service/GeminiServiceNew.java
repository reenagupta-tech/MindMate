package com.example.MindMate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class GeminiServiceNew {

    @Value("${GEMINI_API_KEY}")
    private String apiKey;

    @Autowired
    private WebClient webClient;

    private static final Logger logger = LoggerFactory.getLogger(GeminiServiceNew.class);



    public String getGeminiAnswer(String userPrompt) {
        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", userPrompt)))
                )
        );

        try {
            return webClient.post()
                    .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .map(response -> {
                        List choices = (List) response.get("candidates");
                        if (choices != null && !choices.isEmpty()) {
                            Map<String, Object> firstChoice = (Map<String, Object>) choices.get(0);
                            Map<String, Object> content = (Map<String, Object>) firstChoice.get("content");
                            List<Map<String, String>> parts = (List<Map<String, String>>) content.get("parts");
                            String text = parts.get(0).get("text");

                            return text;
                        }
                        return "No response from Gemini.";
                    })
                    .block();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling Gemini: " + e.getMessage();
        }
    }

    public String summarize(String combinedText) {
        // ✅ Add instruction to keep summary short and clear
        String summarizationPrompt = """
            You are an emotionally intelligent assistant summarizing a user's journal entries and emotional journey.

            Summarize the following text in 100 words or less. Focus on clarity and emotional tone.
            Avoid making assumptions. Do not add analysis — just condense.

            --- Text to Summarize ---
            %s
            """.formatted(combinedText.trim());

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", summarizationPrompt)))
                )
        );

        try {
            return webClient.post()
                    .uri(uriBuilder -> uriBuilder.queryParam("key", apiKey).build())
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .map(response -> {
                        List candidates = (List) response.get("candidates");
                        if (candidates != null && !candidates.isEmpty()) {
                            Map<String, Object> content = (Map<String, Object>) ((Map) candidates.get(0)).get("content");
                            List<Map<String, String>> parts = (List<Map<String, String>>) content.get("parts");
                            return parts.get(0).get("text");
                        }
                        return "Could not summarize.";
                    })
                    .block();

        } catch (Exception e) {
            System.err.println("Gemini summarization error: " + e.getMessage());
            return "Summary unavailable due to error.";
        }
    }


}
