import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TECH_WORDS, CURATED_DECKS, scrambleWord } from './words.js';
import { CATEGORIES, fetchCategoryWords, fetchCustomTopicWords } from './datamuse.js';
import { sounds } from './sounds.js';
import { fireConfetti } from './confetti.js';

const POPULAR_TOPICS = [
  { label: '🦖 Dinosaurs', query: 'dinosaurs' },
  { label: '⚡ Mythology', query: 'mythology' },
  { label: '🎮 Video Games', query: 'gaming' },
  { label: '🌧️ Weather & Climate', query: 'weather' },
  { label: '☕ Coffee & Drinks', query: 'coffee' },
  { label: '🎸 Rock Music', query: 'rock music' },
  { label: '🚗 Automobiles', query: 'automobiles' },
  { label: '🧙 Fantasy & Magic', query: 'fantasy magic' }
];

export default function App() {
  // Category & Source mode state
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem('jumble_rush_category') || 'tech';
  });

  const [sourceMode, setSourceMode] = useState(() => {
    return localStorage.getItem('jumble_rush_source_mode') || 'datamuse';
  });

  const [customTopic, setCustomTopic] = useState(null); // string or null
  const [activeDeckSource, setActiveDeckSource] = useState('curated'); // 'datamuse-live' | 'datamuse-cache' | 'datamuse-custom' | 'curated' | 'curated-fallback'
  const [isLoadingDeck, setIsLoadingDeck] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastNotice, setToastNotice] = useState(null);

  // Active word list & deck state
  const [wordList, setWordList] = useState(() => {
    return CURATED_DECKS[selectedCategory] || TECH_WORDS;
  });

  // Shuffled index order for current deck
  const [deckOrder, setDeckOrder] = useState(() => {
    const indices = Array.from({ length: wordList.length }, (_, i) => i);
    return indices.sort(() => Math.random() - 0.5);
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Active current word object & scrambled string
  const currentWordItem = (wordList && wordList.length > 0)
    ? (wordList[deckOrder[currentIndex % deckOrder.length] % wordList.length] || wordList[0])
    : { word: 'READY', hint: 'Prepare to play Jumble Rush', category: 'General', difficulty: 'Easy' };

  const [scrambled, setScrambled] = useState('');

  // User input & validation state
  const [guess, setGuess] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message: string }
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  // Stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wordsSolved, setWordsSolved] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('jumble_rush_highscore') || '0', 10);
  });
  const [bestStreak, setBestStreak] = useState(() => {
    return parseInt(localStorage.getItem('jumble_rush_beststreak') || '0', 10);
  });

  // Sound, Modal, & Custom Topic state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
  const [isCustomTopicModalOpen, setIsCustomTopicModalOpen] = useState(false);
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [customTopicError, setCustomTopicError] = useState(null);
  const [isSubmittingCustomTopic, setIsSubmittingCustomTopic] = useState(false);

  const [newWord, setNewWord] = useState('');
  const [newHint, setNewHint] = useState('');

  const inputRef = useRef(null);
  const advanceTimerRef = useRef(null);
  const toastTimerRef = useRef(null);

  // Show a self-dismissing toast notice
  const showToast = useCallback((message, type = 'info') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastNotice({ message, type });
    toastTimerRef.current = setTimeout(() => {
      setToastNotice(null);
    }, 3800);
  }, []);

  // Scramble word and reset form states
  const initWord = useCallback((wordItem) => {
    if (!wordItem || !wordItem.word) return;
    const scrambledText = scrambleWord(wordItem.word);
    setScrambled(scrambledText);
    setGuess('');
    setShowHint(false);
    setFeedback(null);
    setIsAdvancing(false);
    setIsShaking(false);
  }, []);

  // Sync scrambled word when currentIndex or deck changes
  useEffect(() => {
    initWord(currentWordItem);
  }, [currentIndex, currentWordItem, initWord]);

  // Focus input automatically
  useEffect(() => {
    if (!isAdvancing && !isLoadingDeck && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdvancing, currentIndex, isLoadingDeck]);

  // Load a deck based on category and source mode
  const loadDeck = useCallback(async (catId, mode, options = {}) => {
    const { forceRefresh = false, customQuery = null } = options;
    setIsLoadingDeck(true);

    try {
      if (customQuery) {
        // Fetch custom topic from Datamuse
        const res = await fetchCustomTopicWords(customQuery);
        setWordList(res.words);
        setActiveDeckSource('datamuse-custom');
        const indices = Array.from({ length: res.words.length }, (_, i) => i);
        setDeckOrder(indices.sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
        showToast(`✨ Generated ${res.words.length} words for "${res.topicName}" via Datamuse!`, 'info');
      } else if (mode === 'curated') {
        // Load offline curated deck
        const curatedWords = (CURATED_DECKS[catId] || TECH_WORDS).map(w => ({ ...w, source: 'curated' }));
        setWordList(curatedWords);
        setActiveDeckSource('curated');
        const indices = Array.from({ length: curatedWords.length }, (_, i) => i);
        setDeckOrder(indices.sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
      } else {
        // Fetch preset category from Datamuse (or cached)
        const res = await fetchCategoryWords(catId, { forceRefresh });
        setWordList(res.words);
        setActiveDeckSource(res.source);
        const indices = Array.from({ length: res.words.length }, (_, i) => i);
        setDeckOrder(indices.sort(() => Math.random() - 0.5));
        setCurrentIndex(0);

        if (res.source === 'curated-fallback') {
          showToast('Datamuse was unreachable; loaded curated offline deck.', 'warning');
        } else if (forceRefresh) {
          showToast(`⚡ Refreshed ${res.words.length} words from Datamuse!`, 'info');
        }
      }
    } catch (err) {
      console.error('[Deck Loading Error]', err);
      // Fallback cleanly to curated tech deck
      const fallback = (CURATED_DECKS[catId] || TECH_WORDS).map(w => ({ ...w, source: 'curated' }));
      setWordList(fallback);
      setActiveDeckSource('curated-fallback');
      const indices = Array.from({ length: fallback.length }, (_, i) => i);
      setDeckOrder(indices.sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
      showToast('Could not reach Datamuse API; switched to curated deck.', 'warning');
    } finally {
      setIsLoadingDeck(false);
      setIsRefreshing(false);
    }
  }, [showToast]);

  // Initial load on mount
  useEffect(() => {
    loadDeck(selectedCategory, sourceMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle category switch
  const handleSelectCategory = (catId) => {
    if (selectedCategory === catId && !customTopic && !isLoadingDeck) return;
    sounds.playPop();
    setSelectedCategory(catId);
    setCustomTopic(null);
    localStorage.setItem('jumble_rush_category', catId);
    loadDeck(catId, sourceMode);
  };

  // Handle source mode toggle (Datamuse vs Curated)
  const handleToggleSourceMode = (newMode) => {
    if (sourceMode === newMode && !customTopic) return;
    sounds.playPop();
    setSourceMode(newMode);
    localStorage.setItem('jumble_rush_source_mode', newMode);
    loadDeck(selectedCategory, newMode);
  };

  // Refresh current Datamuse deck
  const handleRefreshDatamuse = () => {
    if (isLoadingDeck || isRefreshing) return;
    sounds.playPop();
    setIsRefreshing(true);
    if (customTopic) {
      loadDeck(selectedCategory, 'datamuse', { forceRefresh: true, customQuery: customTopic });
    } else {
      loadDeck(selectedCategory, 'datamuse', { forceRefresh: true });
    }
  };

  // Submit custom topic query to Datamuse
  const handleCustomTopicSubmit = async (e) => {
    if (e) e.preventDefault();
    const query = customTopicInput.trim();
    if (!query) {
      setCustomTopicError('Please enter a topic or keyword.');
      return;
    }

    setCustomTopicError(null);
    setIsSubmittingCustomTopic(true);

    try {
      await loadDeck(selectedCategory, 'datamuse', { customQuery: query });
      setCustomTopic(query);
      setIsCustomTopicModalOpen(false);
      setCustomTopicInput('');
      sounds.playSuccess();
    } catch (err) {
      setCustomTopicError(err.message || 'Failed to fetch words for this topic. Try another keyword!');
      sounds.playError();
    } finally {
      setIsSubmittingCustomTopic(false);
    }
  };

  // Quick preset topic click
  const handleSelectPresetTopic = async (topicQuery) => {
    setCustomTopicInput(topicQuery);
    setCustomTopicError(null);
    setIsSubmittingCustomTopic(true);

    try {
      await loadDeck(selectedCategory, 'datamuse', { customQuery: topicQuery });
      setCustomTopic(topicQuery);
      setIsCustomTopicModalOpen(false);
      setCustomTopicInput('');
      sounds.playSuccess();
    } catch (err) {
      setCustomTopicError(err.message || 'Failed to fetch words for this topic.');
      sounds.playError();
    } finally {
      setIsSubmittingCustomTopic(false);
    }
  };

  // Reshuffle letters of current word
  const handleReshuffle = () => {
    sounds.playPop();
    setScrambled(scrambleWord(currentWordItem.word));
    if (inputRef.current) inputRef.current.focus();
  };

  // Advance to next word
  const nextWord = useCallback(() => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
    }
    setCurrentIndex((prev) => (prev + 1) % deckOrder.length);
  }, [deckOrder.length]);

  // Skip word action
  const handleSkip = useCallback(() => {
    if (isAdvancing || isLoadingDeck) return;
    sounds.playSkip();
    setFeedback({
      type: 'error',
      message: `Skipped! The word was: ${currentWordItem.word}`
    });
    setIsAdvancing(true);
    advanceTimerRef.current = setTimeout(() => {
      nextWord();
    }, 950);
  }, [isAdvancing, isLoadingDeck, currentWordItem.word, nextWord]);

  // Submit and validate guess
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (isAdvancing || isLoadingDeck) return;

    const trimmedGuess = guess.trim().toUpperCase();
    if (!trimmedGuess) {
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    const targetWord = currentWordItem.word.toUpperCase();

    if (trimmedGuess === targetWord) {
      // Correct!
      sounds.playSuccess();
      const newScore = score + 10;
      const newStreak = streak + 1;
      const newSolved = wordsSolved + 1;

      setScore(newScore);
      setStreak(newStreak);
      setWordsSolved(newSolved);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('jumble_rush_highscore', newScore.toString());
      }
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        localStorage.setItem('jumble_rush_beststreak', newStreak.toString());
      }

      if (newStreak >= 3) {
        sounds.playStreak();
      }

      fireConfetti();
      setFeedback({
        type: 'success',
        message: 'Correct! Nice job 🎉'
      });
      setIsAdvancing(true);

      advanceTimerRef.current = setTimeout(() => {
        nextWord();
      }, 1200);
    } else {
      // Incorrect!
      sounds.playError();
      setStreak(0);
      setIsShaking(true);
      setFeedback({
        type: 'error',
        message: 'Not quite, try again!'
      });

      setTimeout(() => {
        setIsShaking(false);
      }, 450);

      if (inputRef.current) {
        inputRef.current.select();
      }
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isDeckModalOpen || isCustomTopicModalOpen) return;

      // Skip word shortcut: Alt + S
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        handleSkip();
      }
      // Hint shortcut: Alt + H
      if (e.altKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        setShowHint((prev) => !prev);
        sounds.playPop();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip, isDeckModalOpen, isCustomTopicModalOpen]);

  // Audio toggle
  const toggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
    if (newState) sounds.playPop();
  };

  // Custom word addition into active deck
  const handleAddCustomWord = (e) => {
    e.preventDefault();
    const cleanWord = newWord.trim().toUpperCase().replace(/[^A-Z]/g, '');
    const cleanHint = newHint.trim();

    if (!cleanWord || cleanWord.length < 3) {
      alert('Word must be at least 3 letters long.');
      return;
    }
    if (!cleanHint) {
      alert('Please provide a hint for the word.');
      return;
    }

    const currentCatMeta = CATEGORIES.find(c => c.id === selectedCategory);
    const categoryLabel = customTopic ? `Custom: ${customTopic}` : (currentCatMeta?.name || 'Custom');

    const newWordItem = {
      word: cleanWord,
      hint: cleanHint,
      category: categoryLabel,
      difficulty: cleanWord.length <= 5 ? 'Easy' : cleanWord.length <= 8 ? 'Medium' : 'Hard',
      source: 'custom'
    };

    const updatedDeck = [newWordItem, ...wordList];
    setWordList(updatedDeck);
    setDeckOrder(prev => [0, ...prev.map(i => i + 1)]);
    setCurrentIndex(0);
    setNewWord('');
    setNewHint('');
    sounds.playSuccess();
    showToast(`Added "${cleanWord}" to current deck!`, 'info');
  };

  // Reset score and session stats
  const handleResetGame = () => {
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
    }
    setScore(0);
    setStreak(0);
    setWordsSolved(0);
    sounds.playPop();
    showToast('Score and streak reset to 0!', 'info');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const currentCategoryMeta = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];
  const difficultyClass = (currentWordItem.difficulty || 'Easy').toLowerCase();

  return (
    <>
      {/* Background ambient lighting */}
      <div className="bg-decor" aria-hidden="true">
        <div className="decor-orb-1"></div>
        <div className="decor-orb-2"></div>
      </div>

      <main className="app-container">
        {/* Top Header */}
        <header className="game-header">
          <div className="brand-wrapper">
            <div className="brand-logo-badge" title="Jumble Rush">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="8" height="8" rx="2" />
                <rect x="14" y="2" width="8" height="8" rx="2" />
                <rect x="2" y="14" width="8" height="8" rx="2" />
                <path d="M14 18h8" />
                <path d="M18 14v8" />
              </svg>
            </div>
            <div>
              <h1 className="brand-title">JUMBLE RUSH</h1>
              <span className="brand-subtitle">Vocabulary Arcade</span>
            </div>
          </div>

          <div className="header-controls">
            <button
              type="button"
              className={`icon-btn ${soundEnabled ? 'active' : ''}`}
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              )}
              <span className="btn-label">{soundEnabled ? 'SFX ON' : 'MUTED'}</span>
            </button>

            <button
              type="button"
              id="reset-score-btn"
              className="icon-btn"
              onClick={handleResetGame}
              title="Reset current score and streak"
              aria-label="Reset current score"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span className="btn-label">RESET</span>
            </button>
          </div>
        </header>

        {/* Stats Ribbon */}
        <section className="stats-ribbon" aria-label="Game Stats">
          <div className="stat-card stat-score">
            <span className="stat-label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Score
            </span>
            <span className="stat-value">{score}</span>
          </div>

          <div className="stat-card stat-streak">
            <span className="stat-label">
              <span className="streak-flame">🔥</span> Streak
            </span>
            <span className={`stat-value ${streak > 0 ? 'streak-active' : ''}`}>
              {streak}
            </span>
          </div>

          <div className="stat-card stat-best">
            <span className="stat-label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
                <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              Best
            </span>
            <span className="stat-value">{highScore}</span>
          </div>

          <div className="stat-card stat-solved">
            <span className="stat-label">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Solved
            </span>
            <span className="stat-value">{wordsSolved}</span>
          </div>
        </section>

        {/* Deck Category & Source Control Panel */}
        <section className="deck-control-panel" aria-label="Category Selection">
          {/* Scrollable Category Pill Selector */}
          <div className="category-nav-wrapper">
            <div className="category-scroll-strip" role="tablist" aria-label="Word Categories">
              {CATEGORIES.map((cat) => {
                const isActive = !customTopic && selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`category-pill ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectCategory(cat.id)}
                    title={cat.tagline}
                  >
                    <span className="category-pill-icon">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}

              {/* Custom Topic Generator Pill */}
              <button
                type="button"
                className={`category-pill custom-pill ${customTopic ? 'active' : ''}`}
                onClick={() => {
                  sounds.playPop();
                  setIsCustomTopicModalOpen(true);
                }}
                title="Search any topic via Datamuse API"
              >
                <span className="category-pill-icon">✨</span>
                <span>{customTopic ? `Topic: ${customTopic}` : '+ Explore Topic'}</span>
              </button>
            </div>
          </div>

          {/* Source Mode Toolbar (Datamuse vs Curated) */}
          <div className="source-toolbar">
            <div className="source-toggle-group">
              <button
                type="button"
                className={`source-toggle-btn ${sourceMode === 'datamuse' ? 'active' : ''}`}
                onClick={() => handleToggleSourceMode('datamuse')}
                title="Fetch dynamic words and definitions from Datamuse API"
              >
                <span className={`status-dot ${activeDeckSource.startsWith('datamuse') ? 'live' : 'fallback'}`}></span>
                <span>⚡ Datamuse Live</span>
              </button>

              <button
                type="button"
                className={`source-toggle-btn ${sourceMode === 'curated' && !customTopic ? 'active' : ''}`}
                onClick={() => handleToggleSourceMode('curated')}
                title="Use offline hand-crafted vocabulary deck"
              >
                <span className="status-dot curated"></span>
                <span>💎 Curated Deck</span>
              </button>
            </div>

            <div className="source-toolbar-actions">
              {sourceMode === 'datamuse' && (
                <button
                  type="button"
                  className="refresh-deck-btn"
                  onClick={handleRefreshDatamuse}
                  disabled={isLoadingDeck || isRefreshing}
                  title="Fetch a fresh batch of words from Datamuse"
                >
                  <svg
                    className={isRefreshing ? 'spin' : ''}
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                  </svg>
                  <span>{isRefreshing ? 'Fetching...' : 'New Batch'}</span>
                </button>
              )}

              <span className="datamuse-attribution-badge">
                Source: <a href="https://www.datamuse.com/api/" target="_blank" rel="noopener noreferrer">Datamuse</a>
              </span>
            </div>
          </div>
        </section>

        {/* Toast feedback banner */}
        {toastNotice && (
          <div className={`toast-notice ${toastNotice.type}`} role="status">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>{toastNotice.message}</span>
          </div>
        )}

        {/* Main Interactive Game Card */}
        <section className={`game-card ${isShaking ? 'card-shake' : ''} ${feedback?.type === 'success' ? 'card-success' : ''}`}>
          {isLoadingDeck ? (
            <div className="deck-loading-overlay">
              <div className="deck-loading-spinner"></div>
              <div className="deck-loading-title">Connecting to Datamuse...</div>
              <div className="deck-loading-subtitle">
                Generating vocabulary deck for {customTopic ? `"${customTopic}"` : currentCategoryMeta.name}
              </div>
            </div>
          ) : (
            <>
              {/* Card Meta Bar */}
              <div className="card-meta-bar">
                <div className="meta-tags">
                  <span className={`meta-tag tag-difficulty ${difficultyClass}`}>
                    {currentWordItem.difficulty || 'Normal'}
                  </span>
                  <span className="meta-tag tag-category">
                    {customTopic ? `Topic: ${customTopic}` : currentWordItem.category || currentCategoryMeta.name}
                  </span>
                  <span className={`meta-tag tag-source ${activeDeckSource === 'curated' ? 'curated' : ''}`}>
                    {activeDeckSource === 'curated' ? '💎 Curated' : activeDeckSource === 'curated-fallback' ? '⚠️ Curated Fallback' : '⚡ Datamuse'}
                  </span>
                  <span className="meta-tag">
                    {currentWordItem.word.length} Letters
                  </span>
                </div>

                <button
                  type="button"
                  className="reshuffle-action-btn"
                  onClick={handleReshuffle}
                  title="Shuffle letters permutation"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
                    <path d="m18 2 4 4-4 4" />
                    <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
                    <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
                    <path d="m18 14 4 4-4 4" />
                  </svg>
                  Reshuffle
                </button>
              </div>

              {/* Elevated Scrambled Letter Tiles */}
              <div className="tiles-display-zone">
                <div className="tiles-wrapper" aria-label={`Scrambled word: ${scrambled}`}>
                  {scrambled.split('').map((char, index) => (
                    <div
                      key={`${currentIndex}-${index}-${char}`}
                      className={`letter-tile ${feedback?.type === 'success' ? 'tile-solved' : ''}`}
                      style={{ animationDelay: `${index * 0.04}s` }}
                    >
                      {char}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hint System */}
              <div className="hint-container">
                {!showHint ? (
                  <button
                    type="button"
                    className="hint-trigger-btn"
                    onClick={() => {
                      sounds.playPop();
                      setShowHint(true);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                    </svg>
                    Need a hint?
                  </button>
                ) : (
                  <div className="hint-box" role="status">
                    <div className="hint-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    </div>
                    <div>
                      <div className="hint-heading">Hint / Definition</div>
                      <p className="hint-text">{currentWordItem.hint}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Guess Form */}
              <form className="guess-form" onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <input
                    ref={inputRef}
                    type="text"
                    id="word-guess-input"
                    className="guess-input"
                    placeholder="Type your guess..."
                    value={guess}
                    disabled={isAdvancing}
                    onChange={(e) => {
                      setGuess(e.target.value);
                      if (feedback?.type === 'error') {
                        setFeedback(null);
                      }
                    }}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="characters"
                    spellCheck="false"
                  />
                  {guess && !isAdvancing && (
                    <button
                      type="button"
                      className="input-clear-btn"
                      onClick={() => {
                        setGuess('');
                        if (inputRef.current) inputRef.current.focus();
                      }}
                      title="Clear input"
                      aria-label="Clear input"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    id="submit-guess-btn"
                    className="btn-primary"
                    disabled={isAdvancing || !guess.trim()}
                  >
                    <span>Submit Guess</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    id="skip-word-btn"
                    className="btn-secondary"
                    onClick={handleSkip}
                    disabled={isAdvancing}
                    title="Skip to next word (No penalty)"
                  >
                    <span>Skip Word</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 4 15 12 5 20 5 4" />
                      <line x1="19" y1="5" x2="19" y2="19" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Visual Feedback Message */}
              {feedback && (
                <div
                  className={`feedback-banner ${feedback.type}`}
                  role="alert"
                >
                  {feedback.type === 'success' ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feedback.message}</span>
                      <span className="score-popup-badge">+10 PTS</span>
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{feedback.message}</span>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </section>

        {/* Footer info & Word Deck management */}
        <footer className="footer-bar">
          <div className="shortcuts-legend">
            <span>Shortcuts:</span>
            <span><kbd className="kbd">Enter</kbd> Submit</span>
            <span><kbd className="kbd">Alt+S</kbd> Skip</span>
            <span><kbd className="kbd">Alt+H</kbd> Hint</span>
          </div>

          <button
            type="button"
            className="deck-link-btn"
            onClick={() => {
              sounds.playPop();
              setIsDeckModalOpen(true);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
            <span>
              {customTopic ? customTopic : currentCategoryMeta.name} Deck ({wordList.length} words)
            </span>
          </button>
        </footer>
      </main>

      {/* Custom Topic Generator Modal */}
      {isCustomTopicModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCustomTopicModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <span>✨</span> Explore Any Topic via Datamuse
              </h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsCustomTopicModalOpen(false)}
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Type any subject, theme, or concept to generate an instant scrambled word deck powered by Datamuse API:
              </p>

              <form className="custom-topic-form" onSubmit={handleCustomTopicSubmit}>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="guess-input"
                    placeholder="e.g. Mythology, Dinosaurs, Robots, Ocean, Medieval..."
                    value={customTopicInput}
                    onChange={(e) => {
                      setCustomTopicInput(e.target.value);
                      if (customTopicError) setCustomTopicError(null);
                    }}
                    autoFocus
                  />
                </div>

                {customTopicError && (
                  <div className="custom-topic-error">
                    {customTopicError}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmittingCustomTopic || !customTopicInput.trim()}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {isSubmittingCustomTopic ? (
                    <>
                      <div className="deck-loading-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                      <span>Querying Datamuse...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Deck</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              <div style={{ marginTop: '1.25rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Popular Instant Topics:
                </span>
                <div className="custom-topic-presets">
                  {POPULAR_TOPICS.map((pt) => (
                    <button
                      key={pt.query}
                      type="button"
                      className="topic-chip"
                      disabled={isSubmittingCustomTopic}
                      onClick={() => handleSelectPresetTopic(pt.query)}
                    >
                      {pt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expandable Word Deck Modal */}
      {isDeckModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDeckModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                  <path d="M6 6h10" />
                  <path d="M6 10h10" />
                </svg>
                {customTopic ? `Topic: ${customTopic}` : currentCategoryMeta.name} Deck ({wordList.length})
              </h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsDeckModalOpen(false)}
                aria-label="Close modal"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              {/* Category Quick Selector inside Modal */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Switch Category Deck:
                </span>
                <div className="custom-topic-presets" style={{ marginTop: '0.4rem', marginBottom: '0.5rem' }}>
                  {CATEGORIES.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      className={`topic-chip ${!customTopic && selectedCategory === c.id ? 'active' : ''}`}
                      style={{
                        background: (!customTopic && selectedCategory === c.id) ? 'rgba(56, 189, 248, 0.25)' : undefined,
                        color: (!customTopic && selectedCategory === c.id) ? 'var(--accent-cyan)' : undefined,
                        borderColor: (!customTopic && selectedCategory === c.id) ? 'var(--accent-cyan)' : undefined
                      }}
                      onClick={() => handleSelectCategory(c.id)}
                    >
                      {c.icon} {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Custom Word Form */}
              <form className="deck-add-form" onSubmit={handleAddCustomWord}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                  + Add Custom Word to Current Deck:
                </span>
                <div className="deck-add-row">
                  <input
                    type="text"
                    className="deck-input"
                    placeholder="Word (e.g. NEURON)"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value.toUpperCase())}
                    maxLength={15}
                  />
                  <input
                    type="text"
                    className="deck-input"
                    placeholder="Hint / Definition..."
                    value={newHint}
                    onChange={(e) => setNewHint(e.target.value)}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}>
                    Add
                  </button>
                </div>
              </form>

              {/* List of current words */}
              <div className="deck-list">
                {wordList.map((item, idx) => (
                  <div key={idx} className="deck-item">
                    <span className="deck-item-word">{item.word}</span>
                    <span className="deck-item-hint">{item.hint}</span>
                    <span className={`meta-tag tag-difficulty ${(item.difficulty || 'Easy').toLowerCase()}`} style={{ marginLeft: '0.5rem' }}>
                      {item.difficulty || 'Normal'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
