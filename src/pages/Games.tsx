import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GamesContainer = styled.div`
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

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
`;

const GameCard = styled.div`
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

const GameTitle = styled.h2`
  color: #667eea;
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const GameDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const GameArea = styled.div`
  min-height: 200px;
  border: 2px solid rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 5px;

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

const SecondaryButton = styled(Button)`
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border: 2px solid #667eea;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
  }
`;

const Score = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 15px;
`;



const SequenceDisplay = styled.div`
  display: flex;
  gap: 10px;
  margin: 15px 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const SequenceButton = styled.button<{ $color: string; $isActive?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid ${props => props.$color};
  background: ${props => props.$isActive ? props.$color : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const WordDisplay = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 20px 0;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MathProblem = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 5px;
  font-size: 1.2rem;
  text-align: center;
  margin: 10px;
  width: 100px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const BreathingCircle = styled.div<{ $isExpanded: boolean }>`
  width: ${props => props.$isExpanded ? '150px' : '100px'};
  height: ${props => props.$isExpanded ? '150px' : '100px'};
  border-radius: 50%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  transition: all 4s ease-in-out;
  margin: 20px 0;
`;

const BreathingText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #667eea;
  margin-top: 20px;
`;

const Games: React.FC = () => {
  // Memory Game State
  const [memorySequence, setMemorySequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [showSequence, setShowSequence] = useState(false);
  const [memoryScore, setMemoryScore] = useState(0);
  const [memoryGameActive, setMemoryGameActive] = useState(false);

  // Word Association State
  const [currentWord, setCurrentWord] = useState('');
  const [wordScore, setWordScore] = useState(0);
  const [usedWords, setUsedWords] = useState<string[]>([]);

  // Math Game State
  const [mathProblem, setMathProblem] = useState({ a: 0, b: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [mathScore, setMathScore] = useState(0);

  // Breathing Exercise State
  const [breathingActive, setBreatheActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingExpanded, setBreathingExpanded] = useState(false);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
  const stressReliefWords = [
    'calm', 'peace', 'serene', 'tranquil', 'gentle', 'soothing', 'harmony', 'balance',
    'mindful', 'present', 'grateful', 'centered', 'focused', 'clarity', 'wisdom', 'joy'
  ];

  // Memory Game Functions
  const startMemoryGame = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...memorySequence, newColor];
    setMemorySequence(newSequence);
    setUserSequence([]);
    setShowSequence(true);
    setMemoryGameActive(true);

    // Hide sequence after showing it
    setTimeout(() => {
      setShowSequence(false);
    }, newSequence.length * 600 + 500);
  };

  const handleColorClick = (color: string) => {
    if (showSequence || !memoryGameActive) return;

    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    // Check if sequence is correct
    if (newUserSequence.length === memorySequence.length) {
      if (JSON.stringify(newUserSequence) === JSON.stringify(memorySequence)) {
        setMemoryScore(memoryScore + 1);
        setTimeout(startMemoryGame, 1000);
      } else {
        setMemoryGameActive(false);
        alert(`Game Over! Final Score: ${memoryScore}`);
      }
    }
  };

  const resetMemoryGame = () => {
    setMemorySequence([]);
    setUserSequence([]);
    setMemoryScore(0);
    setMemoryGameActive(false);
    setShowSequence(false);
  };

  // Word Association Functions
  const startWordGame = () => {
    const randomWord = stressReliefWords[Math.floor(Math.random() * stressReliefWords.length)];
    setCurrentWord(randomWord);
    setUsedWords([randomWord]);
    setWordScore(0);
  };

  const nextWord = () => {
    const availableWords = stressReliefWords.filter(word => !usedWords.includes(word));
    if (availableWords.length === 0) {
      alert('Amazing! You\'ve gone through all the calming words! 🌟');
      return;
    }
    const nextWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(nextWord);
    setUsedWords([...usedWords, nextWord]);
    setWordScore(wordScore + 1);
  };

  // Math Game Functions
  const generateMathProblem = () => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    setMathProblem({ a, b, answer: a + b });
    setUserAnswer('');
  };

  const checkMathAnswer = () => {
    if (parseInt(userAnswer) === mathProblem.answer) {
      setMathScore(mathScore + 1);
      generateMathProblem();
    } else {
      alert(`Incorrect! The answer was ${mathProblem.answer}. Your score: ${mathScore}`);
      setMathScore(0);
      generateMathProblem();
    }
  };

  // Breathing Exercise Functions
  const startBreathingExercise = () => {
    setBreatheActive(true);
    const breathingCycle = () => {
      // Inhale phase
      setBreathingPhase('inhale');
      setBreathingExpanded(true);
      
      setTimeout(() => {
        // Hold phase
        setBreathingPhase('hold');
        
        setTimeout(() => {
          // Exhale phase
          setBreathingPhase('exhale');
          setBreathingExpanded(false);
          
          setTimeout(() => {
            if (breathingActive) {
              breathingCycle();
            }
          }, 4000);
        }, 2000);
      }, 4000);
    };
    breathingCycle();
  };

  const stopBreathingExercise = () => {
    setBreatheActive(false);
    setBreathingExpanded(false);
    setBreathingPhase('inhale');
  };

  useEffect(() => {
    generateMathProblem();
  }, []);

  return (
    <GamesContainer>
      <Header>
        <Title>Mind Games 🎮</Title>
        <Subtitle>Fun games to boost cognitive function and reduce stress</Subtitle>
      </Header>

      <GamesGrid>
        {/* Memory Sequence Game */}
        <GameCard>
          <GameTitle>🧠 Memory Challenge</GameTitle>
          <GameDescription>
            Watch the color sequence and repeat it back. Great for improving focus and memory!
          </GameDescription>
          <GameArea>
            <Score>Score: {memoryScore}</Score>
            <SequenceDisplay>
              {colors.map((color, index) => (
                <SequenceButton
                  key={index}
                  $color={color}
                  $isActive={showSequence && memorySequence[userSequence.length] === color}
                  onClick={() => handleColorClick(color)}
                />
              ))}
            </SequenceDisplay>
            {memoryGameActive && !showSequence && (
              <div style={{ color: '#667eea', fontWeight: '600' }}>
                Your turn! Repeat the sequence
              </div>
            )}
          </GameArea>
          <Button onClick={startMemoryGame} disabled={memoryGameActive && showSequence}>
            {memoryGameActive ? 'Game In Progress' : 'Start Game'}
          </Button>
          <SecondaryButton onClick={resetMemoryGame}>Reset</SecondaryButton>
        </GameCard>

        {/* Word Association Game */}
        <GameCard>
          <GameTitle>✨ Mindful Words</GameTitle>
          <GameDescription>
            Focus on calming words and practice mindfulness. Let each word bring you peace.
          </GameDescription>
          <GameArea>
            <Score>Words explored: {wordScore}</Score>
            <WordDisplay>{currentWord}</WordDisplay>
            <div style={{ color: '#666', textAlign: 'center', fontSize: '0.9rem' }}>
              Take a moment to reflect on this word and what it means to you
            </div>
          </GameArea>
          <Button onClick={startWordGame}>Start Journey</Button>
          <SecondaryButton onClick={nextWord} disabled={!currentWord}>
            Next Word
          </SecondaryButton>
        </GameCard>

        {/* Quick Math Game */}
        <GameCard>
          <GameTitle>🧮 Mental Math</GameTitle>
          <GameDescription>
            Quick math exercises to keep your mind sharp and focused. Great for mental agility!
          </GameDescription>
          <GameArea>
            <Score>Correct answers: {mathScore}</Score>
            <MathProblem>
              {mathProblem.a} + {mathProblem.b} = ?
            </MathProblem>
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Answer"
            />
          </GameArea>
          <Button onClick={checkMathAnswer} disabled={!userAnswer}>
            Check Answer
          </Button>
          <SecondaryButton onClick={generateMathProblem}>New Problem</SecondaryButton>
        </GameCard>

        {/* Breathing Exercise */}
        <GameCard>
          <GameTitle>🌬️ Breathing Circle</GameTitle>
          <GameDescription>
            Follow the expanding circle with your breath. Inhale as it grows, exhale as it shrinks.
          </GameDescription>
          <GameArea>
            <BreathingCircle $isExpanded={breathingExpanded} />
            <BreathingText>
              {breathingActive ? (
                breathingPhase === 'inhale' ? 'Breathe In...' :
                breathingPhase === 'hold' ? 'Hold...' : 'Breathe Out...'
              ) : 'Press start to begin'}
            </BreathingText>
          </GameArea>
          <Button 
            onClick={breathingActive ? stopBreathingExercise : startBreathingExercise}
          >
            {breathingActive ? 'Stop' : 'Start Breathing'}
          </Button>
        </GameCard>
      </GamesGrid>
    </GamesContainer>
  );
};

export default Games;
