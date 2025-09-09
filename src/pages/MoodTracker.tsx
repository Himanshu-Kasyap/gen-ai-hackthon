import React, { useState } from 'react';
import styled from 'styled-components';

const TrackerContainer = styled.div`
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  color: #667eea;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const MoodSelector = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin-bottom: 20px;
`;

const MoodOption = styled.button<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: 2px solid ${props => props.$isSelected ? '#667eea' : 'rgba(102, 126, 234, 0.2)'};
  border-radius: 12px;
  background: ${props => props.$isSelected ? 'rgba(102, 126, 234, 0.1)' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
  }

  .emoji {
    font-size: 2rem;
    margin-bottom: 8px;
  }

  .label {
    font-size: 0.8rem;
    color: #333;
    font-weight: 500;
  }
`;

const NotesArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  outline: none;
  margin-bottom: 15px;

  &:focus {
    border-color: #667eea;
  }
`;

const SaveButton = styled.button`
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

const MoodHistory = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const MoodEntry = styled.div`
  padding: 15px;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }
`;

const MoodInfo = styled.div`
  flex: 1;
`;

const MoodDate = styled.div`
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 5px;
`;

const MoodDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;

  .emoji {
    font-size: 1.5rem;
  }

  .mood-name {
    font-weight: 600;
    color: #333;
  }
`;

const MoodNotes = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
`;

const ActivitiesSection = styled.div`
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const ActivitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

const ActivityButton = styled.button<{ $isCompleted: boolean }>`
  padding: 15px;
  border: 2px solid ${props => props.$isCompleted ? '#4CAF50' : 'rgba(102, 126, 234, 0.2)'};
  border-radius: 10px;
  background: ${props => props.$isCompleted ? 'rgba(76, 175, 80, 0.1)' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  .activity-name {
    display: block;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }

  .activity-description {
    display: block;
    font-size: 0.8rem;
    color: #666;
  }

  .checkmark {
    float: right;
    color: #4CAF50;
    font-size: 1.2rem;
  }
`;

interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

interface MoodEntry {
  id: string;
  mood: Mood;
  notes: string;
  date: Date;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

const moods: Mood[] = [
  { id: 'excellent', name: 'Excellent', emoji: '😄', color: '#4CAF50' },
  { id: 'good', name: 'Good', emoji: '😊', color: '#8BC34A' },
  { id: 'okay', name: 'Okay', emoji: '😐', color: '#FFC107' },
  { id: 'low', name: 'Low', emoji: '😔', color: '#FF9800' },
  { id: 'terrible', name: 'Terrible', emoji: '😢', color: '#F44336' }
];

const dailyActivities: Activity[] = [
  { id: '1', name: 'Morning Meditation', description: '10 minutes of mindfulness', completed: false },
  { id: '2', name: 'Gratitude Journal', description: 'Write 3 things you\'re grateful for', completed: false },
  { id: '3', name: 'Exercise', description: 'Any physical activity', completed: false },
  { id: '4', name: 'Healthy Meal', description: 'Nutritious breakfast/lunch/dinner', completed: false },
  { id: '5', name: 'Social Connection', description: 'Meaningful interaction with others', completed: false },
  { id: '6', name: 'Learning', description: 'Read, learn something new', completed: false },
  { id: '7', name: 'Nature Time', description: 'Spend time outdoors', completed: false },
  { id: '8', name: 'Self Care', description: 'Do something kind for yourself', completed: false }
];

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [notes, setNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    {
      id: '1',
      mood: moods[1],
      notes: 'Had a productive day at work and felt accomplished',
      date: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      mood: moods[2],
      notes: 'Feeling neutral, nothing particularly exciting happened',
      date: new Date(Date.now() - 172800000)
    }
  ]);
  const [activities, setActivities] = useState<Activity[]>(dailyActivities);

  const saveMoodEntry = () => {
    if (!selectedMood) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      notes: notes.trim(),
      date: new Date()
    };

    setMoodHistory(prev => [newEntry, ...prev]);
    setSelectedMood(null);
    setNotes('');
  };

  const toggleActivity = (activityId: string) => {
    setActivities(prev => prev.map(activity =>
      activity.id === activityId
        ? { ...activity, completed: !activity.completed }
        : activity
    ));
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const completedActivities = activities.filter(a => a.completed).length;
  const completionPercentage = Math.round((completedActivities / activities.length) * 100);

  return (
    <TrackerContainer>
      <Header>
        <Title>Mood & Activity Tracker 📊</Title>
        <Subtitle>Track your emotional well-being and daily activities</Subtitle>
      </Header>

      <ContentGrid>
        <Card>
          <CardTitle>How are you feeling today?</CardTitle>
          <MoodSelector>
            {moods.map(mood => (
              <MoodOption
                key={mood.id}
                $isSelected={selectedMood?.id === mood.id}
                onClick={() => setSelectedMood(mood)}
              >
                <span className="emoji">{mood.emoji}</span>
                <span className="label">{mood.name}</span>
              </MoodOption>
            ))}
          </MoodSelector>
          
          <NotesArea
            placeholder="How was your day? What influenced your mood? (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          
          <SaveButton
            onClick={saveMoodEntry}
            disabled={!selectedMood}
          >
            Save Mood Entry
          </SaveButton>
        </Card>

        <Card>
          <CardTitle>Mood History</CardTitle>
          <MoodHistory>
            {moodHistory.length === 0 ? (
              <p style={{ color: '#666', textAlign: 'center' }}>
                No mood entries yet. Start tracking your mood today!
              </p>
            ) : (
              moodHistory.map(entry => (
                <MoodEntry key={entry.id}>
                  <MoodInfo>
                    <MoodDate>{formatDate(entry.date)}</MoodDate>
                    <MoodDisplay>
                      <span className="emoji">{entry.mood.emoji}</span>
                      <span className="mood-name">{entry.mood.name}</span>
                    </MoodDisplay>
                    {entry.notes && <MoodNotes>{entry.notes}</MoodNotes>}
                  </MoodInfo>
                </MoodEntry>
              ))
            )}
          </MoodHistory>
        </Card>

        <ActivitiesSection>
          <Card>
            <CardTitle>
              Daily Activities ({completedActivities}/{activities.length} completed - {completionPercentage}%)
            </CardTitle>
            <ActivitiesGrid>
              {activities.map(activity => (
                <ActivityButton
                  key={activity.id}
                  $isCompleted={activity.completed}
                  onClick={() => toggleActivity(activity.id)}
                >
                  <span className="activity-name">{activity.name}</span>
                  <span className="activity-description">{activity.description}</span>
                  {activity.completed && <span className="checkmark">✓</span>}
                </ActivityButton>
              ))}
            </ActivitiesGrid>
          </Card>
        </ActivitiesSection>
      </ContentGrid>
    </TrackerContainer>
  );
};

export default MoodTracker;
