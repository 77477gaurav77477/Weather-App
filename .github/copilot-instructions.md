# Copilot Instructions for weather-app

## Project Overview

- **Type:** React + Vite web app for weather data
- **Main Features:**
  - Search weather by city (OpenWeatherMap API)
  - Hourly and daily weather display
  - Responsive UI with Tailwind CSS

## Key Files & Structure

- `src/App.jsx`: Main app logic, handles API calls, state, and rendering
- `src/components/WeatherCard.jsx`: Displays weather info (hourly/daily)
- `src/Api.jsx`: (WIP) Utility for API calls (not fully integrated)
- `public/`: Static assets
- `vite.config.js`: Vite + Tailwind + React plugin setup
- `eslint.config.js`: ESLint config (React, hooks, refresh)

## Data Flow & Patterns

- **API Integration:**
  - Uses OpenWeatherMap's geo and forecast endpoints
  - API key is hardcoded in `App.jsx` and `Api.jsx` (consider .env for secrets)
  - Axios for HTTP requests
- **State Management:**
  - React `useState` for city, weather data, and daily averages
  - Weather data is processed and split into hourly/daily views
- **Component Communication:**
  - `App.jsx` passes weather data as props to `WeatherCard`
  - Daily/hourly distinction handled by presence of `time` or `date` prop

## Build & Run

- **Dev server:** `npm run dev` (Vite)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Lint:** `npm run lint`

## Conventions & Patterns

- **Styling:** Tailwind CSS classes in JSX
- **Linting:** ESLint enforces React hooks and refresh rules
- **Error Handling:** Minimal; API errors may not be surfaced to UI
- **File Naming:** PascalCase for components, camelCase for functions/variables
- **No TypeScript** (JSX only)

## Integration Points

- **External APIs:** OpenWeatherMap (geo, forecast)
- **Dependencies:** React, Axios, Tailwind, Vite
- **No test framework present**

## Tips for AI Agents

- Always update both hourly and daily views when changing data flow
- Keep API keys secure (move to .env if possible)
- Follow Tailwind and React patterns for new UI components
- Reference `App.jsx` for main logic and data flow
- Use `WeatherCard.jsx` for display conventions
- Check `vite.config.js` and `eslint.config.js` for build/lint specifics

---

_If any section is unclear or missing, please ask for clarification or provide suggestions for improvement._
