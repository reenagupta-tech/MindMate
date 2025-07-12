package com.example.MindMate.Repositories;

import com.example.MindMate.entities.JournalEntry;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface JournalEntryRepo extends MongoRepository<JournalEntry, String> {
    List<JournalEntry> findByEmail(String email);
    List<JournalEntry> findByEmailAndDateBetween(String email, LocalDateTime start, LocalDateTime end);
    //Optional<JournalEntry> findById(String Id);
    List<JournalEntry> findTop3ByEmailOrderByDateDesc(String email);
    @Query("{ 'email': ?0, 'date': { $gte: ?1 } }")
    List<JournalEntry> findEntriesFromPastWeek(String email, LocalDateTime startDate);

    @Query("SELECT j.mood, COUNT(j) FROM JournalEntry j WHERE j.email = :email GROUP BY j.mood")
    List<Object[]> countMoodByEmail(@Param("email") String email);

}
