/* ── World / Section mapping ── */
export const WORLDS = [
  {
    id:       'overview',
    world:    'WORLD 0-0',
    label:    'OVERVIEW',
    emoji:    '🗺️',
    theme:    'sky',
    bgClass:  'bg-mario-sky',
    color:    '#5C94FC',
  },
  {
    id:       'education',
    world:    'WORLD 1-1',
    label:    'EDUCATION',
    emoji:    '📚',
    theme:    'grassland',
    bgClass:  'bg-mario-green',
    color:    '#43B047',
  },
  {
    id:       'projects',
    world:    'WORLD 2-1',
    label:    'PROJECTS',
    emoji:    '🔧',
    theme:    'underground',
    bgClass:  'bg-mario-underground',
    color:    '#000000',
  },
  {
    id:       'achievements',
    world:    'WORLD 3-1',
    label:    'ACHIEVEMENTS',
    emoji:    '🏆',
    theme:    'coin',
    bgClass:  'bg-mario-yellow',
    color:    '#FBD000',
  },
  {
    id:       'responsibility',
    world:    'WORLD 4-1',
    label:    'POSITIONS',
    emoji:    '🏰',
    theme:    'castle',
    bgClass:  'bg-mario-castle',
    color:    '#1a1a2e',
  },
  {
    id:       'hobbies',
    world:    'WORLD 5-1',
    label:    'HOBBIES',
    emoji:    '⭐',
    theme:    'star',
    bgClass:  'bg-mario-red',
    color:    '#E52521',
  },
]

/* ── Score values ── */
export const SCORE = {
  HOVER:     10,
  CLICK:     100,
  SECTION:   50,
  COIN:      200,
  ACHIEVEMENT: 500,
  BLOCK_HIT: 300,
}

/* ── Lives ── */
export const INITIAL_LIVES = 3

/* ── Mario color palette ── */
export const COLORS = {
  red:       '#E52521',
  blue:      '#049CD8',
  yellow:    '#FBD000',
  green:     '#43B047',
  brown:     '#8B4513',
  sky:       '#5C94FC',
  ground:    '#C84C0C',
  pipe:      '#2BA94C',
  brick:     '#C8440C',
  block:     '#F8B800',
  coin:      '#FFD700',
  night:     '#0D0D2B',
  white:     '#FFFFFF',
  black:     '#000000',
}

/* ── Breakpoints ── */
export const BP = {
  sm:  480,
  md:  768,
  lg:  1024,
  xl:  1280,
}