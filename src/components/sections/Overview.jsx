import { useState, useEffect } from 'react'
import { useGame } from '../../context/GameContext'
import { useSound } from '../../hooks/useSound'
import ParallaxBackground from '../effects/ParallaxBackground'
import FloatingCoins from '../effects/FloatingCoins'
import CoinBurst from '../effects/CoinBurst'
import WorldMap from '../layout/WorldMap'

/* ── Mario image with idle/jump states + SVG fallback ── */
function MarioSprite({ size = 80, jumping = false }) {
  const [imgFailed, setImgFailed] = useState(false)
  const src = jumping ? '/sprites/mario-jump.png' : '/sprites/mario-idle.png'

  return (
    <div style={{
      width: size, height: size,
      transform: jumping ? 'translateY(-22px)' : 'translateY(0)',
      transition: 'transform 0.15s steps(3)',
      filter: 'drop-shadow(2px 2px 0 #000)',
      flexShrink: 0,
    }}>
      {!imgFailed ? (
        <img
          key={src}
          src={src}
          alt="Mario"
          width={size}
          height={size}
          style={{ imageRendering: 'pixelated', display: 'block' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        /* SVG fallback */
        <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
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
      )}
    </div>
  )
}

function StatChip({ emoji, label, value, color }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.7)',
      border: `2px solid ${color}`,
      boxShadow: `3px 3px 0 #000, 0 0 10px ${color}30`,
      padding: '10px 16px',
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ fontSize: 22 }}>{emoji}</span>
      <div>
        <p style={{ fontFamily:"'Press Start 2P', monospace", fontSize:7, color, marginBottom:3 }}>{label}</p>
        <p style={{ fontFamily:"'Press Start 2P', monospace", fontSize:11, color:'#fff', textShadow:'2px 2px 0 #000' }}>{value}</p>
      </div>
    </div>
  )
}

