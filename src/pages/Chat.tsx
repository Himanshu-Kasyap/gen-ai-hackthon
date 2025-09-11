import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-bottom: 20px;
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

const ChatWindow = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Message = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  background: ${props => props.$isUser 
    ? 'linear-gradient(45deg, #667eea, #764ba2)' 
    : 'rgba(102, 126, 234, 0.1)'};
  color: ${props => props.$isUser ? 'white' : '#333'};
  word-wrap: break-word;
  line-height: 1.4;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #667eea;
  }
`;

const SendButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 25px;
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

const QuickSuggestions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const Suggestion = styled.button`
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-style: italic;
  padding: 10px 16px;
`;

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestions = [
  "I'm feeling stressed",
  "Help me relax",
  "I can't sleep",
  "Anxiety techniques",
  "Breathing exercises",
  "Positive affirmations"
];

const botResponses = {
  "stress": [
    "I understand you're feeling stressed. Let's try a simple breathing technique: Inhale for 4 counts, hold for 4, exhale for 6. Repeat this 5 times. 🌸",
    "Stress is natural, and you're taking the right step by reaching out. Try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. 🧘‍♀️"
  ],
  "relax": [
    "Here's a quick relaxation technique: Close your eyes, take deep breaths, and imagine you're in your favorite peaceful place. Focus on the details - what do you see, hear, and feel? 🌊",
    "Progressive muscle relaxation can help: Starting with your toes, tense each muscle group for 5 seconds, then release. Work your way up to your head. Feel the tension melt away. ✨"
  ],
  "sleep": [
    "Having trouble sleeping? Try the 4-7-8 breathing technique: Inhale for 4, hold for 7, exhale for 8. Also, try to avoid screens 1 hour before bed. 🌙",
    "Create a bedtime routine: dim the lights, perhaps some gentle stretching or meditation. Keep your bedroom cool and comfortable. Sweet dreams! 😴"
  ],
  "anxiety": [
    "When anxiety strikes, remember: You are safe in this moment. Try box breathing - in for 4, hold for 4, out for 4, hold for 4. Repeat until you feel calmer. 💙",
    "Anxiety can feel overwhelming, but it will pass. Ground yourself by naming 3 things you're grateful for today. You've overcome challenges before, and you can do it again. 🌈"
  ],
  "breathing": [
    "Let's focus on breathing together. Place one hand on your chest, one on your belly. Breathe so that your belly hand moves more than your chest hand. This activates your body's relaxation response. 🌸",
    "Try belly breathing: Breathe in slowly through your nose, letting your belly expand. Hold for a moment, then breathe out slowly through your mouth. Feel your body relax with each exhale. 🧘"
  ],
  "affirmations": [
    "Here are some positive affirmations for you: 'I am capable of handling whatever comes my way.' 'This feeling is temporary.' 'I choose peace and calm.' Repeat these to yourself. ✨",
    "Remember: 'I am worthy of love and kindness.' 'I trust in my ability to overcome challenges.' 'Every breath I take fills me with peace.' You are stronger than you know. 💪"
  ]
};

const getRandomResponse = (keyword: string): string => {
  const responses = botResponses[keyword as keyof typeof botResponses] || [
    "I'm here to support you. Could you tell me more about what you're feeling? I'm here to help with stress, anxiety, sleep issues, or just to listen. 💙",
    "Thank you for sharing with me. While I'm an AI assistant, I want you to know that your feelings are valid. How can I best support you right now? 🤗"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your AI wellness companion. I'm here to help you with stress relief, relaxation techniques, and emotional support. How are you feeling today? 😊",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const keyword = Object.keys(botResponses).find(key => 
        text.toLowerCase().includes(key)
      ) || 'default';
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(keyword),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <ChatContainer>
      <Header>
        <Title>AI Wellness Chat 💬</Title>
        <Subtitle>Your compassionate AI companion for stress relief and emotional support</Subtitle>
      </Header>

      <QuickSuggestions>
        {suggestions.map((suggestion, index) => (
          <Suggestion key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </Suggestion>
        ))}
      </QuickSuggestions>

      <ChatWindow>
        <MessagesContainer>
          {messages.map((message) => (
            <Message key={message.id} $isUser={message.isUser}>
              <MessageBubble $isUser={message.isUser}>
                {message.text}
              </MessageBubble>
            </Message>
          ))}
          {isTyping && (
            <Message $isUser={false}>
              <TypingIndicator>
                AI is typing...
              </TypingIndicator>
            </Message>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <form onSubmit={handleSubmit}>
          <InputContainer>
            <MessageInput
              type="text"
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <SendButton type="submit" disabled={isTyping || !inputValue.trim()}>
              Send
            </SendButton>
          </InputContainer>
        </form>
      </ChatWindow>
    </ChatContainer>
  );
};

export default Chat;
