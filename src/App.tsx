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
  min-height: 100vh;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 110px;
    padding: 20px;
    min-height: calc(100vh - 110px);
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
