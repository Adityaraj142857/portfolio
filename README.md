# 🍄 Mario Portfolio — Aditya Raj Shukla

> A Super Mario Bros–themed interactive developer portfolio built with React 18 + Vite. Explore 6 worlds, collect coins, unlock achievements, and meet Mario along the way.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎮 Live Demo

**[adityarajshukla.vercel.app](https://adityarajshukla.vercel.app)** ← *(update after deploy)*

---

## ✨ Features

- 🎮 **Full Mario HUD** — score, coins, lives, world indicator, hi-score (localStorage)
- 🗺️ **Interactive World Map** — click any world node to warp to that section
- 🍄 **Loading screen** — bouncing Mario sprite with animated progress bar
- 🎬 **Title screen** — PRESS START to enter the portfolio
- 🪙 **Collectible coins** — click Mario, hit ? blocks, flip project cards
- 🏆 **Achievement system** — 6 lockable badges with rarity tiers (LEGENDARY / EPIC / RARE / COMMON)
- 🎵 **Sound system** — 8 Web Audio sound effects (coin, jump, powerup, etc.)
- 🚶 **Walking Mario Easter egg** — appears every ~20s, press ↑ or click to jump
- 📊 **Portfolio progress bar** — tracks sections visited, badges unlocked, coins collected
- 🌍 **6 themed worlds** — each section has a unique Mario world parallax background
- 📱 **Responsive** — mobile hamburger menu, desktop full nav
- ⚡ **Zero npm dependencies** beyond React + React DOM

---

## 🗂️ Folder Structure

```
mario-portfolio/
│
├── index.html                         ← Page title + favicon link
├── package.json                       ← Only react + react-dom
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                        ← Vercel deploy config + cache headers
├── extract_mario_sprites.py           ← Sprite cutter script
│
├── public/
│   ├── resume.pdf                     ← YOUR RESUME (add this!)
│   ├── _redirects                     ← Netlify SPA redirect
│   ├── sounds/
│   │   ├── coin.mp3
│   │   ├── jump.mp3
│   │   ├── powerup.mp3
│   │   ├── block.mp3
│   │   ├── pipe.mp3
│   │   ├── stage-clear.mp3
│   │   ├── game-over.mp3
│   │   └── bg-music.mp3
│   └── sprites/
│       ├── mario-idle.png             ← Standing Mario
│       ├── mario-jump.png             ← Jumping Mario
│       ├── mario-walk.gif             ← Walking Mario (animated)
│       ├── mushroom.svg               ← Favicon 🍄
│       └── world-map.png              ← World map background texture
│
└── src/
    ├── App.jsx                        ← Root: Loading → Title → Portfolio
    ├── main.jsx                       ← React entry + ErrorBoundary
    ├── index.css                      ← All animations + global styles
    │
    ├── context/
    │   ├── GameContext.jsx            ← Score, coins, lives, achievements, sound
    │   └── ThemeContext.jsx
    │
    ├── hooks/
    │   ├── useSound.js                ← Play sound effects
    │   ├── useScrollAnimation.js      ← IntersectionObserver + MutationObserver
    │   └── useMarioScore.js           ← Score points on scroll
    │
    ├── utils/
    │   ├── constants.js               ← WORLDS array, world metadata
    │   └── soundManager.js            ← HTML Audio sound engine
    │
    └── components/
        ├── layout/
        │   ├── Navbar.jsx             ← HUD bar + nav links + sound toggle
        │   ├── Footer.jsx             ← GAME CLEAR stats + social links
        │   ├── WorldMap.jsx           ← Clickable overworld map
        │   └── MarioCharacter.jsx     ← Walking Easter egg (↑ to jump)
        │
        ├── sections/
        │   ├── TitleScreen.jsx        ← PRESS START screen
        │   ├── Overview.jsx           ← World 0-0: hero + world map + stats
        │   ├── Education.jsx          ← World 1-1: ? blocks + skill bars
        │   ├── Projects.jsx           ← World 2-1: flip cards + filters
        │   ├── Achievements.jsx       ← World 3-1: lockable badges
        │   ├── Responsibility.jsx     ← World 4-1: flagpole cards
        │   └── Hobbies.jsx            ← World 5-1: star power cards
        │
        ├── effects/
        │   ├── ParallaxBackground.jsx ← 5 themes (sky/underground/castle/star/grass)
        │   ├── FloatingCoins.jsx      ← Ambient background coins
        │   ├── CoinBurst.jsx          ← Particle burst on interactions
        │   └── PixelTransition.jsx    ← Wrapper (transition disabled to prevent black flash)
        │
        └── ui/
            ├── LoadingScreen.jsx      ← Mario bounce + progress bar
            ├── Toast.jsx              ← Achievement notifications
            ├── ProgressBar.jsx        ← Portfolio completion %
            ├── ScoreBoard.jsx         ← HUD score/coins/lives/world
            ├── ScorePopup.jsx         ← Floating +pts numbers
            ├── SoundToggle.jsx        ← 🔇/🔊 button
            ├── Modal.jsx
            ├── BrickBlock.jsx
            ├── CoinCounter.jsx
            └── WarpPipe.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Adityaraj142857/portfolio.git
cd portfolio

# 2. Install dependencies (only react + react-dom — takes ~10 seconds)
npm install

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

### Other Commands

```bash
npm run build     # production build  → dist/
npm run preview   # preview build     → localhost:4173
```

---

## 🔊 Sound Setup

Download and place in `public/sounds/`. All files optional — site works without them.

| Filename | Download from |
|----------|--------------|
| `coin.mp3` | [themushroomkingdom.net](https://themushroomkingdom.net/media/smb/wav) → smb_coin.wav |
| `jump.mp3` | Same → smb_jump-small.wav |
| `powerup.mp3` | Same → smb_powerup.wav |
| `block.mp3` | Same → smb_breakblock.wav |
| `pipe.mp3` | Same → smb_pipe.wav |
| `stage-clear.mp3` | Same → smb_stage_clear.wav |
| `game-over.mp3` | Same → smb_gameover.wav |
| `bg-music.mp3` | [archive.org](https://archive.org) → Mario overworld theme |

> Rename `.wav` → `.mp3` after downloading. Click the **🔇 button** in the navbar to enable sound (browser autoplay policy requires a user click first).

---

## 🖼️ Sprite Setup

Extract Mario sprites from the NES sprite sheet using the included Python script:

```bash
# 1. Install Pillow
pip install Pillow

# 2. Put sprite sheet in same folder as the script
#    Sheet name: NES_-_Super_Mario_Bros__-_Playable_Characters_-_Mario___Luigi.png
#    Download:   https://www.spriters-resource.com/nes/supermariobros/

# 3. Run
python extract_mario_sprites.py

# 4. Copy the 3 output files
#    output_sprites/mario-idle.png  →  public/sprites/mario-idle.png
#    output_sprites/mario-jump.png  →  public/sprites/mario-jump.png
#    output_sprites/mario-walk.gif  →  public/sprites/mario-walk.gif
```

> All sprites have SVG fallbacks built in — the site works without them.

---

## ✏️ Personalisation

All personal data is at the **top of each section file**. Never edit below the data array.

| File | Find this | What to change |
|------|-----------|----------------|
| `src/components/sections/TitleScreen.jsx` | `const PLAYER_NAME` | Name, title, class, level |
| `src/components/sections/Overview.jsx` | `ADITYA RAJ SHUKLA` | Hero name, tagline, stat chips, email |
| `src/components/sections/Education.jsx` | `const EDUCATION = [` | Degrees, institutions, grades, skills |
| `src/components/sections/Projects.jsx` | `const PROJECTS = [` | Projects, GitHub links, demo links |
| `src/components/sections/Achievements.jsx` | `const ACHIEVEMENTS = [` | Awards, certs, badges |
| `src/components/sections/Responsibility.jsx` | `const ROLES = [` | Jobs, internships, positions |
| `src/components/sections/Hobbies.jsx` | `const HOBBIES = [` | Hobbies, levels, descriptions |
| `src/components/layout/Footer.jsx` | `SocialBtn` blocks | GitHub, LinkedIn, Email, Resume links |
| `index.html` | `<title>` | Browser tab title |

### ⚠️ Rules to Avoid Crashes

```js
// Achievements rarity — must be EXACTLY one of these 4 strings:
rarity: 'LEGENDARY'   // ✅
rarity: 'EPIC'        // ✅
rarity: 'RARE'        // ✅
rarity: 'COMMON'      // ✅
rarity: 'UNCOMMON'    // ❌ crashes — not in RARITY_STYLES

// Email href — must include mailto:
href: 'mailto:you@email.com'   // ✅
href: 'you@email.com'          // ❌ opens blank page

// Data array names — keep exactly as-is
const EDUCATION = [   // ✅
const education = [   // ❌ crashes — component uses EDUCATION
```

---

## 🎮 Interactive Features

| Feature | How to trigger |
|---------|----------------|
| Collect coin | Click Mario on Overview or TitleScreen |
| Reveal skill bars | Hit ? blocks in Education |
| See project details | Click any project card to flip it |
| Unlock achievement | Click any locked 🔒 badge |
| Raise the flag | Click any role card in Responsibility |
| Star power | Click any hobby card |
| Walking Mario | Appears every ~20s at the bottom of screen |
| Mario jump | Press **↑ arrow key** or click him |
| Sound on/off | Click **🔇** in top-right navbar |
| Warp to section | Click any node on the World Map |

---

## 🌐 Deployment

### Option A — Vercel (Recommended)

```bash
npm install -g vercel   # install once
cd portfolio
vercel                  # follow prompts (all defaults)
vercel --prod           # promote to production
```

URL: `https://portfolio-adityaraj142857.vercel.app`

### Option B — Netlify (Drag & drop)

```bash
npm run build
# Go to https://app.netlify.com/drop
# Drag the dist/ folder onto the page
```

### Option C — GitHub Pages

```bash
# Add to package.json:
# "homepage": "https://Adityaraj142857.github.io/portfolio"
# "scripts": { "deploy": "gh-pages -d dist" }

npm install --save-dev gh-pages
npm run build
npm run deploy
```

### Pre-deploy Checklist

```
✅ public/resume.pdf exists
✅ public/sounds/ has all 8 MP3 files
✅ public/sprites/ has mario-idle.png, mario-jump.png, mario-walk.gif
✅ All personal data updated in section files
✅ Footer social links updated (GitHub, LinkedIn, Email)
✅ index.html <title> updated
✅ npm run build completes with no errors
✅ npm run preview looks correct at localhost:4173
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18 | UI framework |
| Vite | 5 | Build tool + dev server |
| Tailwind CSS | 3 | Utility styling |
| Web Audio API | — | Sound system (zero deps) |
| IntersectionObserver | — | Scroll reveal animations |
| MutationObserver | — | Dynamic element detection |
| CSS Keyframes | — | All Mario animations |
| localStorage | — | Hi-score persistence |

**Zero external runtime dependencies** — only `react` and `react-dom` in production.

---

## 🐛 Troubleshooting

| Problem | Fix |
|---------|-----|
| White/blank screen | Check browser console → usually missing import or bad data array |
| All content invisible (opacity: 0) | Hard refresh `Cmd+Shift+R` — `useScrollAnimation` didn't initialise |
| Sound not working | Click 🔇 button first — browsers block autoplay until user interaction |
| `EDUCATION is not defined` | You renamed `const EDUCATION` — keep the exact variable name |
| `Cannot read 'bg' of undefined` | Invalid `rarity` in Achievements — must be `LEGENDARY/EPIC/RARE/COMMON` |
| Mario moonwalking | Walk GIF faces right — never apply `scaleX(-1)` flip to it |
| Black screen while scrolling | `PixelTransition` firing on scroll — keep the disabled version |
| `@apply` CSS warnings in VS Code | Add `.vscode/settings.json` → `"css.validate": false` |
| Contact button not working | Email href must start with `mailto:` |

---

## 📄 License

MIT — free to use, modify, and deploy for personal or commercial use.

> Not affiliated with Nintendo. Super Mario Bros is a trademark of Nintendo Co., Ltd.

---

## 🙏 Credits

- Sprite sheet: [The Spriters Resource](https://www.spriters-resource.com)
- Sound effects: [The Mushroom Kingdom](https://themushroomkingdom.net)
- Font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) by CodeMan38
- World map texture: [Transparent Textures](https://www.transparenttextures.com)

---

<div align="center">

**Built with ❤️ and ☕ by Aditya Raj Shukla**

🍄 *GAME CLEAR!* 🍄

*If this helped you, consider leaving a ⭐ on GitHub!*

</div>