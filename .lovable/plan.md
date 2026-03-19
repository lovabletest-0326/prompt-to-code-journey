## Starting with Vibecoding — Educational Platform

### Overview

A playful, gamified educational web app teaching beginners how to build software through natural language prompts ("vibe coding"). Inspired by Elements of AI's clean aesthetic, with a bold light-orange brand color, Space Grotesk/Inter typography, dark mode, and mobile-responsive design. 

### Pages & Features

**1. Landing Page (`/`)**

- Hero section with bold headline, animated subtitle, and CTA button
- "What is Vibecoding?" explainer section with illustrated cards
- Benefits grid (no code needed, AI-powered, learn by doing)
- Final CTA to start the course

**2. Course Overview (`/course`)**

- 5 progressive modules displayed as cards (similar to Elements of AI chapter cards)
- Visual progress bar per module and overall
- Milestone badges (locked/unlocked states)
- Modules: Intro to Vibecoding, Your First Prompt, Building UI, Adding Logic, Launch Your Project

**3. Lesson Page (`/course/:moduleId/:lessonId`)**

- Lesson content with markdown-style text
- Interactive exercises with instant feedback
- Hint system and "Reveal Solution" buttons
- Next/previous navigation with progress tracking

**4. Interactive Playground (`/playground`)**

- Natural language prompt input area
- Mock AI code generation (returns pre-built code snippets based on prompt keywords)
- Live preview panel showing rendered output
- **Educational Overlay** panel explaining each code block in plain English
- Copy code and save prompt buttons

**5. User Dashboard (`/dashboard`)**

- Profile card with avatar, level, and XP
- Saved prompts list
- Project history timeline
- Community "Prompt Gallery" with featured user prompts (mock data)
- Achievement badges grid

**6. Auth (Mock)**

- Login/Signup modals with mock authentication (localStorage-based)
- Persistent session state across pages

### Design System

- **Primary**: Light orange (`hsl(30, 95%, 55%)`)
- **Background**: Deep indigo/purple (like Elements of AI) for hero sections
- **Typography**: Space Grotesk (headings), Inter (body) via Google Fonts
- **Dark mode**: Toggle in header, persisted to localStorage
- **Components**: Cards with colorful illustration placeholders, rounded buttons, progress bars, badge chips

### Technical Approach

- All data is mock/local (localStorage for progress, auth, saved prompts)
- Modular service layer (`src/services/`) with mock implementations ready to swap for real APIs
- React Router for navigation, Tailwind for styling
- ~15 new components, 5 pages