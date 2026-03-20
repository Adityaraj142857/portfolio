import { useState } from 'react'
import { GameProvider, useGame } from './context/GameContext'
import { ThemeProvider }         from './context/ThemeContext'
import { useScrollAnimation }    from './hooks/useScrollAnimation'
import { useMarioScore }         from './hooks/useMarioScore'

import LoadingScreen       from './components/ui/LoadingScreen'
import TitleScreen         from './components/sections/TitleScreen'
import ToastContainer      from './components/ui/Toast'
import ScorePopupContainer from './components/ui/ScorePopup'
import Navbar              from './components/layout/Navbar'
import Footer              from './components/layout/Footer'
import MarioCharacter      from './components/layout/MarioCharacter'
import PixelTransition     from './components/effects/PixelTransition'

import Overview        from './components/sections/Overview'
import Education       from './components/sections/Education'
import Projects        from './components/sections/Projects'
import Achievements    from './components/sections/Achievements'
import Responsibility  from './components/sections/Responsibility'
import Hobbies         from './components/sections/Hobbies'

/* ─────────────────────────────────────────────
   ScrollAnimationMount
   Only rendered AFTER sections are in the DOM.
   This guarantees useScrollAnimation finds real
   .reveal elements when it runs.
   ───────────────────────────────────────────── */
function ScrollAnimationMount() {
  useScrollAnimation()
  return null
}

/* ─────────────────────────────────────────────
   AppInner
   ───────────────────────────────────────────── */
function AppInner() {
  const { isLoading, activeSection } = useGame()
  const [showTitle, setShowTitle]    = useState(true)

  useMarioScore()

  /* 1 ── Loading screen */
  if (isLoading) return <LoadingScreen />

  /* 2 ── Title / press-start screen */
  if (showTitle) {
    return (
      <>
        <TitleScreen onEnter={() => setShowTitle(false)} />
        <ScorePopupContainer />
      </>
    )
  }

  /* 3 ── Full portfolio */
  return (
    <PixelTransition trigger={activeSection} cols={12} rows={7} duration={480}>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Navbar />

        <main>
          <section id="overview">       <Overview />      </section>
          <section id="education">      <Education />     </section>
          <section id="projects">       <Projects />      </section>
          <section id="achievements">   <Achievements />  </section>
          <section id="responsibility"> <Responsibility /></section>
          <section id="hobbies">        <Hobbies />       </section>
        </main>

        <Footer />
        <MarioCharacter />
      </div>

      {/* Mount scroll animation AFTER sections are in the DOM */}
      <ScrollAnimationMount />

      <ToastContainer />
      <ScorePopupContainer />
    </PixelTransition>
  )
}

/* ─────────────────────────────────────────────
   Root
   ───────────────────────────────────────────── */
export default function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <AppInner />
      </GameProvider>
    </ThemeProvider>
  )
}