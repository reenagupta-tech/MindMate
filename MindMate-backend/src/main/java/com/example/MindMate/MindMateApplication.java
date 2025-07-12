package com.example.MindMate;



import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(
		basePackages = "com.example.MindMate.Repositories",
		mongoTemplateRef = "mongoTemplate"
)
public class MindMateApplication {

	public static void main(String[] args) {
		SpringApplication.run(MindMateApplication.class, args);
	}




}
