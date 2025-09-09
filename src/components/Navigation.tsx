import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  width: 250px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    padding: 10px 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Logo = styled.h1`
  color: #667eea;
  margin-bottom: 40px;
  font-size: 1.8rem;
  text-align: center;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-bottom: 0;
    font-size: 1.4rem;
    line-height: 40px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    overflow-x: auto;
  }
`;

const NavItem = styled.li<{ $isActive: boolean }>`
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 0;
    margin-right: 20px;
    flex-shrink: 0;
  }

  a {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: ${props => props.$isActive ? '#667eea' : '#666'};
    text-decoration: none;
    border-radius: 8px;
    background: ${props => props.$isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent'};
    transition: all 0.3s ease;
    font-weight: ${props => props.$isActive ? '600' : '400'};

    &:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }

    @media (max-width: 768px) {
      padding: 8px 12px;
      font-size: 0.9rem;
      white-space: nowrap;
    }
  }

  .icon {
    margin-right: 12px;
    font-size: 1.2rem;

    @media (max-width: 768px) {
      margin-right: 6px;
      font-size: 1rem;
    }
  }
`;

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/exercise', label: 'Exercise', icon: '🧘' },
  { path: '/diet', label: 'Diet', icon: '🥗' },
  { path: '/chat', label: 'AI Chat', icon: '💬' },
  { path: '/mood', label: 'Mood Tracker', icon: '😊' },
  { path: '/games', label: 'Mind Games', icon: '🎮' },
];

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <NavContainer>
      <Logo>WellnessHub</Logo>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.path} $isActive={location.pathname === item.path}>
            <Link to={item.path}>
              <span className="icon">{item.icon}</span>
              {item.label}
            </Link>
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
};

export default Navigation;
