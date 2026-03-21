import { useState, useEffect, useCallback } from 'react'
import { useGame } from '../../context/GameContext'
import { setSoundEnabled, initSounds } from '../../utils/soundManager'
import { useSound } from '../../hooks/useSound'
import FloatingCoins from '../effects/FloatingCoins'

const PLAYER_NAME  = 'ADITYA RAJ SHUKLA'
const PLAYER_TITLE = 'AI DEVELOPER & MACHINE LEARNING ENGINEER'
const PLAYER_CLASS = 'EXPERT LEVEL CODER'  // Yes, this is intentionally cheesy :P
const PLAYER_LEVEL = 'LVL 4'
const HIGH_SCORE   = '999999'

/* ── Mario image with fallback ── */
function MarioImg({ size = 96, flipped = false, animate = 'idle' }) {
  const [failed, setFailed] = useState(false)
  const src = animate === 'walk'
    ? '/sprites/mario-walk.gif'
    : '/sprites/mario-idle.png'

  if (!failed) {
    return (
      <img
        src={src}
        alt="Mario"
        width={size} height={size}
        style={{
          imageRendering: 'pixelated',
          transform: flipped ? 'scaleX(-1)' : 'scaleX(1)',
          filter: 'drop-shadow(3px 3px 0 #000)',
          display: 'block', flexShrink: 0,
        }}
        onError={() => setFailed(true)}
      />
    )
  }

  /* SVG fallback */
  return (
    <svg width={size} height={size} viewBox="0 0 16 16"
      style={{ imageRendering:'pixelated', transform: flipped ? 'scaleX(-1)' : 'none', filter:'drop-shadow(3px 3px 0 #000)', flexShrink:0 }}>
      <rect x="4" y="1" width="8"  height="2" fill="#E52521"/>
      <rect x="3" y="3" width="10" height="1" fill="#E52521"/>
      <rect x="3" y="4" width="9"  height="4" fill="#FFB47A"/>
      <rect x="5" y="5" width="2"  height="1" fill="#000"/>
      <rect x="9" y="5" width="2"  height="1" fill="#000"/>
      <rect x="7" y="6" width="2"  height="1" fill="#FF8C69"/>
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
  )
}

