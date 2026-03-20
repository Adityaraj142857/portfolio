/**
 * Navbar.jsx — Fixed
 * - Removed day/night toggle (was wired to nothing visual)
 * - Sound toggle always visible with flexShrink:0
 * - Hamburger only on mobile, desktop nav clips gracefully
 */
import { useEffect, useState } from 'react'
import { useGame }   from '../../context/GameContext'
import ScoreBoard    from '../ui/ScoreBoard'
import SoundToggle   from '../ui/SoundToggle'
import ProgressBar   from '../ui/ProgressBar'
import { WORLDS }    from '../../utils/constants'
import { useSound }  from '../../hooks/useSound'

export default function Navbar() {
  const { activeSection, goToWorld, formattedHiScore } = useGame()
  const { play } = useSound()
  const [menuOpen, setMenuOpen] = useState(false)

  /* smooth scroll */
  const scrollToSection = (world) => {
    play('pipe')
    goToWorld(world.world, world.id)
    document.getElementById(world.id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  /* track active section on scroll */
  useEffect(() => {
    const handleScroll = () => {
      const sections = WORLDS.map(w => document.getElementById(w.id)).filter(Boolean)
      const scrollPos = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollPos) {
          const w = WORLDS[i]
          if (w) goToWorld(w.world, w.id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [goToWorld])

  return (
    <>
      <nav className="hud-navbar" style={{ flexWrap: 'nowrap', overflow: 'hidden' }}>

        {/* Score cluster — left side */}
        <ScoreBoard />

        {/* Flexible spacer */}
        <div style={{ flex: 1, minWidth: 0 }} />

        {/* Desktop nav links — shrinks before sound/hamburger */}
        <div style={{
          display:    'flex',
          alignItems: 'center',
          gap:         2,
          overflow:   'hidden',          /* clips links, not sound */
          flexShrink:  1,
          minWidth:    0,
        }}>
          {WORLDS.map(world => (
            <button
              key={world.id}
              onClick={() => scrollToSection(world)}
              className={`world-link desktop-only ${activeSection === world.id ? 'active' : ''}`}
              onMouseEnter={() => play('coin')}
              style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              {world.emoji} {world.label}
            </button>
          ))}
        </div>

        {/* Sound toggle — NEVER hidden, always flexShrink:0 */}
        <div style={{ flexShrink: 0, marginLeft: 6 }}>
          <SoundToggle />
        </div>

        {/* Mobile hamburger — hidden on desktop via CSS */}
        <button
          className="mobile-menu-btn btn-pixel"
          style={{ padding: '6px 10px', fontSize: 10, flexShrink: 0, marginLeft: 4 }}
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position:      'fixed',
          top:            64,
          left:           0, right: 0,
          background:    'rgba(0,0,0,0.97)',
          borderBottom:  '3px solid #FBD000',
          zIndex:         998,
          padding:        16,
          display:       'flex',
          flexDirection: 'column',
          gap:            8,
        }}>
          <ProgressBar style={{ marginBottom: 8 }} />

          {WORLDS.map(world => (
            <button
              key={world.id}
              onClick={() => scrollToSection(world)}
              className={`world-link ${activeSection === world.id ? 'active' : ''}`}
              style={{ fontSize: 10, textAlign: 'left' }}
            >
              {world.emoji} {world.label}
            </button>
          ))}

          <div style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize:    7,
            color:      '#E52521',
            paddingTop:  8,
            borderTop:  '1px solid rgba(255,255,255,0.1)',
            textShadow: '1px 1px 0 #000',
          }}>
            HI-SCORE: {formattedHiScore}
          </div>
        </div>
      )}
    </>
  )
}