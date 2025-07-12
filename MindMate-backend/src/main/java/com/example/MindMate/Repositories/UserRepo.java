package com.example.MindMate.Repositories;

import com.example.MindMate.entities.JournalEntry;
import com.example.MindMate.entities.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);
   Optional<User> findByEmail(String email);

    void deleteByUsername(String username);
    Optional<User> findByRefreshToken(String refreshToken);


}
