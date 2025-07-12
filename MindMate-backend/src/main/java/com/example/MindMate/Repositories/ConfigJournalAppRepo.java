package com.example.MindMate.Repositories;

import com.example.MindMate.entities.ConfigEntity;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConfigJournalAppRepo extends MongoRepository<ConfigEntity, ObjectId> {
}
