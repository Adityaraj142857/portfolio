# 🍄 Mario Portfolio — Complete Setup Guide

> A fully interactive Super Mario Bros–themed personal portfolio.
> Built with **React 18 + Vite + Tailwind CSS**.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Adding Your Assets](#adding-your-assets)
4. [Personalise Your Data](#personalise-your-data)
5. [Running Locally](#running-locally)
6. [Building for Production](#building-for-production)
7. [Deploying](#deploying)
8. [Folder Structure](#folder-structure)
9. [Interactive Features](#interactive-features)
10. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

Make sure you have these installed **before** starting:

| Tool         | Minimum version | Check with         |
|--------------|-----------------|--------------------|
| Node.js      | 18.x or higher  | `node -v`          |
| npm          | 9.x or higher   | `npm -v`           |
| Git          | any             | `git --version`    |

> **Download Node.js:** https://nodejs.org (choose the LTS version)

---

## 2. Project Setup

```bash
# Step 1 — Clone or copy the project into a folder
git clone https://github.com/yourusername/mario-portfolio.git
# OR just copy the downloaded folder and open a terminal inside it

# Step 2 — Go into the project folder
cd mario-portfolio

# Step 3 — Install all dependencies (takes ~30 seconds)
npm install
```

After `npm install` you will see a `node_modules/` folder appear. That is normal.

---

## 3. Adding Your Assets

The project works **without assets** (sounds/images are optional — the site
won't crash if they are missing). But to get the full experience, add these files:

### 🔊 Sound Effects — place in `public/sounds/`

Create the folder `public/sounds/` and add these MP3 files:

| Filename           | What it does            | Download from                                      |
|--------------------|-------------------------|----------------------------------------------------|
| `coin.mp3`         | Coin collect sound      | https://pixabay.com/sound-effects/search/mario/    |
| `jump.mp3`         | Jump sound              | Same                                               |
| `powerup.mp3`      | Power-up / badge unlock | Same                                               |
| `stage-clear.mp3`  | Level complete jingle   | https://themushroomkingdom.net/media/smb/wav        |
| `game-over.mp3`    | Game-over tune          | Same                                               |
| `pipe.mp3`         | Warp pipe whoosh        | https://pixabay.com/sound-effects/search/mario/    |
| `block.mp3`        | Hit ? block sound       | Same                                               |
| `bg-music.mp3`     | Background music (loop) | https://www.fesliyanstudios.com/royalty-free-music/downloads-c/8-bit-music/6 |

```
public/
└── sounds/
    ├── coin.mp3
    ├── jump.mp3
    ├── powerup.mp3
    ├── stage-clear.mp3
    ├── game-over.mp3
    ├── pipe.mp3
    ├── block.mp3
    └── bg-music.mp3
```

### 🖼️ Sprites — place in `public/sprites/`

These are all optional decorative images:

| Filename          | Used for                     | Download from                                   |
|-------------------|------------------------------|-------------------------------------------------|
| `world-map.png`   | Background texture on map    | https://www.spriters-resource.com/nes/supermariobros/ |
| `mushroom.svg`    | Browser tab favicon          | Draw a simple red mushroom SVG, or skip          |

```
public/
└── sprites/
    ├── world-map.png   (optional)
    └── mushroom.svg    (optional — used as favicon)
```

> **No assets? No problem.** The site loads and runs fine without any of these.
> Sounds simply won't play and placeholder backgrounds will be used.

---

## 4. Personalise Your Data

### 4a. Your name and title

Open `src/components/sections/TitleScreen.jsx` and edit lines 11–14:

```js
const PLAYER_NAME  = 'YOUR NAME'           // ← your full name
const PLAYER_TITLE = 'DEVELOPER · BUILDER' // ← your tagline
const PLAYER_CLASS = 'FULL STACK DEV'      // ← your role/class
const PLAYER_LEVEL = 'LVL 4'              // ← experience level
```

Open `src/components/sections/Overview.jsx` and change:
- `YOUR NAME` (line ~115) → your name
- The four `StatChip` values → your real numbers

### 4b. Education

Open `src/components/sections/Education.jsx`, find `const EDUCATION = [` and
replace the three objects with your real degrees.

### 4c. Projects

Open `src/components/sections/Projects.jsx`, find `const PROJECTS = [` and
replace the six objects. Each project has:
```js
{
  id:       1,
  title:    'PROJECT NAME',
  subtitle: 'Short description',
  tech:     ['React', 'Node.js'],   // tech tags
  emoji:    '🤖',
  color:    '#049CD8',
  github:   'https://github.com/you/repo',
  demo:     'https://your-demo.com',  // or null
  desc:     'Longer description shown on card flip.',
  stars:    42,                       // GitHub stars
  category: 'Web',                    // filter category
}
```

### 4d. Achievements, Positions, Hobbies

Same pattern — find the data array at the top of each file and replace
with your own entries.

### 4e. Social links in Footer

Open `src/components/layout/Footer.jsx` and update the `SocialBtn` hrefs:

```jsx
<SocialBtn label="GITHUB"   href="https://github.com/YOURUSERNAME" />
<SocialBtn label="LINKEDIN" href="https://linkedin.com/in/YOURPROFILE" />
<SocialBtn label="EMAIL"    href="mailto:YOUR@EMAIL.COM" />
<SocialBtn label="RESUME"   href="/resume.pdf" />
```

> Drop your `resume.pdf` into the `public/` folder so that link works.

---

## 5. Running Locally

```bash
# Start the development server
npm run dev
```

This will print something like:

```
  VITE v5.x.x  ready in 800ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```

Open **http://localhost:3000** in your browser.

**Hot reload is enabled** — any change you save instantly updates in the browser.

### What you'll see on first load

```
[Black screen]  →  Loading screen (2.5s)
                →  Title screen "MARIO PORTFOLIO" (press Space / Enter / click)
                →  Portfolio with all 6 world sections
```

---

## 6. Building for Production

```bash
# Create optimised production build
npm run build
```

Output goes to the `dist/` folder. The build:
- Minifies all JS and CSS
- Splits code into vendor chunks (React, Howler, etc.) for fast caching
- Hashes all filenames for cache-busting

```bash
# Preview the production build locally before deploying
npm run preview
# Opens at http://localhost:4173
```

---

## 7. Deploying

### Option A — GitHub Pages (free, easiest)

```bash
# 1. Create a repo on GitHub, push your code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOURUSERNAME/mario-portfolio.git
git push -u origin main

# 2. Add homepage to package.json  (replace with your actual URL)
#    "homepage": "https://YOURUSERNAME.github.io/mario-portfolio"

# 3. One command deploy
npm run deploy
```

The site will be live at: `https://YOURUSERNAME.github.io/mario-portfolio`

---

### Option B — Vercel (recommended for custom domain)

```bash
# Install Vercel CLI once
npm install -g vercel

# Deploy (follow the prompts — say YES to all defaults)
vercel

# For production deploy
vercel --prod
```

Your site gets a free `*.vercel.app` URL instantly.

---

### Option C — Netlify (drag and drop)

```bash
# Build first
npm run build

# Then drag the  dist/  folder to https://app.netlify.com/drop
```

Done. No CLI needed.

---

### Option D — Any static host

Upload the contents of `dist/` to any web host (S3, Firebase Hosting,
Cloudflare Pages, etc.). It's just static HTML + JS + CSS.

---

## 8. Folder Structure

```
mario-portfolio/
│
├── public/                        # Static assets served as-is
│   ├── sounds/                    # 🔊 MP3 sound effects
│   ├── sprites/                   # 🖼️ PNG/SVG sprites
│   └── resume.pdf                 # 📄 Your resume (optional)
│
├── src/
│   ├── App.jsx                    # Root component & routing
│   ├── main.jsx                   # ReactDOM entry point
│   ├── index.css                  # Global styles, keyframes, responsive
│   │
│   ├── context/
│   │   ├── GameContext.jsx        # Score, coins, lives, hi-score, timer
│   │   └── ThemeContext.jsx       # Day / Night toggle
│   │
│   ├── hooks/
│   │   ├── useSound.js            # Play sounds via context
│   │   ├── useScrollAnimation.js  # Reveal elements on scroll
│   │   └── useMarioScore.js       # Score++ as user scrolls
│   │
│   ├── utils/
│   │   ├── constants.js           # WORLDS array, colour palette, scores
│   │   └── soundManager.js        # Howler.js wrapper (graceful fallback)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx         # Fixed HUD with score, nav, theme toggle
│   │   │   ├── Footer.jsx         # Game-clear screen with stats
│   │   │   ├── WorldMap.jsx       # Clickable overworld map
│   │   │   └── MarioCharacter.jsx # Periodic walking Mario Easter egg
│   │   │
│   │   ├── sections/
│   │   │   ├── TitleScreen.jsx    # Animated intro / press-start screen
│   │   │   ├── Overview.jsx       # World Map + hero + stats
│   │   │   ├── Education.jsx      # World 1-1 — brick blocks + timeline
│   │   │   ├── Projects.jsx       # World 2-1 — flip cards + filter
│   │   │   ├── Achievements.jsx   # World 3-1 — badge unlock room
│   │   │   ├── Responsibility.jsx # World 4-1 — castle flagpole timeline
│   │   │   └── Hobbies.jsx        # World 5-1 — star-power cards
│   │   │
│   │   ├── ui/
│   │   │   ├── LoadingScreen.jsx  # Boot animation with progress bar
│   │   │   ├── Toast.jsx          # Achievement notification (bottom-right)
│   │   │   ├── Modal.jsx          # Pixel popup dialog
│   │   │   ├── ScoreBoard.jsx     # HUD score / coins / lives
│   │   │   ├── ScorePopup.jsx     # Floating +pts numbers
│   │   │   ├── ProgressBar.jsx    # Portfolio completion tracker
│   │   │   ├── SoundToggle.jsx    # Mute / unmute button
│   │   │   ├── CoinCounter.jsx    # Animated coin display widget
│   │   │   ├── BrickBlock.jsx     # Reusable ? block component
│   │   │   └── WarpPipe.jsx       # Reusable warp pipe nav component
│   │   │
│   │   └── effects/
│   │       ├── ParallaxBackground.jsx  # 5-theme layered parallax
│   │       ├── FloatingCoins.jsx       # Ambient coin particles
│   │       ├── CoinBurst.jsx           # Multi-directional coin explosion
│   │       └── PixelTransition.jsx     # Black-grid section wipe
│
├── .env.example                   # Environment variable template
├── index.html                     # HTML shell with Press Start 2P font
├── package.json                   # Dependencies & scripts
├── vite.config.js                 # Build config with chunk splitting
├── tailwind.config.js             # Mario colour palette + animations
└── postcss.config.js              # PostCSS for Tailwind
```

---

## 9. Interactive Features

| Feature                   | How to trigger                          |
|---------------------------|-----------------------------------------|
| **Loading screen**        | Auto-plays on first visit               |
| **Title screen**          | Press `Space` / `Enter` / click to enter|
| **Score counter**         | Increases automatically as you scroll  |
| **Coin collection**       | Click Mario on Overview or TitleScreen  |
| **? Block skill reveal**  | Click yellow ? blocks in Education      |
| **Project card flip**     | Click any project card                  |
| **Achievement badge**     | Click locked badges to unlock           |
| **Flag raise**            | Click role cards in Positions           |
| **Star power**            | Click hobby cards                       |
| **Day / Night toggle**    | Moon icon in top navbar                 |
| **Sound on / off**        | Speaker icon in top navbar              |
| **World map nav**         | Click nodes on the map in Overview      |
| **Walking Mario**         | Appears every ~30 s — click for coins  |
| **Pixel transition wipe** | Auto-fires when scrolling to new world  |
| **Toast notifications**   | Pop up when unlocking achievements      |
| **Score popups**          | Float up when score is earned           |
| **Progress bar**          | Bottom of mobile menu / footer          |
| **Hi-score**              | Saved to localStorage across visits     |

---

## 10. Troubleshooting

### `npm install` fails

```bash
# Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use

```bash
# Use a different port
npm run dev -- --port 3001
```

### Sounds not playing

- Make sure your MP3 files are in `public/sounds/` with **exact filenames**
- Click the 🔇 button in the navbar to enable audio
- Browsers require a user interaction before playing audio — this is normal

### White/blank screen in browser

Open DevTools (`F12`) → Console tab. Common causes:
- A JS syntax error in one of the section files
- Missing `export default` in a component
- Run `npm run build` — Vite will show the exact error with file and line number

### Build error: `Cannot find module`

```bash
# Check that all imports match exact file names (case-sensitive on Linux)
npm run build 2>&1 | head -30
```

### Deployed site shows blank page on Vercel/Netlify

Add a `vercel.json` or `_redirects` file for SPA routing:

**For Vercel** — create `vercel.json` in root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**For Netlify** — create `public/_redirects`:
```
/*  /index.html  200
```

---

## Quick Cheat Sheet

```bash
npm install        # install dependencies
npm run dev        # start dev server → http://localhost:3000
npm run build      # production build → dist/
npm run preview    # preview production build → http://localhost:4173
npm run deploy     # build + push to GitHub Pages
```

---

*© 2024 Mario Portfolio — Made with ❤️ and 🍄 mushrooms*
*Not affiliated with Nintendo. Super Mario is a trademark of Nintendo Co., Ltd.*
