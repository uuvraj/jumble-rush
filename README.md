# 🕹️ Jumble Rush — Dev Arcade Edition

A responsive, frontend-only Word Scramble (Jumble) web game built with **React** and **Vite**, themed with dark modern arcade aesthetics (`#0f172a` navy/slate).

---

## ✨ Features & Mechanics

1. **Word Deck**:
   - Curated deck of 40+ tech & programming terms with hints, difficulty tiers, and category tags (e.g., `REACT`, `JAVASCRIPT`, `DEPLOY`, `BROWSER`, `COMPONENT`, `TERMINAL`, `KUBERNETES`, `WEBSOCKET`, etc.).
   - Expandable word deck drawer allowing players to view all terms or add their own custom words with hints stored locally in `localStorage`.
   - Guaranteed scrambling: The scramble algorithm ensures the scrambled output never matches the original word.

2. **Game State & Scoring**:
   - **Score**: Tracks current score (+10 points per correct answer).
   - **Streak Counter**: Increments on consecutive correct answers with flame animations 🔥; resets to 0 on a wrong answer.
   - **High Score & Best Streak**: Stored persistently across browser sessions in `localStorage`.
   - **Word Navigation**: "Skip Word" action moves to the next word without score penalty or streak reset.
   - **Hint System**: Concealed by default behind an illuminated "Need a hint?" trigger that reveals the definition on click.

3. **User Input & Validation**:
   - Auto-focused input field with automatic case-insensitivity (handles uppercase and lowercase inputs equally).
   - Instant visual feedback:
     - **Success**: Displays *"Correct! Nice job 🎉"* with a glowing banner, confetti particle celebration, sound effect, and auto-advances to the next word after ~1.2s.
     - **Incorrect**: Shows *"Not quite, try again!"* with a card shake animation and resets the streak to 0.

4. **UI & Styling**:
   - Dark modern arcade theme using slate/navy tones (`#0f172a` background, `#1e293b` glassmorphic card).
   - Scrambled letters rendered as 3D elevated arcade tiles with vibrant `#38bdf8` cyan glow accents.
   - Responsive layout adapting smoothly to desktop, tablet, and mobile screens.
   - Dependency-free Web Audio API sound effects (SFX toggleable on/off).
   - Dependency-free canvas confetti burst.
   - Quick keyboard shortcuts:
     - `Enter`: Submit guess
     - `Alt + S`: Skip word
     - `Alt + H`: Toggle hint

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized bundle will be created in the `dist/` directory.