function TitleHUD({ score }) {
  return (
    <div style={{
      display:'flex', justifyContent:'center', gap:40, flexWrap:'wrap',
      padding:'16px 24px', fontFamily:"'Press Start 2P', monospace",
    }}>
      {[
        { label:'MARIO',      val: String(score).padStart(6,'0') },
        { label:'HIGH-SCORE', val: HIGH_SCORE },
        { label:'COINS',      val: '×00' },
      ].map(item => (
        <div key={item.label} style={{ textAlign:'center', minWidth:80 }}>
          <div style={{ fontSize:8, color:'#FBD000', marginBottom:4, textShadow:'1px 1px 0 #000' }}>
            {item.label}
          </div>
          <div style={{ fontSize:13, color:'#fff', textShadow:'2px 2px 0 #000', letterSpacing:2 }}>
            {item.val}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function TitleScreen({ onEnter }) {
  const { score, addScore, addCoin, toggleSound, soundEnabled } = useGame()
  const { play } = useSound()

  const [phase,        setPhase]        = useState(0)
  const [marioX,       setMarioX]       = useState(-120)
  const [marioDir,     setMarioDir]     = useState(false)
  const [pressStart,   setPressStart]   = useState(false)
  const [exiting,      setExiting]      = useState(false)
  const [clickedCoins, setClickedCoins] = useState([])

  /* Phase reveal timeline */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 1200)
    const t3 = setTimeout(() => { setPhase(3); setPressStart(true) }, 2000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  /* Walking Mario across bottom */
  useEffect(() => {
    if (phase < 3) return
    let pos = -120, rafId
    const animate = () => {
      pos += 2.5
      if (pos > window.innerWidth + 120) { pos = -120; setMarioDir(d => !d) }
      setMarioX(pos)
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [phase])

  const handleCoinClick = useCallback((e) => {
    e.stopPropagation()
    play('coin')
    addCoin()
    const id = Date.now()
    setClickedCoins(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
    setTimeout(() => setClickedCoins(prev => prev.filter(c => c.id !== id)), 700)
  }, [play, addCoin])

  const handleEnter = useCallback(() => {
    if (exiting) return
    /* Auto-enable sound on first user interaction (bypasses browser autoplay block) */
    initSounds()
    setSoundEnabled(true)
    if (!soundEnabled) toggleSound()   /* sync the 🔊 button state */
    play('stageClear')
    addScore(500)
    setExiting(true)
    setTimeout(() => { if (onEnter) onEnter() }, 600)
  }, [exiting, play, addScore, onEnter])

  useEffect(() => {
    if (phase < 3) return
    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); handleEnter() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, handleEnter])

  return (
    <div
      onClick={phase >= 3 ? handleEnter : undefined}
      style={{
        position:'fixed', inset:0, zIndex:9999,
        background:'linear-gradient(180deg,#3a6fd8 0%,#5C94FC 50%,#81B0FF 100%)',
        display:'flex', flexDirection:'column', overflow:'hidden',
        cursor: phase >= 3 ? 'pointer' : 'default',
        opacity: exiting ? 0 : 1, transition: exiting ? 'opacity 0.5s ease' : 'none',
      }}
    >
      {phase >= 2 && <FloatingCoins count={14} zIndex={2} opacity={0.45} />}
      {phase >= 2 && <TitleHUD score={score} />}

      {/* Centre card */}
      <div style={{
        flex:1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        gap:16, padding:'0 24px', position:'relative', zIndex:10,
      }}>
        {/* Title */}
        <div style={{
          textAlign:'center',
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(-60px)',
          transition:'all 0.4s steps(4)',
        }}>
          <h1 style={{
            fontFamily:"'Press Start 2P', monospace",
            fontSize:'clamp(32px,7vw,80px)', color:'#E52521',
            textShadow:'4px 4px 0 #8B0000,7px 7px 0 #000,0 0 30px rgba(229,37,33,0.5)',
            letterSpacing:6, lineHeight:1, marginBottom:4, margin:0,
          }}>MARIO</h1>
          <h2 style={{
            fontFamily:"'Press Start 2P', monospace",
            fontSize:'clamp(14px,3vw,30px)', color:'#FBD000',
            textShadow:'3px 3px 0 #8B6000,5px 5px 0 #000,0 0 20px rgba(251,208,0,0.4)',
            letterSpacing:4, margin:0,
          }}>PORTFOLIO</h2>
          {/* just for experimetn */}
          <h5 style={{
            fontFamily:"'Press Start 2P', monospace",
            fontSize:'clamp(9px,3vw,7px)', color:'#FBD000',
            textShadow:'0px 0px 0 #8B6000,2px 2px 0 #000,0 0 10px rgba(251,208,0,0.4)',
            letterSpacing:1, margin:0,
            }}>{'{ NOT A PLUMBER ANYMORE }'}</h5>
            </div>

            {/* Divider */}
        {phase >= 1 && (
          <div style={{
            width:'clamp(200px,60%,520px)', height:4,
            background:'linear-gradient(90deg,transparent,#FBD000,transparent)',
            boxShadow:'0 0 10px #FBD000',
          }} />
        )}

        {/* Mario + player card */}
        {phase >= 2 && (
          <div style={{
            display:'flex', alignItems:'center', gap:24,
            flexWrap:'wrap', justifyContent:'center',
            animation:'slideInUp 0.4s steps(4) forwards',
          }}>
            {/* Real Mario sprite — clickable for coins */}
            <div
              style={{ cursor:'pointer', position:'relative' }}
              onClick={handleCoinClick}
              title="Click me for coins!"
            >
              <div style={{ animation:'float 2s ease-in-out infinite' }}>
                <MarioImg size={80} animate="idle" />
              </div>
              <div style={{
                position:'absolute', top:-20, left:'50%', transform:'translateX(-50%)',
                fontFamily:"'Press Start 2P', monospace", fontSize:6,
                color:'#FBD000', whiteSpace:'nowrap', textShadow:'1px 1px 0 #000',
                animation:'blink 1.2s steps(1) infinite',
              }}>← TAP!</div>
            </div>

            {/* Player card */}
            <div style={{
              background:'rgba(0,0,0,0.75)', border:'3px solid #FBD000',
              boxShadow:'4px 4px 0 #000,0 0 16px rgba(251,208,0,0.3)',
              padding:'16px 22px', textAlign:'left',
            }}>
              <p style={{ fontFamily:"'Press Start 2P', monospace", fontSize:7, color:'#FBD000', marginBottom:6 }}>PLAYER ONE</p>
              <p style={{
                fontFamily:"'Press Start 2P', monospace",
                fontSize:'clamp(12px,2.5vw,18px)', color:'#fff',
                textShadow:'2px 2px 0 #000', marginBottom:8, lineHeight:1.5,
              }}>{PLAYER_NAME}</p>
              <p style={{ fontFamily:"'Press Start 2P', monospace", fontSize:7, color:'rgba(255,255,255,0.6)', marginBottom:4 }}>
                CLASS: {PLAYER_CLASS}
              </p>
              <p style={{ fontFamily:"'Press Start 2P', monospace", fontSize:7, color:'#43B047' }}>
                {PLAYER_LEVEL} — READY
              </p>
            </div>
          </div>
        )}

        {/* Tagline */}
        {phase >= 2 && (
          <p style={{
            fontFamily:"'Press Start 2P', monospace",
            fontSize:'clamp(7px,1.5vw,10px)', color:'rgba(255,255,255,0.75)',
            textShadow:'1px 1px 0 #000', letterSpacing:2,
            textAlign:'center', padding:'0 20px',
            animation:'fadeIn 0.5s ease 0.3s both',
          }}>{PLAYER_TITLE}</p>
        )}

        {/* Press Start */}
        {pressStart && (
          <div style={{ marginTop:8, textAlign:'center' }}>
            <p style={{
              fontFamily:"'Press Start 2P', monospace",
              fontSize:'clamp(10px,2vw,16px)', color:'#fff',
              textShadow:'2px 2px 0 #000', letterSpacing:3,
              animation:'blink 0.9s steps(1) infinite',
            }}>▶ PRESS  START ◀</p>
            <p style={{ fontFamily:"'Press Start 2P', monospace", fontSize:7, color:'rgba(255,255,255,0.4)', marginTop:6 }}>
              [SPACE / ENTER / CLICK]
            </p>
          </div>
        )}

        {/* Quick nav */}
        {phase >= 3 && (
          <div style={{
            display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center',
            marginTop:4, animation:'slideInUp 0.4s steps(4) 0.3s both',
          }}>
            {[
              { label:'📚 EDUCATION',    id:'education'    },
              { label:'🔧 PROJECTS',     id:'projects'     },
              { label:'🏆 ACHIEVEMENTS', id:'achievements' },
            ].map(btn => (
              <button key={btn.id}
                onClick={e => { e.stopPropagation(); play('pipe'); if (onEnter) onEnter(); setTimeout(() => document.getElementById(btn.id)?.scrollIntoView({ behavior:'smooth' }), 650) }}
                style={{
                  fontFamily:"'Press Start 2P', monospace", fontSize:8, color:'#000',
                  background:'#FBD000', border:'2px solid #000', boxShadow:'3px 3px 0 #000',
                  padding:'7px 14px', cursor:'pointer',
                }}
              >{btn.label}</button>
            ))}
          </div>
        )}
      </div>

      {/* Walking Mario at bottom — uses real GIF */}
      {phase >= 3 && (
        <div style={{
          position:'absolute', bottom:90, left:marioX, zIndex:5, pointerEvents:'none',
        }}>
          <MarioImg size={40} flipped={marioDir} animate="walk" />
        </div>
      )}

      {/* Ground — CSS repeating pattern fills any screen width perfectly */}
      <div style={{ position:'relative', zIndex:6, flexShrink:0 }}>
        <div style={{
          width:'100%', height:32,
          borderTop:'4px solid #000',
          background:'repeating-linear-gradient(90deg, #C84C0C 0px, #C84C0C 64px, #F8B800 64px, #F8B800 96px, #C84C0C 96px, #C84C0C 160px)',
          backgroundSize:'160px 32px',
          boxShadow:'inset 0 -2px 0 rgba(0,0,0,0.3)',
        }} />
        <div style={{ height:28, background:'#8B4513', borderTop:'3px solid #C84C0C' }} />
      </div>
      <div style={{ padding:'8px 0 12px', zIndex:6, textAlign:'center' }}>
        <p style={{ fontFamily:"'Press Start 2P', monospace", fontSize:6, color:'rgba(255,255,255,0.4)' }}>
          © 2026 {PLAYER_NAME.toUpperCase()} PORTFOLIO. ALL RIGHTS RESERVED.
        </p>
      </div>

      {/* Score popups on Mario click */}
      {clickedCoins.map(c => (
        <div key={c.id} style={{
          position:'fixed', left:c.x, top:c.y, pointerEvents:'none', zIndex:10000,
          animation:'scorePop 0.7s ease-out forwards',
          fontFamily:"'Press Start 2P', monospace", fontSize:12,
          color:'#FBD000', textShadow:'2px 2px 0 #000',
        }}>+200</div>
      ))}
    </div>
  )
}