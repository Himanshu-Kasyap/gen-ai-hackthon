import React, { useState } from 'react';
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
    height: 80px;
    padding: 15px 20px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.98);
    border-bottom: 2px solid rgba(102, 126, 234, 0.1);
    display: flex;
    align-items: center;
  }
`;

const MobileHeader = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
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
    font-size: 1.5rem;
    line-height: 1;
  }
`;

const MenuToggle = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(102, 126, 234, 0.1);
    border: 2px solid #667eea;
    border-radius: 8px;
    color: #667eea;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(102, 126, 234, 0.2);
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

const NavList = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    padding: 20px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-bottom: 2px solid rgba(102, 126, 234, 0.1);
    z-index: 999;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
  }
`;

const NavItem = styled.li<{ $isActive: boolean }>`
  margin-bottom: 15px;

  @media (max-width: 768px) {
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }
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
    border: ${props => props.$isActive ? '2px solid rgba(102, 126, 234, 0.3)' : '2px solid transparent'};

    &:hover {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      transform: translateX(5px);
      border-color: rgba(102, 126, 234, 0.2);
    }

    @media (max-width: 768px) {
      padding: 15px 20px;
      font-size: 1rem;
      border-radius: 10px;
      margin-bottom: 8px;
      box-shadow: ${props => props.$isActive ? '0 4px 12px rgba(102, 126, 234, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.05)'};
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.25);
      }
    }
  }

  .icon {
    margin-right: 12px;
    font-size: 1.2rem;

    @media (max-width: 768px) {
      margin-right: 15px;
      font-size: 1.3rem;
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

const DesktopLogo = styled(Logo)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 998;
  }
`;

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <NavContainer>
        <MobileHeader>
          <Logo>WellnessHub</Logo>
          <MenuToggle onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </MenuToggle>
        </MobileHeader>
        
        <DesktopLogo>WellnessHub</DesktopLogo>
        
        <NavList $isOpen={isMenuOpen}>
          {navItems.map((item) => (
            <NavItem key={item.path} $isActive={location.pathname === item.path}>
              <Link to={item.path} onClick={closeMenu}>
                <span className="icon">{item.icon}</span>
                {item.label}
              </Link>
            </NavItem>
          ))}
        </NavList>
      </NavContainer>
      
      <MobileOverlay $isOpen={isMenuOpen} onClick={closeMenu} />
    </>
  );
};

export default Navigation;
