/**
 * WorldMap.jsx
 * Uses /public/sprites/world-map.png as background texture.
 * Falls back to CSS gradient if the file doesn't exist.
 */
import { useState, useEffect, useRef } from 'react'
import { WORLDS }  from '../../utils/constants'
import { useGame } from '../../context/GameContext'
import { useSound } from '../../hooks/useSound'

/* ── Node positions (% of container) ── */
const NODE_POS = [
  { cx: 10, cy: 72 },   // Overview
  { cx: 26, cy: 40 },   // Education
  { cx: 44, cy: 68 },   // Projects
  { cx: 60, cy: 32 },   // Achievements
  { cx: 76, cy: 58 },   // Responsibility
  { cx: 90, cy: 28 },   // Hobbies
]

const WORLD_COLORS = {
  overview:       '#5C94FC',
  education:      '#43B047',
  projects:       '#888',
  achievements:   '#FBD000',
  responsibility: '#C87941',
  hobbies:        '#E52521',
}

/* ── Mini Mario cursor that sits on the active node ── */
function MapMario({ cx, cy }) {
  return (
    <div style={{
      position:  'absolute',
      left:      `${cx}%`,
      top:       `${cy - 12}%`,
      transform: 'translate(-50%, -100%)',
      zIndex:     20,
      filter:    'drop-shadow(1px 1px 0 #000)',
      animation: 'bouncePixel 0.5s steps(2) infinite',
      pointerEvents: 'none',
    }}>
      <img
        src="/sprites/mario-idle.png"
        alt="Mario"
        width={28}
        height={28}
        style={{ imageRendering:'pixelated', display:'block' }}
        onError={e => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.nextSibling.style.display = 'block'
        }}
      />
      {/* SVG fallback */}
      <svg width="24" height="24" viewBox="0 0 16 16"
        style={{ imageRendering:'pixelated', display:'none' }}>
        <rect x="4" y="1" width="8"  height="2" fill="#E52521"/>
        <rect x="3" y="3" width="10" height="1" fill="#E52521"/>
        <rect x="3" y="4" width="9"  height="4" fill="#FFB47A"/>
        <rect x="5" y="5" width="2"  height="1" fill="#000"/>
        <rect x="9" y="5" width="2"  height="1" fill="#000"/>
        <rect x="4" y="7" width="8"  height="1" fill="#8B4513"/>
        <rect x="3" y="8" width="10" height="4" fill="#049CD8"/>
        <rect x="3" y="12" width="4" height="2" fill="#E52521"/>
        <rect x="9" y="12" width="4" height="2" fill="#E52521"/>
        <rect x="2" y="14" width="5" height="2" fill="#8B4513"/>
        <rect x="9" y="14" width="5" height="2" fill="#8B4513"/>
      </svg>
    </div>
  )
}

/* ── Animated dashed path between nodes ── */
function MapPath({ mapW, mapH }) {
  const points = NODE_POS
    .map(p => `${(p.cx / 100) * mapW},${(p.cy / 100) * mapH}`)
    .join(' ')

  return (
    <svg style={{
      position:'absolute', inset:0,
      width:'100%', height:'100%',
      zIndex:4, pointerEvents:'none', overflow:'visible',
    }}>
      {/* Glow */}
      <polyline points={points} fill="none"
        stroke="rgba(251,208,0,0.3)" strokeWidth="14"
        strokeLinejoin="round" strokeLinecap="round"/>
      {/* Dashed path */}
      <polyline points={points} fill="none"
        stroke="#FBD000" strokeWidth="4"
        strokeDasharray="14 10"
        strokeLinejoin="round" strokeLinecap="round"
        style={{ animation:'pathMarch 1.2s linear infinite' }}/>
      {/* White inner highlight */}
      <polyline points={points} fill="none"
        stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"
        strokeDasharray="14 10"
        strokeLinejoin="round" strokeLinecap="round"/>
      <style>{`
        @keyframes pathMarch {
          from { stroke-dashoffset:0   }
          to   { stroke-dashoffset:-48 }
        }
      `}</style>
    </svg>
  )
}

