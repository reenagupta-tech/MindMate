# 🧠 MindMate — Your Personal Mental Health Journal & AI Companion

[![GitHub stars](https://img.shields.io/github/stars/reenagupta-tech/MindMate?style=social)](https://github.com/reenagupta-tech/MindMate/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/reenagupta-tech/MindMate?style=social)](https://github.com/reenagupta-tech/MindMate/network/members)
[![GitHub issues](https://img.shields.io/github/issues/reenagupta-tech/MindMate)](https://github.com/reenagupta-tech/MindMate/issues)
[![GitHub license](https://img.shields.io/github/license/reenagupta-tech/MindMate)](https://github.com/reenagupta-tech/MindMate/blob/main/LICENSE)

MindMate is a full-stack mental wellness application designed to help users track their emotional health through journaling, gain insights from their mood patterns, and interact with a context-aware AI companion.

**🌐 Live Demo:** [https://mindmate-journal.netlify.app/](https://mindmate-journal.netlify.app/)

**📖 Repository:** [https://github.com/reenagupta-tech/MindMate](https://github.com/reenagupta-tech/MindMate)

---

## ✨ Features

### 📝 Journal Management (CRUD)
- Create, view, update, and delete personal journal entries
- Filter entries by mood, date, or keywords
- Private and secure storage of mental health data
- Mood tracking with visual indicators

### 🤖 Context-Aware AI Chatbot
- Integrated Google Gemini API
- Provides intelligent, personalized conversations based on recent journal history
- Offers mental health advice and conversation prompts tailored to user mood
- Real-time chat interface with message history

### 📊 Analytics Dashboard
- Visualize mood trends over time
- Track journaling streaks and frequency
- Gain insight into emotional patterns with real-time charts
- Weekly mood distribution analysis

### 🔐 User Authentication
- Secure JWT-based authentication
- User registration and login
- Protected routes and session management
- Token refresh mechanism

---

## 🏗️ Project Structure

```
MindMate/
├── 📁 MindMate-frontend/          # React + TypeScript Frontend
│   ├── 📁 src/
│   │   ├── 📁 Api/                # API configuration and services
│   │   ├── 📁 components/         # Reusable UI components
│   │   │   ├── 📁 auth/           # Authentication components
│   │   │   ├── 📁 chat/           # Chat interface components
│   │   │   ├── 📁 journal/        # Journal management components
│   │   │   └── 📁 shared/         # Common UI components
│   │   ├── 📁 contexts/           # React Context providers
│   │   ├── 📁 pages/              # Main application pages
│   │   └── 📄 main.jsx            # Application entry point
│   ├── 📄 package.json            # Frontend dependencies
│   ├── 📄 vite.config.ts          # Vite configuration
│   └── 📄 tailwind.config.js      # Tailwind CSS configuration
│
├── 📁 MindMate-backend/           # Spring Boot Backend
│   ├── 📁 src/main/java/
│   │   └── 📁 com/example/MindMate/
│   │       ├── 📁 config/         # Security and configuration
│   │       │   └── 📁 security/   # JWT and Spring Security
│   │       ├── 📁 controllers/    # REST API endpoints
│   │       ├── 📁 DTO/            # Data Transfer Objects
│   │       ├── 📁 entities/       # Database entities
│   │       ├── 📁 Repositories/   # Data access layer
│   │       └── 📁 service/        # Business logic layer
│   ├── 📁 src/main/resources/
│   │   └── 📄 application.properties  # Backend configuration
│   ├── 📄 pom.xml                 # Maven dependencies
│   └── 📄 Dockerfile              # Container configuration
│
└── 📄 README.md                   # Project documentation
```

---

## 🛠️ Tech Stack

| Frontend     | Backend        | Database      | AI Integration     |
|--------------|----------------|----------------|---------------------|
| React + Vite | Spring Boot    | MongoDB Atlas | Google Gemini API   |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Java 17 or higher
- Maven
- MongoDB Atlas account
- Google Gemini API key

### Frontend Setup
```bash
cd MindMate-frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd MindMate-backend
mvn clean install
mvn spring-boot:run
```

### Environment Variables
Create `.env` files in both frontend and backend directories with your configuration.

---

## 📱 Screenshots

*Add screenshots of your application here*

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/MindMate.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make your changes and commit**
   ```bash
   git add .
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Spring Boot community for backend framework
- React community for frontend framework
- All contributors and supporters

---

## 📞 Contact & Support

- **GitHub Issues:** [Report a bug or request a feature](https://github.com/reenagupta-tech/MindMate/issues)
- **Repository:** [https://github.com/reenagupta-tech/MindMate](https://github.com/reenagupta-tech/MindMate)
- **Live Demo:** [https://mindmate-journal.netlify.app/](https://mindmate-journal.netlify.app/)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/reenagupta-tech">reenagupta-tech</a></p>
  <p>If you find this project helpful, please give it a ⭐️!</p>
</div>





