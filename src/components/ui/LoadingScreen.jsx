import { useEffect, useState } from 'react'
import { useGame } from '../../context/GameContext'
import { initSounds } from '../../utils/soundManager'

const STEPS = [
  'LOADING WORLD...',
  'COLLECTING COINS...',
  'WARMING UP PIPES...',
  'STOMPING GOOMBAS...',
  'SAVING PRINCESS...',
  'PRESS START!',
]

/* ── Mario sprite: tries real PNG first, SVG fallback ── */
function MarioSprite() {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        src="/sprites/mario-idle.png"
        alt="Mario"
        width={80}
        height={80}
        style={{
          imageRendering: 'pixelated',
          filter:         'drop-shadow(2px 2px 0 #000)',
          display:        'block',
        }}
        onError={() => setFailed(true)}
      />
    )
  }

  /* SVG fallback if PNG missing */
  return (
    <svg width="80" height="80" viewBox="0 0 16 16"
      style={{ imageRendering:'pixelated', filter:'drop-shadow(2px 2px 0 #000)' }}>
      <rect x="4" y="1" width="8"  height="2" fill="#E52521"/>
      <rect x="3" y="3" width="10" height="1" fill="#E52521"/>
      <rect x="3" y="4" width="9"  height="4" fill="#FFB47A"/>
      <rect x="5" y="5" width="2"  height="1" fill="#000"/>
      <rect x="9" y="5" width="2"  height="1" fill="#000"/>
      <rect x="4" y="7" width="8"  height="1" fill="#8B4513"/>
      <rect x="3" y="8" width="10" height="4" fill="#049CD8"/>
      <rect x="5" y="9" width="1"  height="1" fill="#FBD000"/>
      <rect x="10" y="9" width="1" height="1" fill="#FBD000"/>
      <rect x="1"  y="8" width="2" height="3" fill="#E52521"/>
      <rect x="13" y="8" width="2" height="3" fill="#E52521"/>
      <rect x="0"  y="10" width="2" height="2" fill="#fff"/>
      <rect x="14" y="10" width="2" height="2" fill="#fff"/>
      <rect x="3"  y="12" width="4" height="2" fill="#E52521"/>
      <rect x="9"  y="12" width="4" height="2" fill="#E52521"/>
      <rect x="2"  y="14" width="5" height="2" fill="#8B4513"/>
      <rect x="9"  y="14" width="5" height="2" fill="#8B4513"/>
    </svg>
  )
}

export default function LoadingScreen() {
  const { setIsLoading } = useGame()
  const [step,     setStep]     = useState(0)
  const [progress, setProgress] = useState(0)
  const [done,     setDone]     = useState(false)
  const [blink,    setBlink]    = useState(true)

  /* Progress ticker */
  useEffect(() => {
    try { initSounds() } catch (_) {}
    const iv = setInterval(() => {
      setProgress(p => {
        const next = p + 5
        if (next >= 100) { clearInterval(iv); setDone(true); return 100 }
        return next
      })
      setStep(s => Math.min(s + 1, STEPS.length - 1))
    }, 120)
    return () => clearInterval(iv)
  }, [])

  /* Blink ticker */
  useEffect(() => {
    const iv = setInterval(() => setBlink(b => !b), 500)
    return () => clearInterval(iv)
  }, [])

  /* Finish loading */
  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(t)
  }, [done, setIsLoading])

  return (
    <div style={{
      position:       'fixed',
      inset:           0,
      background:     '#000',
      zIndex:          9999,
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      gap:             20,
      fontFamily:     "'Press Start 2P', monospace",
    }}>
      {/* MARIO title */}
      <h1 style={{
        fontSize:    48,
        color:      '#E52521',
        textShadow: '3px 3px 0 #8B0000,5px 5px 0 #000',
        margin:      0, letterSpacing:4,
      }}>MARIO</h1>
      <h2 style={{
        fontSize:    18,
        color:      '#FBD000',
        textShadow: '2px 2px 0 #8B6000,3px 3px 0 #000',
        margin:      0, letterSpacing:3,
      }}>PORTFOLIO</h2>

      {/* Bouncing Mario — uses real PNG */}
      <div style={{ animation:'bouncePixel 0.5s steps(2) infinite', marginTop:8 }}>
        <MarioSprite />
      </div>

      {/* Progress bar */}
      <div style={{
        width:300, height:24,
        border:'3px solid #fff', background:'#000',
        position:'relative', overflow:'hidden', marginTop:8,
      }}>
        <div style={{
          height:'100%', width:`${progress}%`,
          background:'#E52521',
          transition:'width 0.1s steps(2)',
          boxShadow:'inset 0 0 0 2px rgba(255,255,255,0.2)',
        }} />
        <div style={{
          position:'absolute', inset:0,
          background:'repeating-linear-gradient(90deg,transparent 0px,transparent 14px,rgba(0,0,0,0.3) 14px,rgba(0,0,0,0.3) 16px)',
          pointerEvents:'none',
        }} />
      </div>

      {/* Percent */}
      <p style={{ fontSize:10, color:'#FBD000', textShadow:'1px 1px 0 #000', margin:0 }}>
        {progress}%
      </p>

      {/* Status message */}
      <p style={{
        fontSize:9, margin:0, minHeight:20,
        color: blink ? '#fff' : 'transparent',
        textShadow:'1px 1px 0 #000',
        transition:'color 0.1s',
      }}>
        {STEPS[step]}
      </p>

      <p style={{ fontSize:6, color:'#444', margin:0, marginTop:20 }}>
        © 2024 MARIO PORTFOLIO. 1UP!
      </p>

      <style>{`
        @keyframes bouncePixel {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  )
}