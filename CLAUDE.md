# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based frontend for AmeenTECH, a software development company website. The application is a single-page landing page showcasing services, portfolio, team information, and contact forms.

## Development Commands

- `npm start` - Start development server (runs on http://localhost:3000)
- `npm run build` - Create production build
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App (not recommended)

## Architecture

### Component Structure
The application follows a section-based architecture where each major page section is a separate component:

- **App.js** - Main application entry point that orchestrates all sections in order
- **Components structure**: Each component has its own folder with `.js` and `.css` files
- **Section flow**: Navbar → Hero → Marquee → Services → WhoIsBaaba → Tools → Portfolio → Experience → Pricing → Contact → Testimonials → Blog → FAQ → Footer

### API Integration
- **apiConfig.js** - Centralized Axios configuration with interceptors
- Uses `REACT_APP_API_BASE_URL` environment variable (defaults to `http://localhost:3000/api`)
- Implements JWT token authentication via localStorage
- Includes request/response interceptors for auth handling and error management

### Design System
- **Primary styling approach**: SCSS/Sass with CSS custom properties
- **Design tokens**: Centralized in `src/styles/_variables.scss`
- **Brand colors**: Purple (#7552E5), Cyan (#34C9F4), Lime (#BADC4A), Dark (#2E2D36)
- **Responsive breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

### Key Dependencies
- **framer-motion**: Used for component animations (see Hero component for fade-in patterns)
- **react-scroll**: Smooth scrolling navigation between sections
- **react-icons**: Icon library (FaPlay, FaLocationArrow, etc.)
- **axios**: HTTP client with configured interceptors

### Data Flow
- Components can fetch dynamic content from API endpoints (e.g., Hero component fetches settings)
- Error handling and loading states are implemented at component level
- Settings data includes welcome text, title, slogan, description, and logo URLs

### Styling Conventions
- Each component has its own CSS file in the same directory
- Use SCSS variables from `_variables.scss` for consistency
- CSS custom properties are exposed for runtime theming
- Follow the existing spacing scale and color tokens