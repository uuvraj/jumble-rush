# 🕹️ Jumble Rush — Dev Arcade Edition

A responsive, frontend-only Word Scramble (Jumble) web game built with **React** and **Vite**, themed with dark modern arcade aesthetics (`#0f172a` navy/slate).

---

## ✨ Features & Mechanics

1. **Multi-Category Vocabulary Decks & Datamuse Integration**:
   - **8 Curated Categories**: 💻 Tech & Code, 🚀 Space & Cosmos, 🐾 Animals & Nature, 🍕 Food & Culinary, ⚡ Science & Physics, 🏆 Sports & Games, 🌍 World & Travel, and 🎨 Art & Music.
   - **⚡ Datamuse Live Mode (External API)**: Dynamically fetches relevant vocabulary words with real contextual definitions from the [Datamuse API](https://www.datamuse.com/api/), sanitized and game-formatted with secret word masking in hints.
   - **💎 Curated Offline Decks**: Hand-crafted, zero-latency curated word lists with in-depth hints for complete offline play and automatic error recovery fallback if the network is unavailable.
   - **✨ Explore Any Custom Topic**: Interactive topic generator allowing players to type any subject (e.g. *Mythology*, *Dinosaurs*, *Video Games*, *Weather*, *Coffee*) to generate an on-the-fly jumble deck via Datamuse API.
   - **Local Caching & Refresh**: Smart 12-hour client caching with a one-click "New Batch" refresh button.
   - **Expandable Word Deck Drawer**: Lets players inspect all terms in the active deck or add their own custom words stored in `localStorage`.
   - **Guaranteed Scrambling**: Permutation algorithm ensures the scrambled output never matches the original word.

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