/* ── Individual world node ── */
function WorldNode({ world, pos, active, onClick }) {
  const [hov, setHov] = useState(false)
  const color    = WORLD_COLORS[world.id] || '#fff'
  const isActive = active === world.id

  return (
    <div
      style={{
        position: 'absolute',
        left: `${pos.cx}%`, top: `${pos.cy}%`,
        transform: 'translate(-50%,-50%)',
        zIndex: 10, cursor: 'pointer',
      }}
      onClick={() => onClick(world)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Glow ring when active */}
      {isActive && (
        <div style={{
          position:'absolute', inset:-8, borderRadius:'50%',
          border:`3px solid ${color}`,
          boxShadow:`0 0 16px ${color},0 0 32px ${color}40`,
          animation:'heartbeat 1.4s ease-in-out infinite',
          pointerEvents:'none',
        }} />
      )}

      {/* Node */}
      <div style={{
        width:     hov || isActive ? 58 : 50,
        height:    hov || isActive ? 58 : 50,
        background: color,
        border:   `3px solid ${hov || isActive ? '#fff' : '#000'}`,
        boxShadow: hov || isActive
          ? `0 0 18px ${color},4px 4px 0 #000`
          : '4px 4px 0 #000',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        transition:'all 0.12s steps(2)',
      }}>
        <span style={{ fontSize: hov ? 22 : 18, lineHeight:1 }}>
          {world.emoji}
        </span>
      </div>

      {/* Label */}
      <div style={{
        position:'absolute', top:'110%', left:'50%',
        transform:'translateX(-50%)', marginTop:6,
        background:'rgba(0,0,0,0.92)',
        border:`2px solid ${hov || isActive ? color : '#444'}`,
        padding:'4px 8px',
        fontFamily:"'Press Start 2P', monospace", fontSize:6,
        color: hov || isActive ? color : '#aaa',
        whiteSpace:'nowrap', boxShadow:'2px 2px 0 #000',
        textAlign:'center', transition:'all 0.12s', zIndex:30,
      }}>
        <div style={{ color:'#FBD000', marginBottom:2, fontSize:5 }}>{world.world}</div>
        {world.label}
      </div>

      {/* Hover arrow */}
      {hov && (
        <div style={{
          position:'absolute', top:-28, left:'50%', transform:'translateX(-50%)',
          fontFamily:"'Press Start 2P', monospace", fontSize:14,
          color:'#FBD000', textShadow:'1px 1px 0 #000',
          animation:'bouncePixel 0.4s steps(2) infinite',
          pointerEvents:'none',
        }}>▼</div>
      )}
    </div>
  )
}

/* ── CSS-drawn terrain decorations ── */
function MapDecor() {
  return (
    <>
      {/* Trees */}
      {[12, 35, 55, 80].map((left, i) => (
        <div key={i} style={{
          position:'absolute', left:`${left}%`, bottom:'8%',
          pointerEvents:'none', zIndex:3,
        }}>
          <div style={{ width:8, height:22, background:'#5C3D11', border:'2px solid #000', margin:'0 auto' }} />
          <div style={{ width:28, height:28, background:'#2d7a32', border:'2px solid #000', borderRadius:'50% 50% 0 0', marginLeft:-10, marginTop:-10 }} />
        </div>
      ))}
      {/* Mini castle */}
      <div style={{ position:'absolute', right:'3%', bottom:'6%', zIndex:3, pointerEvents:'none' }}>
        <div style={{ display:'flex', gap:2 }}>
          {[0,1,2].map(j => (
            <div key={j} style={{ width:10, height: j===1?12:8, background:'#888', border:'2px solid #000' }} />
          ))}
        </div>
        <div style={{ width:36, height:20, background:'#666', border:'2px solid #000' }}>
          <div style={{ width:10, height:12, background:'#000', margin:'4px auto 0' }} />
        </div>
      </div>
      {/* Warp pipe */}
      <div style={{ position:'absolute', left:'6%', bottom:'6%', zIndex:3, pointerEvents:'none' }}>
        <div style={{ width:22, height:8,  background:'#2BA94C', border:'2px solid #000' }} />
        <div style={{ width:18, height:18, background:'#228B34', border:'2px solid #000', margin:'0 auto' }} />
      </div>
    </>
  )
}

