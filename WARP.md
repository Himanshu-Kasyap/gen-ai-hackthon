# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

WellnessHub is a MERN stack mental wellness dashboard built with React 19 + TypeScript frontend and Node.js + Express backend. The application focuses on tracking and improving mental well-being through interactive features including meditation timers, mood tracking, AI chat support, and cognitive games.

## Architecture

The project follows a standard MERN architecture with clear separation between client and server:

### Frontend (`client/`)
- **React 19** with TypeScript
- **Styled Components** for all styling (no CSS files for components)
- **React Router DOM v7** for navigation
- **Axios** for API communication
- Component-based architecture with pages and reusable components
- Responsive design with mobile breakpoints at 768px

### Backend (`server/`)
- **Express.js** server with middleware for security (Helmet), rate limiting, and CORS
- **MongoDB** with Mongoose for data persistence
- **JWT** authentication system (routes prepared but not fully implemented)
- **bcryptjs** for password hashing
- RESTful API structure with route separation

### Key Architectural Patterns
- Fixed sidebar navigation (250px width) that collapses to top bar on mobile
- Glass morphism design with backdrop-filter blur effects
- Purple gradient theme (`#667eea` to `#764ba2`)
- Grid-based layouts with auto-fit responsive patterns
- Mock data currently used for development (dashboard shows sample wellness metrics)

## Development Commands

### Setup
```bash
# Install all dependencies (root, server, client)
npm run install-deps

# Environment setup
# Copy server/.env.example to server/.env and configure MongoDB URI and JWT secret
```

### Development
```bash
# Run both client and server concurrently
npm run dev

# Run server only (localhost:5000)
npm run server

# Run client only (localhost:3000)
npm run client
```

### Building
```bash
# Build client for production
npm run build
```

### Testing
```bash
# Run client tests
cd client && npm test

# Server tests not yet implemented
```

## Code Style and Patterns

### Component Structure
- Use functional components with TypeScript
- Styled Components with $ prefix for transient props (e.g., `$isActive`, `$progress`)
- Props interfaces defined inline for simple components
- Responsive design using CSS Grid and Flexbox

### API Structure
- Routes organized by feature in `server/routes/`
- Controllers, models, and middleware folders exist but routes currently contain logic directly
- Authentication middleware prepared but not implemented
- Mock data responses for development

### Styling Conventions
- Glass morphism effects: `rgba(255, 255, 255, 0.95)` with `backdrop-filter: blur(10px)`
- Consistent purple gradient theme
- Hover animations with `transform: translateY(-5px)`
- Progress bars using CSS `::after` pseudo-elements
- Mobile-first responsive breakpoints

## Current Development Status

### Completed Features
- Complete frontend UI for all main features
- Basic Express server setup with route structure
- Responsive navigation and page layouts
- Mock data integration for dashboard
- Interactive timers and games (frontend only)

### In Development (Phase 2)
- User authentication system (routes exist, implementation needed)
- MongoDB integration (connection configured, models needed)
- Data persistence across all features
- API endpoint implementations beyond dashboard

### Database Schema (Planned)
- Users collection for authentication
- Wellness data (mood, sleep, exercise tracking)
- Session data for meditation/exercise completions
- Game scores and progress tracking

## Important Files

- `client/src/App.tsx` - Main routing and layout structure
- `client/src/components/Navigation.tsx` - Sidebar navigation component
- `client/src/pages/` - All main feature pages
- `server/index.js` - Express server setup with middleware
- `server/routes/` - API route definitions (currently with mock responses)

## Notes for Development

- The application uses MERN stack as per user preference
- All styling is done through Styled Components - do not create separate CSS files for components
- When implementing authentication, use the prepared JWT middleware structure
- Mock data patterns in dashboard routes should be followed for other endpoints
- Mobile responsiveness is important - test at 768px breakpoint
- Glass morphism and purple gradient theme should be maintained across new features
