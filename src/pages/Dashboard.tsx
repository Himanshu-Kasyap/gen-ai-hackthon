import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const Header = styled.div`
  margin-bottom: 30px;
  color: white;
  padding-top: 10px;

  @media (max-width: 768px) {
    padding-top: 5px;
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const StatCard = styled.div`
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

const StatTitle = styled.h3`
  color: #667eea;
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-weight: 600;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

const StatDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div<{ $progress: number }>`
  width: 100%;
  height: 8px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 4px;
  margin: 15px 0;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: ${props => props.$progress}%;
    height: 100%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s ease;
  }
`;

const ScheduleCard = styled(StatCard)`
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const ScheduleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const ScheduleTime = styled.span`
  font-weight: 600;
  color: #667eea;
`;

const ScheduleActivity = styled.span`
  color: #333;
`;

const Dashboard: React.FC = () => {
  const todaySchedule = [
    { time: '7:00 AM', activity: 'Morning Meditation' },
    { time: '8:30 AM', activity: 'Healthy Breakfast' },
    { time: '12:00 PM', activity: 'Mindful Lunch Break' },
    { time: '3:00 PM', activity: 'Stress Relief Exercise' },
    { time: '6:00 PM', activity: 'Evening Yoga' },
    { time: '9:00 PM', activity: 'Sleep Preparation' },
  ];

  return (
    <DashboardContainer>
      <Header>
        <Title>Welcome Back! 👋</Title>
        <Subtitle>Here's your wellness summary for today</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatTitle>Sleep Score</StatTitle>
          <StatValue>8.2<span style={{ fontSize: '1rem', color: '#666' }}>/10</span></StatValue>
          <StatDescription>Excellent sleep quality</StatDescription>
          <ProgressBar $progress={82} />
        </StatCard>

        <StatCard>
          <StatTitle>Exercise Completion</StatTitle>
          <StatValue>75<span style={{ fontSize: '1rem', color: '#666' }}>%</span></StatValue>
          <StatDescription>3 of 4 sessions completed</StatDescription>
          <ProgressBar $progress={75} />
        </StatCard>

        <StatCard>
          <StatTitle>Mood Rating</StatTitle>
          <StatValue>😊</StatValue>
          <StatDescription>Feeling positive today</StatDescription>
        </StatCard>

        <StatCard>
          <StatTitle>Mindfulness Minutes</StatTitle>
          <StatValue>45<span style={{ fontSize: '1rem', color: '#666' }}>min</span></StatValue>
          <StatDescription>Daily goal: 60 minutes</StatDescription>
          <ProgressBar $progress={75} />
        </StatCard>

        <ScheduleCard>
          <StatTitle>Today's Schedule</StatTitle>
          {todaySchedule.map((item, index) => (
            <ScheduleItem key={index}>
              <ScheduleTime>{item.time}</ScheduleTime>
              <ScheduleActivity>{item.activity}</ScheduleActivity>
            </ScheduleItem>
          ))}
        </ScheduleCard>
      </StatsGrid>
    </DashboardContainer>
  );
};

export default Dashboard;
