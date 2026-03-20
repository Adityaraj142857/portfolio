#!/bin/bash

# 1. Create Public subdirectories
mkdir -p public/sounds
mkdir -p public/sprites

# 2. Create Src subdirectories
mkdir -p src/assets/images
mkdir -p src/assets/fonts
mkdir -p src/components/layout
mkdir -p src/components/ui
mkdir -p src/components/sections
mkdir -p src/components/effects
mkdir -p src/hooks
mkdir -p src/context
mkdir -p src/data
mkdir -p src/styles
mkdir -p src/utils

# 3. Create placeholder files in Public (if they don't exist)
touch public/favicon.ico
touch public/sounds/coin.mp3 public/sounds/jump.mp3 public/sounds/powerup.mp3 public/sounds/stage-clear.mp3 public/sounds/bg-music.mp3
touch public/sprites/mario-walk.gif public/sprites/mario-idle.png public/sprites/mario-jump.png public/sprites/world-map.png

# 4. Create placeholder files in Src root
# Note: touch won't delete your code if these files already have content
touch src/main.jsx src/App.jsx src/index.css

# 5. Create Asset files
touch src/assets/images/clouds.png src/assets/images/ground-tiles.png src/assets/images/pipe.svg src/assets/images/brick.svg src/assets/images/coin.svg src/assets/images/star.svg src/assets/images/mushroom.svg src/assets/images/castle.svg

# 6. Create Component files
touch src/components/layout/Navbar.jsx src/components/layout/Footer.jsx src/components/layout/WorldMap.jsx src/components/layout/MarioCharacter.jsx
touch src/components/ui/CoinCounter.jsx src/components/ui/BrickBlock.jsx src/components/ui/WarpPipe.jsx src/components/ui/ProgressBar.jsx src/components/ui/ScoreBoard.jsx src/components/ui/SoundToggle.jsx src/components/ui/LoadingScreen.jsx src/components/ui/Modal.jsx
touch src/components/sections/TitleScreen.jsx src/components/sections/Overview.jsx src/components/sections/Education.jsx src/components/sections/Projects.jsx src/components/sections/Achievements.jsx src/components/sections/Responsibility.jsx src/components/sections/Hobbies.jsx
touch src/components/effects/ParallaxBackground.jsx src/components/effects/CoinBurst.jsx src/components/effects/PixelTransition.jsx src/components/effects/FloatingCoins.jsx

# 7. Create Hook files
touch src/hooks/useSound.js src/hooks/useScrollAnimation.js src/hooks/useMarioScore.js src/hooks/useParallax.js

# 8. Create Context files
touch src/context/GameContext.jsx src/context/ThemeContext.jsx

# 9. Create Data files
touch src/data/overview.js src/data/education.js src/data/projects.js src/data/achievements.js src/data/responsibilities.js src/data/hobbies.js

# 10. Create Style files
touch src/styles/animations.css src/styles/mario-theme.css src/styles/parallax.css

# 11. Create Util files
touch src/utils/soundManager.js src/utils/scoreCalculator.js src/utils/constants.js

echo "🌟 All Mario World subfolders and files have been generated!"