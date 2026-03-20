/**
 * MarioCharacter.jsx
 * - Always walks LEFT → RIGHT (no moonwalk ever)
 * - Click → jump + coin
 * - ↑ Arrow key → jump + coin (when Mario is visible)
 * - Uses mario-walk.gif + mario-jump.png with SVG fallback
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import { useGame }  from '../../context/GameContext'
import { useSound } from '../../hooks/useSound'
import CoinBurst    from '../effects/CoinBurst'

export default function MarioCharacter() {
  const [visible,  setVisible]  = useState(false)
  const [posX,     setPosX]     = useState(-80)
  const [jumping,  setJumping]  = useState(false)
  const [burst,    setBurst]    = useState(0)
  const { addCoin, addScore }   = useGame()
  const { play }                = useSound()
  const jumpingRef              = useRef(false)  // ref so keyboard handler always sees fresh value
  const visibleRef              = useRef(false)

  /* ── Walk scheduler: ALWAYS left → right ── */
  useEffect(() => {
    let walkTimer, hideTimer, rafId

    const schedule = () => {
      /* Wait 20–40 seconds between appearances */
      walkTimer = setTimeout(() => {
        const startX   = -80
        const endX     = window.innerWidth + 80
        const duration = 8000

        setPosX(startX)
        setVisible(true)
        visibleRef.current = true

        let startTs = null
        const raf = (ts) => {
          if (!startTs) startTs = ts
          const pct = Math.min((ts - startTs) / duration, 1)
          setPosX(startX + (endX - startX) * pct)
          if (pct < 1) {
            rafId = requestAnimationFrame(raf)
          }
        }
        rafId = requestAnimationFrame(raf)

        hideTimer = setTimeout(() => {
          setVisible(false)
          visibleRef.current = false
          cancelAnimationFrame(rafId)
          schedule()
        }, duration + 100)

      }, 20000 + Math.random() * 20000)
    }

    schedule()
    return () => {
      clearTimeout(walkTimer)
      clearTimeout(hideTimer)
      cancelAnimationFrame(rafId)
    }
  }, [])

  /* ── Jump action ── */
  const doJump = useCallback(() => {
    if (jumpingRef.current) return
    jumpingRef.current = true
    setJumping(true)
    play('jump')
    addCoin()
    addScore(100)
    setBurst(n => n + 1)
    setTimeout(() => {
      setJumping(false)
      jumpingRef.current = false
    }, 550)
  }, [play, addCoin, addScore])

  /* ── ↑ Arrow key → jump ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'ArrowUp' && visibleRef.current) {
        e.preventDefault()
        doJump()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [doJump])

  if (!visible) return null

  /* ── Sprite src: jump image when jumping, walk gif when walking ── */
  const spriteSrc = jumping ? '/sprites/mario-jump.png' : '/sprites/mario-walk.gif'

  return (
    <div
      onClick={doJump}
      title="Click or press ↑ to jump! 🪙"
      style={{
        position:      'fixed',
        bottom:         6,
        left:           posX,
        zIndex:         997,
        cursor:        'pointer',
        /* No scaleX flip — always faces right naturally */
        transform:     `translateY(${jumping ? -36 : 0}px)`,
        transition:     jumping
          ? 'transform 0.22s cubic-bezier(0.33,1,0.68,1)'   /* snappy jump up */
          : 'transform 0.28s cubic-bezier(0.33,0,0.66,0)',  /* gravity fall */
        filter:        'drop-shadow(2px 0 0 #000)',
        userSelect:    'none',
        pointerEvents: 'auto',
        imageRendering:'pixelated',
      }}
    >
      {/* Real sprite */}
      <img
        key={spriteSrc}
        src={spriteSrc}
        alt="Mario"
        width={56}
        height={56}
        style={{ imageRendering:'pixelated', display:'block' }}
        onError={e => {
          e.currentTarget.style.display = 'none'
          const fallback = e.currentTarget.nextSibling
          if (fallback) fallback.style.display = 'block'
        }}
      />

      {/* SVG fallback */}
      <svg width="56" height="56" viewBox="0 0 16 16"
        style={{ imageRendering:'pixelated', display:'none' }}>
        <rect x="4" y="1" width="8"  height="2" fill="#E52521"/>
        <rect x="3" y="3" width="10" height="1" fill="#E52521"/>
        <rect x="3" y="4" width="9"  height="4" fill="#FFB47A"/>
        <rect x="5" y="5" width="2"  height="1" fill="#000"/>
        <rect x="9" y="5" width="2"  height="1" fill="#000"/>
        <rect x="4" y="7" width="8"  height="1" fill="#8B4513"/>
        <rect x="3" y="8" width="10" height="4" fill="#049CD8"/>
        <rect x="4" y="8" width="2"  height="1" fill="#E52521"/>
        <rect x="10" y="8" width="2" height="1" fill="#E52521"/>
        <rect x="5" y="9" width="1"  height="1" fill="#FBD000"/>
        <rect x="10" y="9" width="1" height="1" fill="#FBD000"/>
        <rect x="1"  y="8" width="2" height="3" fill="#E52521"/>
        <rect x="0"  y="10" width="2" height="2" fill="#fff"/>
        <rect x="13" y="8" width="2" height="3" fill="#E52521"/>
        <rect x="14" y="10" width="2" height="2" fill="#fff"/>
        <rect x="3" y="12" width="4" height="2" fill="#E52521"/>
        <rect x="9" y="12" width="4" height="2" fill="#E52521"/>
        <rect x="2" y="14" width="5" height="2" fill="#8B4513"/>
        <rect x="9" y="14" width="5" height="2" fill="#8B4513"/>
      </svg>

      {/* Coin burst on jump */}
      <div style={{ position:'absolute', top:0, left:'50%', pointerEvents:'none' }}>
        <CoinBurst trigger={burst} x="0" y="0" count={6} spread={40} />
      </div>

      {/* Jump hint tooltip — shows briefly on first appear */}
      <div style={{
        position:  'absolute',
        top:       -22,
        left:      '50%',
        transform: 'translateX(-50%)',
        fontFamily:"'Press Start 2P', monospace",
        fontSize:   5,
        color:     '#FBD000',
        whiteSpace:'nowrap',
        textShadow:'1px 1px 0 #000',
        animation: 'blink 1.2s steps(1) infinite',
        pointerEvents: 'none',
      }}>
        ↑ JUMP!
      </div>
    </div>
  )
}