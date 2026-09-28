import { CURATED_DECKS } from './words.js';

export const CATEGORIES = [
  {
    id: 'tech',
    name: 'Tech & Code',
    icon: '💻',
    tagline: 'Frontend, backend, DevOps & software engineering',
    query: 'ml=software+programming+computer&topics=technology',
    color: '#38bdf8'
  },
  {
    id: 'space',
    name: 'Space & Cosmos',
    icon: '🚀',
    tagline: 'Planets, galaxies, astronomy & cosmic phenomena',
    query: 'ml=space+astronomy+galaxy&topics=astronomy',
    color: '#818cf8'
  },
  {
    id: 'animals',
    name: 'Animals & Nature',
    icon: '🐾',
    tagline: 'Wildlife, mammals, ocean creatures & biodiversity',
    query: 'ml=animal+wildlife+species&topics=animals',
    color: '#34d399'
  },
  {
    id: 'food',
    name: 'Food & Culinary',
    icon: '🍕',
    tagline: 'Gastronomy, baking, ingredients & world cuisines',
    query: 'ml=food+cooking+cuisine&topics=culinary',
    color: '#fbbf24'
  },
  {
    id: 'science',
    name: 'Science & Physics',
    icon: '⚡',
    tagline: 'Physics, chemistry, molecules & laboratory laws',
    query: 'ml=physics+chemistry+science&topics=science',
    color: '#c084fc'
  },
  {
    id: 'sports',
    name: 'Sports & Games',
    icon: '🏆',
    tagline: 'Athletics, tournaments, stadiums & championships',
    query: 'ml=sports+athletics+tournament&topics=sports',
    color: '#f43f5e'
  },
  {
    id: 'geography',
    name: 'World & Travel',
    icon: '🌍',
    tagline: 'Continents, landforms, oceans & exploration',
    query: 'ml=geography+continent+landscape&topics=geography',
    color: '#38bdf8'
  },
  {
    id: 'art',
    name: 'Art & Music',
    icon: '🎨',
    tagline: 'Paintings, melodies, instruments & masterpieces',
    query: 'ml=painting+sculpture+music&topics=art',
    color: '#ec4899'
  }
];

const CACHE_PREFIX = 'jumble_rush_dm_cache_v2_';
const CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours cache validity

/**
 * Strips the secret word from the definition so the hint doesn't reveal the answer.
 */
function maskWordInHint(hint, word) {
  if (!hint || !word) return hint;
  // Replace direct appearances of word (singular/plural)
  const regex = new RegExp(`\\b${word}(?:s|es|ed|ing)?\\b`, 'gi');
  return hint.replace(regex, '____');
}

/**
 * Formats raw Datamuse definition into a clean, game-ready hint.
 */
export function cleanDefinition(rawDef, word, categoryName) {
  if (!rawDef) {
    return `A notable concept and recognized term in ${categoryName || 'this category'}.`;
  }

  // Datamuse definition format: "n\tdefinition text"
  let clean = rawDef.replace(/^[a-zA-Z]+\t/, '').trim();
  // Strip bracketed etymology/notes like "[A set of...]"
  clean = clean.replace(/\[.*?\]/g, '').trim();
  // Strip leading contextual tags like "(astronomy)" or "(medicine)"
  clean = clean.replace(/^\([^)]*\)\s*/, '').trim();

  // If definition is too short or is a music single/album, use fallback
  if (clean.length < 12 || /album|song|single by|band/i.test(clean)) {
    return `An essential term and subject associated with ${categoryName || 'this field'}.`;
  }

  // Capitalize first character
  clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  if (!clean.endsWith('.')) clean += '.';

  // Mask word from hint
  clean = maskWordInHint(clean, word);

  return clean;
}

/**
 * Parse and normalize Datamuse API items into game word objects
 */
