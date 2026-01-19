## Live Demo

https://alexyakubouskidev.github.io/horse-racing/

# Horse Racing Game

Test assignment: a horse racing game built with Vue 2 and Vuex.

The application simulates a series of races, calculates speed and time for each horse, shows the race animation, the race program, and final results.

---

## Tech Stack

- Vue 2
- Vuex
- JavaScript (ES6)
- CSS (BEM, CSS Variables)
- Jest (unit tests)
- Cypress (end-to-end tests)

---

## Installation & Run

```bash
npm install
npm run serve
```

The app will be available at:

```
http://localhost:8080
```

---

## Tests

### Unit Tests (Jest)

```bash
npm run test:unit
```

### E2E Tests (Cypress)

Open interactive runner:

```bash
npx cypress open
```

Run headless:

```bash
npx cypress run
```

---

## Architecture

The project follows a layered, modular frontend architecture with separated domain logic.

### Layers

### 1. Presentation Layer

`components/`, `layouts/`  
Vue components, UI, animation, layout.

### 2. State / Orchestration Layer

`store/` (Vuex modules: `game`, `races`, `horses`)  
Controls application flow: race lifecycle, pause/resume, transitions, delays, current round.

### 3. Domain Layer

`domain/`  
Pure business logic without Vue dependencies:

- Speed model
- Time model
- Race engine (ranking, results)

### 4. Configuration Layer

`constants/`  
All numeric parameters and coefficients (distances, limits, multipliers, colors).

### 5. Utilities

`utils/`  
Helpers: random generators, shuffle, ordinal formatting.

### 6. Tests

`tests/unit` – domain and utility logic  
`tests/e2e` – main user scenarios

This separation keeps business logic fully testable and independent from the UI.

---

## Features

- Horse generation (speed, condition, color, name)
- Program generation for multiple rounds
- Real-time race animation (requestAnimationFrame)
- Pause / Resume
- Delay between rounds
- Program and Results tables
- Auto-scroll for finished rounds
- Empty state on initial load
- Unit tests for all calculation logic
- E2E tests for main user flows

---

## Assumptions

- Linear movement model
- Speed affected by condition using configurable coefficients
- Deterministic ranking based on calculated time
- No external UI frameworks
- Local SVG assets

---
