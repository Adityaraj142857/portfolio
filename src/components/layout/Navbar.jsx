/**
 * Navbar.jsx — Phase 4+5
 * Added: high-score display, theme toggle (day/night),
 *        ProgressBar chip, session timer.
 */
import { useEffect, useState } from 'react'
import { useGame }       from '../../context/GameContext'
import { useTheme }      from '../../context/ThemeContext'
import ScoreBoard        from '../ui/ScoreBoard'
import SoundToggle       from '../ui/SoundToggle'
import ProgressBar       from '../ui/ProgressBar'
import { WORLDS }        from '../../utils/constants'
import { useSound }      from '../../hooks/useSound'

export default function Navbar() {
  const { activeSection, goToWorld, formattedHiScore } = useGame()
  const { isDark, toggleTheme } = useTheme()
  const { play } = useSound()
  const [menuOpen, setMenuOpen] = useState(false)

  /* smooth-scroll helper */
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
      <nav className="hud-navbar" style={{ flexWrap: 'nowrap' }}>

        {/* ── Score cluster ── */}
        <ScoreBoard />

        {/* Hi-Score (desktop only) */}
        <div className="hud-item" style={{
          display: 'none',
          flexDirection: 'column',
          gap: 2,
          minWidth: 90,
          marginLeft: 8,
        }}
          id="hi-score-chip"
        >
          <span className="hud-label" style={{ fontSize: 7, color: '#E52521' }}>HI-SCORE</span>
          <span className="hud-value" style={{ fontSize: 12, color: '#E52521' }}>{formattedHiScore}</span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, minWidth: 0 }} />

        {/* ── World nav links (desktop) ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexShrink: 0,
          overflow: 'hidden',
        }}
          className="desktop-nav"
        >
          {WORLDS.map(world => (
            <button
              key={world.id}
              onClick={() => scrollToSection(world)}
              className={`world-link ${activeSection === world.id ? 'active' : ''}`}
              onMouseEnter={() => play('coin')}
              style={{ whiteSpace: 'nowrap' }}
            >
              {world.emoji} {world.label}
            </button>
          ))}
        </div>

        {/* ── Day/Night toggle ── */}
        <button
          onClick={() => { toggleTheme(); play('block') }}
          title={isDark ? 'Switch to Day mode' : 'Switch to Night mode'}
          style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 14,
            background: 'transparent',
            border: '2px solid rgba(255,255,255,0.2)',
            padding: '4px 8px',
            cursor: 'pointer',
            flexShrink: 0,
            color: '#fff',
            boxShadow: '2px 2px 0 #000',
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* ── Sound toggle ── */}
        <SoundToggle />

        {/* ── Mobile hamburger ── */}
        <button
          className="mobile-menu-btn btn-pixel"
          style={{ padding: '6px 10px', fontSize: 10, flexShrink: 0 }}
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div style={{
          position:   'fixed',
          top:         64,
          left:        0, right: 0,
          background: 'rgba(0,0,0,0.97)',
          borderBottom: '3px solid #FBD000',
          zIndex:      998,
          padding:     16,
          display:    'flex',
          flexDirection: 'column',
          gap:          8,
        }}>
          {/* Progress in dropdown */}
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

          {/* Hi-score in mobile menu */}
          <div style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 7,
            color: '#E52521',
            paddingTop: 8,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textShadow: '1px 1px 0 #000',
          }}>
            HI-SCORE: {formattedHiScore}
          </div>
        </div>
      )}
    </>
  )
}