function normalizeDatamuseItems(items, categoryName) {
  const seen = new Set();
  const words = [];

  for (const item of items) {
    const rawWord = (item.word || '').toUpperCase().trim();
    // Only accept single words of 4 to 10 alpha characters
    if (!/^[A-Z]{4,10}$/.test(rawWord) || seen.has(rawWord)) continue;
    seen.add(rawWord);

    let bestHint = '';
    if (Array.isArray(item.defs) && item.defs.length > 0) {
      for (const defStr of item.defs) {
        const candidate = cleanDefinition(defStr, rawWord, categoryName);
        if (candidate && candidate.length > 15) {
          bestHint = candidate;
          break;
        }
      }
    }

    if (!bestHint) {
      bestHint = cleanDefinition(null, rawWord, categoryName);
    }

    const difficulty = rawWord.length <= 5 ? 'Easy' : rawWord.length <= 7 ? 'Medium' : 'Hard';

    words.push({
      word: rawWord,
      hint: bestHint,
      category: categoryName,
      difficulty,
      source: 'datamuse'
    });

    if (words.length >= 35) break;
  }

  return words;
}

/**
 * Fetch words for a preset category from Datamuse API, with caching and curated fallback
 */
export async function fetchCategoryWords(categoryId, { forceRefresh = false } = {}) {
  const cat = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  const cacheKey = `${CACHE_PREFIX}${cat.id}`;

  // 1. Check localStorage Cache
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.words) && parsed.words.length >= 10) {
          return {
            success: true,
            source: 'datamuse-cache',
            words: parsed.words,
            category: cat
          };
        }
      }
    } catch (e) {
      // Ignore cache read errors
    }
  }

  // 2. Fetch from Datamuse API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

    const url = `https://api.datamuse.com/words?${cat.query}&md=d&max=60`;
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Datamuse API returned status ${response.status}`);
    }

    const data = await response.json();
    const cleanWords = normalizeDatamuseItems(data, cat.name);

    if (cleanWords.length < 12) {
      throw new Error('Not enough valid words returned from Datamuse API');
    }

    // Save to cache
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          timestamp: Date.now(),
          words: cleanWords
        })
      );
    } catch (e) {
      // Ignore cache write quota errors
    }

    return {
      success: true,
      source: 'datamuse-live',
      words: cleanWords,
      category: cat
    };
  } catch (err) {
    console.warn(`[Datamuse] Fetch failed for category "${cat.id}". Falling back to curated deck.`, err);

    // 3. Fallback to curated offline deck
    const fallbackDeck = (CURATED_DECKS[cat.id] || CURATED_DECKS.tech).map((item) => ({
      ...item,
      source: 'curated'
    }));

    return {
      success: true,
      source: 'curated-fallback',
      words: fallbackDeck,
      category: cat,
      errorNotice: 'Datamuse was unreachable; loaded curated offline deck.'
    };
  }
}

/**
 * Fetch words for an arbitrary custom topic typed by the user
 */
export async function fetchCustomTopicWords(topicQuery) {
  const cleanTopic = (topicQuery || '').trim();
  if (!cleanTopic) {
    throw new Error('Please enter a topic name.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  const encoded = encodeURIComponent(cleanTopic);
  const url = `https://api.datamuse.com/words?ml=${encoded}&topics=${encoded}&md=d&max=60`;

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Datamuse API returned status ${response.status}`);
    }

    const data = await response.json();
    let cleanWords = normalizeDatamuseItems(data, cleanTopic);

    // If query was too specific with 'topics', retry with just 'ml='
    if (cleanWords.length < 8) {
      const fallbackUrl = `https://api.datamuse.com/words?ml=${encoded}&md=d&max=60`;
      const fbResponse = await fetch(fallbackUrl);
      if (fbResponse.ok) {
        const fbData = await fbResponse.json();
        cleanWords = normalizeDatamuseItems(fbData, cleanTopic);
      }
    }

    if (cleanWords.length < 5) {
      throw new Error(`Could not find enough distinct words for topic "${cleanTopic}". Try another topic!`);
    }

    return {
      success: true,
      source: 'datamuse-custom',
      words: cleanWords,
      topicName: cleanTopic
    };
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}
