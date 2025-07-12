# 🧠 MindMate — AI-Powered Mental Wellness Journal

Your intelligent mental health companion for journaling, mood tracking, and personalized support.

---

## 📌 Overview

**MindMate** is a full-stack AI-powered mental wellness platform that helps users understand and manage their emotional well-being. It combines secure digital journaling, mood-based analytics, and a smart AI chatbot (powered by Google Gemini) that adapts to users' mental states.

Designed for privacy, usability, and mental health awareness, MindMate provides real-time insights, streak tracking, and emotionally intelligent conversations, making it a modern self-care assistant.

---

## ✨ Key Features

### 📝 Personal Journal (CRUD)
- Create, edit, view, and delete journal entries.
- Tag entries by **mood**, **keywords**, or **date**.
- All entries are securely stored and accessible to the user only.

### 🤖 AI-Powered Chat Companion
- Integrates with **Google Gemini API** for natural language conversation.
- Reads recent journal entries to offer **context-aware suggestions**.
- Provides supportive prompts, emotional check-ins, and coping advice.

### 📊 Mood & Wellness Analytics
- Interactive dashboard with:
  - **Mood trends**
  - **Journaling frequency**
  - **Emotional pattern recognition**
- Tracks streaks to encourage regular reflection.

---

## 🧱 Tech Stack

| Frontend         | Backend        | Database        | AI Integration         |
|------------------|----------------|------------------|-------------------------|
| React + Vite     | Spring Boot    | MongoDB Atlas    | Google Gemini API       |

---



## 🛠️ Setup & Installation

> Make sure **Node.js**, **Maven**, and **MongoDB Atlas** are set up before proceeding.

### 🔹 Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/MindMate.git
cd MindMate
```

---

### 🔹 Step 2: Setup Environment Variables

#### 🧾 Backend (`/server/src/main/resources/application.properties`)
```properties
spring.data.mongodb.uri=<YOUR_MONGO_URI>
gemini.api.key=<YOUR_GOOGLE_GEMINI_API_KEY>
```

---

### 🔹 Step 3: Run Backend (Spring Boot)
```bash
cd server
./mvnw spring-boot:run
```

---

### 🔹 Step 4: Run Frontend (React + Vite)
```bash
cd client
npm install
npm run dev
```

---

### 🔹 Step 5: Visit the App
Open your browser at:  
📍 `http://localhost:5173` (React frontend)  
📍 Backend runs at `http://localhost:8080` (API)

---



## 📷 Screenshots (Optional)
Include screenshots or short GIFs of:
- Journal interface
- Chatbot interaction
- Mood tracking dashboard


