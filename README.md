# WellnessHub - Mental Wellness Dashboard

A comprehensive wellness dashboard built with the MERN stack, designed to help users track and improve their mental well-being through various interactive features.

## 🌟 Features

### 📊 Dashboard
- Personal wellness overview
- Sleep score tracking
- Exercise completion monitoring
- Daily mindfulness minutes
- Mood rating display
- Personalized daily schedule

### 🧘‍♀️ Exercise & Meditation
- Multiple meditation and yoga sessions
- Built-in timer with audio alerts
- Various duration options (5-25 minutes)
- Progress tracking
- Guided breathing exercises

### 🥗 Nutrition for Mental Health
- Curated foods for mental wellness
- Detailed nutritional information
- Mental health benefits explanation
- Categorized by brain food, mood boosting, calming, and gut health

### 💬 AI Wellness Chat
- 24/7 AI companion for stress relief
- Contextual responses for common issues
- Quick suggestion buttons
- Personalized coping strategies
- Mindfulness and breathing guidance

### 😊 Mood & Activity Tracker
- Daily mood logging with notes
- Mood history visualization
- Activity completion tracking
- Progress monitoring
- Wellness goal setting

### 🎮 Mind Games
- Memory challenge games
- Mental math exercises
- Mindful word reflection
- Breathing synchronization games
- Cognitive function improvement

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Styled Components** for styling
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password encryption
- **Helmet** for security
- **Rate limiting** for API protection

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wellness-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm run install-deps
   ```

3. **Environment Setup**
   - Copy `server/.env.example` to `server/.env`
   - Update MongoDB connection string and JWT secret

4. **Start the application**
   ```bash
   # Development mode (both client and server)
   npm run dev
   
   # Or run separately
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
wellness-dashboard/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   └── hooks/         # Custom React hooks
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Database and app configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── package.json
└── package.json         # Root package.json
```

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic MERN stack setup
- ✅ Core page implementations
- ✅ Responsive design
- ✅ Timer functionality
- ✅ Interactive games

### Phase 2 (Upcoming)
- [ ] User authentication system
- [ ] MongoDB integration
- [ ] Data persistence
- [ ] Real-time chat enhancements
- [ ] Advanced analytics

### Phase 3 (Future)
- [ ] Mobile app development
- [ ] Integration with wearable devices
- [ ] AI-powered recommendations
- [ ] Community features
- [ ] Professional therapist connections

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🧠 Mental Health Resources

If you're experiencing a mental health crisis, please reach out:
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

## 💪 Acknowledgments

- Mental health professionals for guidance on wellness features
- Open-source community for incredible tools and libraries
- Users who provide feedback to improve mental health support

---

Built with ❤️ for mental wellness and well-being.
