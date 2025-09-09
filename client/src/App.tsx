import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Exercise from './pages/Exercise';
import Diet from './pages/Diet';
import Chat from './pages/Chat';
import MoodTracker from './pages/MoodTracker';
import Games from './pages/Games';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 20px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 60px 20px 20px 20px;
  }
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navigation />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/games" element={<Games />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