/* ── Main component ── */
export default function WorldMap({ height = 300 }) {
  const { activeSection, goToWorld, addScore } = useGame()
  const { play } = useSound()
  const mapRef   = useRef(null)
  const [mapW,   setMapW]   = useState(800)
  const [mapH,   setMapH]   = useState(height)
  const [imgOk,  setImgOk]  = useState(true)   // track if world-map.png loads

  /* Track container size for SVG path */
  useEffect(() => {
    if (!mapRef.current) return
    const ro = new ResizeObserver(entries => {
      const e = entries[0]
      if (e) { setMapW(e.contentRect.width); setMapH(e.contentRect.height) }
    })
    ro.observe(mapRef.current)
    return () => ro.disconnect()
  }, [])

  const handleNodeClick = (world) => {
    play('coin')
    addScore(50)
    goToWorld(world.world, world.id)
    document.getElementById(world.id)?.scrollIntoView({ behavior:'smooth' })
  }

  const activeIdx = WORLDS.findIndex(w => w.id === activeSection)
  const activePos = NODE_POS[activeIdx] || NODE_POS[0]

  return (
    <div
      ref={mapRef}
      style={{
        position: 'relative',
        width:    '100%',
        height,
        border:    '4px solid #FBD000',
        boxShadow: '6px 6px 0 #000, 0 0 24px rgba(251,208,0,0.2)',
        overflow:  'hidden',
        /* Fallback gradient always present */
        background: 'linear-gradient(180deg,#2d5a1b 0%,#3d7a25 45%,#4a8c2a 75%,#3d7a25 100%)',
      }}
    >
      {/* ── world-map.png as background image ── */}
      {imgOk && (
        <img
          src="/sprites/world-map.png"
          alt=""
          onError={() => setImgOk(false)}
          style={{
            position:       'absolute',
            inset:           0,
            width:          '100%',
            height:         '100%',
            objectFit:      'cover',
            objectPosition: 'center',
            imageRendering: 'pixelated',
            zIndex:          0,
            /* Slight dark tint so UI elements stay readable */
            filter:         'brightness(0.75) saturate(1.3)',
          }}
        />
      )}

      {/* Semi-transparent overlay so nodes + path pop */}
      <div style={{
        position:'absolute', inset:0, zIndex:1,
        background: imgOk
          ? 'rgba(0,0,0,0.18)'                      /* light overlay when PNG loaded */
          : 'repeating-linear-gradient(0deg,transparent,transparent 15px,rgba(0,0,0,0.04) 15px,rgba(0,0,0,0.04) 16px),' +
            'repeating-linear-gradient(90deg,transparent,transparent 15px,rgba(0,0,0,0.04) 15px,rgba(0,0,0,0.04) 16px)',
        pointerEvents:'none',
      }} />

      {/* Title badge */}
      <div style={{
        position:'absolute', top:10, left:12, zIndex:30,
        background:'rgba(0,0,0,0.88)', border:'2px solid #FBD000',
        boxShadow:'3px 3px 0 #000', padding:'4px 12px',
        fontFamily:"'Press Start 2P', monospace", fontSize:7,
        color:'#FBD000', letterSpacing:2,
      }}>
        ★ SELECT WORLD ★
      </div>

      {/* Instructions */}
      <div style={{
        position:'absolute', top:10, right:12, zIndex:30,
        fontFamily:"'Press Start 2P', monospace", fontSize:6,
        color:'rgba(255,255,255,0.6)', textShadow:'1px 1px 0 #000',
      }}>
        CLICK TO WARP ↓
      </div>

      {/* Terrain decorations */}
      <MapDecor />

      {/* Dotted path */}
      <MapPath mapW={mapW} mapH={mapH} />

      {/* World nodes */}
      {WORLDS.map((world, i) => (
        <WorldNode
          key={world.id}
          world={world}
          pos={NODE_POS[i]}
          active={activeSection}
          onClick={handleNodeClick}
        />
      ))}

      {/* Mario cursor on active node */}
      <MapMario cx={activePos.cx} cy={activePos.cy} />

      {/* Ground strip */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, zIndex:5,
        height:18, background:'#C84C0C', borderTop:'3px solid #E86020',
        pointerEvents:'none', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', inset:0,
          background:'repeating-linear-gradient(90deg,transparent 0px,transparent 31px,rgba(0,0,0,0.18) 31px,rgba(0,0,0,0.18) 32px)',
        }} />
      </div>
    </div>
  )
}