export default function Overview() {
  const { addScore, addCoin } = useGame()
  const { play } = useSound()
  const [jumping,   setJumping]   = useState(false)
  const [showSub,   setShowSub]   = useState(false)
  const [burstTrig, setBurstTrig] = useState(0)
  const [jumpCount, setJumpCount] = useState(0)   /* 3 jumps → redirect */

  useEffect(() => {
    const t = setTimeout(() => setShowSub(true), 600)
    return () => clearTimeout(t)
  }, [])

  const handleMarioClick = () => {
    if (jumping) return
    play('jump')
    addScore(100)
    addCoin()
    setJumping(true)
    setBurstTrig(n => n + 1)

    const newCount = jumpCount + 1
    setJumpCount(newCount)

    /* On 3rd jump → play stage-clear then redirect */
    if (newCount >= 3) {
      play('stageClear')
      setTimeout(() => {
        window.open('https://supermarioplay.com/', '_blank')
        setJumpCount(0)   /* reset so it works again if they come back */
      }, 600)
    }

    setTimeout(() => setJumping(false), 500)
  }

  const scrollTo = (id) => {
    play('pipe')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight:'100vh', position:'relative', overflow:'hidden', paddingTop:64 }}>
      <ParallaxBackground theme="sky" />
      <FloatingCoins count={10} zIndex={3} opacity={0.5} />

      <div style={{
        position:'relative', zIndex:10,
        display:'flex', flexDirection:'column', alignItems:'center',
        paddingTop:'7vh', gap:16,
      }}>
        {/* World map badge */}
        <div style={{
          background:'rgba(0,0,0,0.8)', border:'3px solid #FBD000',
          boxShadow:'4px 4px 0 #000', padding:'6px 20px',
          fontFamily:"'Press Start 2P', monospace", fontSize:9,
          color:'#FBD000', letterSpacing:3,
          animation:'slideIn 0.4s steps(4) forwards',
        }}>
          ★ WORLD MAP ★
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily:"'Press Start 2P', monospace",
          fontSize:'clamp(22px,4.5vw,46px)',
          color:'#000000',
          textShadow:'4px 4px 0 #E52521,6px 6px 0 #8B0000,8px 8px 0 #000',
          letterSpacing:4, textAlign:'center', padding:'0 16px',
          animation:'popIn 0.5s cubic-bezier(0.17,0.67,0.83,0.67) 0.2s both',
        }}>
          ADITYA RAJ SHUKLA
        </h1>

        {/* Subtitle */}
        {showSub && (
          <p style={{
            fontFamily:"'Press Start 2P', monospace",
            fontSize:'clamp(7px,1.6vw,11px)',
            color:'#FBD000', textShadow:'2px 2px 0 #000',
            letterSpacing:2, textAlign:'center', padding:'0 20px',
            animation:'fadeIn 0.4s ease forwards',
          }}>
            AI DEVELOPER & MACHINE LEARNING ENGINEER
          </p>
        )}

        {/* Clickable Mario using real PNG */}
        <div style={{ position:'relative', marginTop:4 }}>
          <div
            onClick={handleMarioClick}
            style={{ cursor:'pointer', display:'inline-block' }}
            title={`Click ${3 - jumpCount} more time${3 - jumpCount === 1 ? '' : 's'} to warp! 🍄`}
          >
            <MarioSprite size={80} jumping={jumping} />
          </div>

          <CoinBurst trigger={burstTrig} x="50%" y="-10px" count={7} spread={55} />

          <div style={{
            position:'absolute', top:-22, left:'50%', transform:'translateX(-50%)',
            fontFamily:"'Press Start 2P', monospace", fontSize:6,
            color: jumpCount > 0 ? '#FBD000' : '#fff',
            whiteSpace:'nowrap', textShadow:'1px 1px 0 #000',
            animation:'blink 1.2s steps(1) infinite',
          }}>
            {jumpCount === 0 && '← CLICK!'}
            {jumpCount === 1 && '2 MORE!'}
            {jumpCount === 2 && '1 MORE! 🍄'}
            {jumpCount >= 3 && '🎮 WARP!'}
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display:'flex', gap:14, flexWrap:'wrap', justifyContent:'center', marginTop:4 }}>
          {[
            { label:'VIEW PROJECTS', id:'projects',     bg:'#E52521', shadow:'#8B0000' },
            { label:'ACHIEVEMENTS',  id:'achievements', bg:'#049CD8', shadow:'#02618A' },
            { label:'CONTACT ME',    id:null,           bg:'#43B047', shadow:'#1a5e1f', href:'mailto:adityashukla.cat@gmail.com' },
          ].map(b => b.href ? (
            <a
              key={b.label}
              href={b.href}
              target={b.href.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontFamily:"'Press Start 2P', monospace", fontSize:9, color:'#fff',
                background:b.bg, border:'3px solid #000',
                boxShadow:`4px 4px 0 ${b.shadow}`, padding:'10px 18px',
                textDecoration:'none', display:'inline-block', cursor:'pointer',
                userSelect:'none', WebkitUserSelect:'none',
                pointerEvents:'auto',
              }}
            >{b.label}</a>
          ) : (
            <button key={b.label} onClick={() => scrollTo(b.id)} style={{
              fontFamily:"'Press Start 2P', monospace", fontSize:9, color:'#fff',
              background:b.bg, border:'3px solid #000',
              boxShadow:`4px 4px 0 ${b.shadow}`, padding:'10px 18px', cursor:'pointer',
            }}>{b.label}</button>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{
          marginTop:8, fontFamily:"'Press Start 2P', monospace", fontSize:8,
          color:'rgba(255,255,255,0.65)', textShadow:'1px 1px 0 #000',
          animation:'bouncePixel 0.8s steps(3) infinite',
        }}>
          ↓ SCROLL TO EXPLORE ↓
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        position:'relative', zIndex:10,
        display:'flex', justifyContent:'center', flexWrap:'wrap',
        gap:12, maxWidth:900, margin:'32px auto 0', padding:'0 24px',
      }}>
        <StatChip emoji="💻" label="PROJECTS"     value="6+"  color="#049CD8" />
        <StatChip emoji="🏆" label="ACHIEVEMENTS" value="4+" color="#FBD000" />
        <StatChip emoji="📚" label="CGPA"         value="8.35" color="#43B047" />
        <StatChip emoji="🌟" label="EXPERIENCE"   value="LET'S NOT GO THERE" color="#E52521" />
      </div>

      {/* World map */}
      <div style={{ position:'relative', zIndex:10, maxWidth:920, margin:'28px auto 0', padding:'0 20px' }}>
        <WorldMap height={270} />
      </div>

      {/* Ground */}
      <div style={{ position:'relative', zIndex:5, marginTop:32 }}>
        <div className="ground-row" />
        <div style={{ height:32, background:'#8B4513', borderTop:'3px solid #C84C0C' }} />
      </div>
    </div>
  )
}