Project: Metrodle SP — Developer Guidelines

This document captures project-specific practices and constraints to speed up development and debugging. It assumes familiarity with TypeScript, Vite, Vitest, and modern browser APIs.

### 1. Quick Start & Running

- **Prerequisites**: Node.js 18+ is required.
- **Install dependencies**: `npm install`.
- **Environment**: Create a `.env` file at the root (ignored by VCS) with:
  - `VITE_MAPTILER_KEY=your_key` (used for the embedded map).
- **Commands**:
  - `npm run dev`: Starts the Vite development server at http://localhost:5173.
  - `npm run build`: Builds the production-ready app to the `/build` directory.
  - `npm run test`: Runs tests using Vitest (includes a TypeScript compilation check).
  - `npm run typecheck`: Runs `tsc` to verify types without generating output.
  - `npm run preview`: Locally serves the production build from `/build`.
  - `npm run format`: Applies Prettier formatting.

---

### 2. Project Structure

- **`index.html`**: The application shell. Loads `src/index.ts` and `styles.css`.
- **`src/`**: Core application logic.
  - **`index.ts`**: Main entry point. Orchestrates DOM manipulation, game loop, and event listeners.
  - **`logic.ts`**: Pure functions for game logic (daily picking, candidate search, knowledge derivation, share text).
  - **`stationLoader.ts`**: Handles CSV parsing and builds the adjacency graph (supports Metro and CPTM modes).
  - **`lines.ts`**: Single source of truth for line IDs, names, and hex colors.
  - **`state.ts`**: Persistence layer using `localStorage` for game state and stats.
  - **`keyboard.ts`**: Virtual QWERTY keyboard with smart key-fading logic.
  - **`aleaPRNG.ts`**: Seedable pseudo-random number generator for stable daily picks.
- **`src/data/`**: Extended data for CPTM mode (`stations_with_cptm.csv`, etc.).
- **`src/map/`**: Map integration.
  - **`map.html`**: Embedded MapLibre/MapTiler view.
  - **`lines.geojson`**: Optimized geometry for metro lines.
- **`src/__tests__/`**: Vitest unit tests and setup.
- **`scripts/`**: Utility scripts (e.g., `compress-lines.ts` for GeoJSON optimization).
- **`public/`**: Static assets like icons and manifest.

---

### 3. Core Logic & Implementation

#### Daily Puzzle Selection
- Uses `logic.pickDailyStation(dateKey, stations)`.
- **Determinism**: Since 2025-11-03, it uses `AleaPRNG` seeded with a cycle number based on days since epoch. This ensures every player gets the same station and the cycle doesn't repeat until all stations are used.

#### Data & Graph
- **Station IDs**: Wikidata QIDs (e.g., `Q1234`).
- **Graph**: `stationLoader.ts` implements a 0-1 BFS. Adjacency edges cost 1; interchanges (physical connections between different lines) cost 0.
- **CPTM Mode**: When `includeCPTM` is enabled in settings, the app loads larger CSV files from `src/data/` and uses separate storage keys for stats/state.

#### UI Synchronization
- The app uses vanilla DOM manipulation.
- **Keyboard**: Keys become visually disabled (`opacity: 0.35`) if they cannot lead to a valid station name based on current input, but they remain clickable.
- **Timezone**: Daily reset follows São Paulo time (UTC-3). `getSPNow()` shifts the system clock to ensure consistency globally.

---

### 4. Testing

- **Runner**: Vitest with `jsdom` environment.
- **Setup**: `src/__tests__/setup.ts` mocks `localStorage` and `stationLoader` (returning a stable minimal graph/station list for faster tests).
- **Patterns**:
  - Always import local modules with `.js` extensions (e.g., `import {normalize} from '../logic.js'`).
  - Use `src/__tests__/testUtils.ts` for helper data and the `fetch` mock (which redirects network requests to local CSV files).
- **Executing**: `npm test` runs `tsc` followed by `vitest run`.

---

### 5. Assets and URL handling

- **CSVs/Assets**: Referenced with `new URL('./file.ext', import.meta.url)`.
- **Map Integration**: `map.html` is imported with `?url`. It accepts `?lon`, `?lat`, `?z`, and `?k` (MapTiler key) as query parameters.

---

### 6. Coding Style & Conventions

- **ESM**: Use ECMAScript modules throughout.
- **File Extensions**: **Mandatory** `.js` suffix in imports within `src/` (e.g., `import {X} from './Y.js'`).
- **CSS**: Leverages CSS variables for layout (e.g., `--kb-h` for keyboard height reservation).
- **CSV Parser**: Minimalist. Split by commas/newlines. Avoid commas inside field values.

---

### 7. Common Pitfalls

- **Timezone Shift**: Do not replace the UTC-3 shift logic; it will break daily station synchronization.
- **Browser caching**: During development, if CSV changes aren't visible, a hard refresh or dev server restart might be needed.
- **Mobile Layout**: The container uses `height: calc(100dvh - 53px)` and `position: relative` to handle mobile address bars and the fixed virtual keyboard properly.
