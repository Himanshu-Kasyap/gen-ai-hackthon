import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ExerciseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const ExerciseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ExerciseCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ExerciseTitle = styled.h3`
  color: #667eea;
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ExerciseDescription = styled.p`
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
`;

const ExerciseDuration = styled.div`
  color: #333;
  font-weight: 600;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StartButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const TimerModal = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const TimerContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const TimerDisplay = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: #667eea;
  margin: 20px 0;
`;

const TimerTitle = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const TimerControls = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
`;

const TimerButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.pause {
    background: #ffd700;
    color: #333;
  }

  &.stop {
    background: #ff6b6b;
    color: white;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: string;
}

const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    description: 'Start your day with a peaceful mindfulness meditation to center yourself and set positive intentions.',
    duration: 10,
    type: 'meditation'
  },
  {
    id: '2',
    title: 'Breathing Exercise',
    description: 'Deep breathing techniques to reduce stress and anxiety. Perfect for quick relaxation.',
    duration: 5,
    type: 'breathing'
  },
  {
    id: '3',
    title: 'Gentle Yoga Flow',
    description: 'A sequence of gentle yoga poses to improve flexibility and reduce tension.',
    duration: 15,
    type: 'yoga'
  },
  {
    id: '4',
    title: 'Body Scan Meditation',
    description: 'Progressive muscle relaxation to release physical tension and promote deep relaxation.',
    duration: 20,
    type: 'meditation'
  },
  {
    id: '5',
    title: 'Stress Relief Yoga',
    description: 'Targeted yoga poses specifically designed to alleviate stress and calm the mind.',
    duration: 25,
    type: 'yoga'
  },
  {
    id: '6',
    title: 'Evening Wind Down',
    description: 'A peaceful meditation to help you unwind and prepare for restful sleep.',
    duration: 12,
    type: 'meditation'
  }
];

const Exercise: React.FC = () => {
  const [activeTimer, setActiveTimer] = useState<Exercise | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activeTimer && timeLeft > 0 && !isPaused) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            playAlarm();
            setActiveTimer(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTimer, timeLeft, isPaused]);

  const startExercise = (exercise: Exercise) => {
    setActiveTimer(exercise);
    setTimeLeft(exercise.duration * 60); // Convert minutes to seconds
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
  };

  const stopTimer = () => {
    setActiveTimer(null);
    setTimeLeft(0);
    setIsPaused(false);
  };

  const playAlarm = () => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);

    alert('Exercise completed! Great job! 🎉');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ExerciseContainer>
      <Header>
        <Title>Exercise & Meditation 🧘‍♀️</Title>
        <Subtitle>Choose an exercise to begin your wellness journey</Subtitle>
      </Header>

      <ExerciseGrid>
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id}>
            <ExerciseTitle>{exercise.title}</ExerciseTitle>
            <ExerciseDescription>{exercise.description}</ExerciseDescription>
            <ExerciseDuration>
              ⏱️ {exercise.duration} minutes
            </ExerciseDuration>
            <StartButton
              onClick={() => startExercise(exercise)}
              disabled={!!activeTimer}
            >
              {activeTimer ? 'Session in Progress' : 'Start Session'}
            </StartButton>
          </ExerciseCard>
        ))}
      </ExerciseGrid>

      <TimerModal $isVisible={!!activeTimer}>
        <TimerContent>
          <TimerTitle>{activeTimer?.title}</TimerTitle>
          <TimerDisplay>{formatTime(timeLeft)}</TimerDisplay>
          <TimerControls>
            <TimerButton className="pause" onClick={pauseTimer}>
              {isPaused ? 'Resume' : 'Pause'}
            </TimerButton>
            <TimerButton className="stop" onClick={stopTimer}>
              Stop
            </TimerButton>
          </TimerControls>
        </TimerContent>
      </TimerModal>
    </ExerciseContainer>
  );
};

export default Exercise;
