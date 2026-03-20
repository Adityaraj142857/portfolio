import { useState, useMemo } from 'react'
import { useGame } from '../../context/GameContext'
import { useSound } from '../../hooks/useSound'
import ParallaxBackground from '../effects/ParallaxBackground'
import CoinBurst from '../effects/CoinBurst'
import { addToast } from '../ui/Toast'

/* ─────── DATA ─────── */
const PROJECTS = [
  {
    id:       2,
    title:    'PGDBA ASSISTANT',
    subtitle: 'Production-grade RAG Q&A system',
    tech:     ['Python', 'FastAPI', 'LangChain', 'FAISS', 'HuggingFace', 'Gemini 2.5 Flash'],
    emoji:    '🎓',
    color:    '#049CD8',
    github:   'https://github.com/Adityaraj142857/pgdba-assistant',
    demo:     '',
    desc:     'End-to-end conversational assistant for PGDBA queries. Features a custom web crawler, 2-stage ingestion pipeline, local FAISS embeddings, and a production FastAPI backend with smoke-test and evaluation modules.',
    stars:    0,
    category: 'AI/ML',
  },
  {
    id:       1,
    title:    'GEETA AI',
    subtitle: 'Ancient wisdom meets modern RAG',
    tech:     ['Python', 'LangChain', 'AstraDB', 'Google Gemini', 'Streamlit'],
    emoji:    '🕉️',
    color:    '#FF6B35',
    github:   'https://github.com/Adityaraj142857/GeetaAI',
    demo:     'https://geetaai.streamlit.app/',
    desc:     'An AI-powered chatbot trained on the Bhagavad Gita that provides real-life philosophical guidance using Retrieval Augmented Generation. Ask it anything — it answers with the wisdom of the Gita.',
    stars:    0,
    category: 'AI/ML',
  },

  {
    id:       3,
    title:    'NETWORK TOOLS',
    subtitle: 'GUI toolkit for network diagnostics',
    tech:     ['Python', 'Tkinter', 'PING', 'Traceroute'],
    emoji:    '🌐',
    color:    '#43A047',
    github:   'https://github.com/Adityaraj142857/Network-Tools',
    demo:     '',
    desc:     'A Python GUI tool built during 2nd year that wraps PING and TRACEROUTE commands into a clean interface. The most-starred repo — simple, useful, and the project that sparked the cybersecurity obsession.',
    stars:    2,
    category: 'Networking',
  },

  {
    id:       4,
    title:    'AUTO ATTENDANCE',
    subtitle: 'Because manually clicking is overrated',
    tech:     ['Python', 'Selenium', 'Moodle API', 'Shell'],
    emoji:    '🦥',
    color:    '#8E24AA',
    github:   'https://github.com/Adityaraj142857/auto-attendance-moodle',
    demo:     '',
    desc:     'Automates attendance marking on Moodle — "best for lazy students" (README\'s words, not mine). A scrappy but effective automation script that\'s saved countless clicks and proves that the best engineers automate the boring stuff first.',
    stars:    0,
    category: 'Automation',
  },
];

const ALL_CATS = ['ALL', ...Array.from(new Set(PROJECTS.map(p => p.category)))]

/* ─────── Warp Pipe (decorative) ─────── */
function DecorPipe({ color = '#2BA94C', height = 90 }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <div style={{
        width:68, height:26,
        background:`linear-gradient(90deg,#1A6B2F 0%,${color} 30%,#5DE87A 50%,${color} 70%,#1A6B2F 100%)`,
        border:'3px solid #000', boxShadow:'4px 4px 0 #000', flexShrink:0,
      }} />
      <div style={{
        width:52, height,
        background:`linear-gradient(90deg,#1A6B2F 0%,${color} 25%,#3DBE5A 50%,${color} 75%,#1A6B2F 100%)`,
        border:'3px solid #000', borderTop:'none',
      }} />
    </div>
  )
}

/* ─────── Project Card ─────── */
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [burst,   setBurst]   = useState(0)
  const { addScore, addCoin } = useGame()
  const { play } = useSound()

  const handleFlip = () => {
    play('block')
    addScore(50)
    setFlipped(f => !f)
    if (!flipped) {
      addCoin()
      setBurst(n => n + 1)
      addToast({ title: project.title, subtitle: project.subtitle, emoji: project.emoji, color: project.color, duration: 2500 })
    }
  }

  return (
    <div
      className="reveal"
      style={{ perspective:1000, animationDelay: index * 0.08 + 's', position:'relative' }}
      onMouseEnter={() => { if (!hovered) { play('coin'); addScore(10) }; setHovered(true) }}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        onClick={handleFlip}
        style={{
          position:'relative', width:'100%', height:260,
          transformStyle:'preserve-3d',
          transition:'transform 0.45s steps(5)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor:'pointer',
        }}
      >
        {/* FRONT */}
        <div style={{
          position:'absolute', inset:0,
          backfaceVisibility:'hidden',
          background:'rgba(0,0,0,0.88)',
          border:`3px solid ${project.color}`,
          boxShadow: hovered
            ? `0 0 22px ${project.color}70,6px 6px 0 #000`
            : '4px 4px 0 #000',
          padding:20,
          display:'flex', flexDirection:'column', gap:10,
          transition:'box-shadow 0.1s steps(2)',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontSize:30 }}>{project.emoji}</span>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:4 }}>
              <span style={{ fontFamily:"'Press Start 2P', cursive", fontSize:7, color:'#FBD000', textShadow:'1px 1px 0 #000' }}>
                ★ {project.stars}
              </span>
              <span style={{
                fontFamily:"'Press Start 2P', cursive", fontSize:6,
                color:'#000', background: project.color,
                border:'2px solid #000', padding:'2px 6px', boxShadow:'1px 1px 0 #000',
              }}>
                {project.category}
              </span>
            </div>
          </div>

          <h3 style={{ fontFamily:"'Press Start 2P', cursive", fontSize:11, color:'#fff', textShadow:'2px 2px 0 #000' }}>
            {project.title}
          </h3>
          <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:7, color:project.color, textShadow:'1px 1px 0 #000' }}>
            {project.subtitle}
          </p>

          <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginTop:'auto' }}>
            {project.tech.map(t => (
              <span key={t} style={{
                fontFamily:"'Press Start 2P', cursive", fontSize:5,
                color:'#000', background:'#FBD000',
                border:'2px solid #000', padding:'2px 6px', boxShadow:'1px 1px 0 #000',
              }}>{t}</span>
            ))}
          </div>

          <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:6, color:'rgba(255,255,255,0.4)', marginTop:4 }}>
            CLICK TO FLIP →
          </p>
        </div>

        {/* BACK */}
        <div style={{
          position:'absolute', inset:0,
          backfaceVisibility:'hidden',
          transform:'rotateY(180deg)',
          background:`linear-gradient(135deg,${project.color}22,rgba(0,0,0,0.96))`,
          border:`3px solid ${project.color}`,
          boxShadow:'4px 4px 0 #000',
          padding:20,
          display:'flex', flexDirection:'column', gap:12,
        }}>
          <p style={{
            fontFamily:"'Press Start 2P', cursive", fontSize:7,
            color:'#fff', lineHeight:1.9, textShadow:'1px 1px 0 #000', flex:1,
          }}>
            {project.desc}
          </p>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <a href={project.github} target="_blank" rel="noreferrer"
              className="btn-pixel" style={{ fontSize:7, padding:'6px 12px' }}
              onClick={e => { e.stopPropagation(); play('powerup') }}
            >GITHUB →</a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer"
                className="btn-pixel-blue" style={{ fontSize:7, padding:'6px 12px' }}
                onClick={e => { e.stopPropagation(); play('powerup') }}
              >LIVE DEMO →</a>
            )}
          </div>
          <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:6, color:'rgba(255,255,255,0.35)' }}>
            ← CLICK TO FLIP BACK
          </p>
        </div>
      </div>

      {/* Coin burst on first flip */}
      <div style={{ position:'absolute', top:0, left:'50%', pointerEvents:'none' }}>
        <CoinBurst trigger={burst} x="0px" y="0px" count={5} spread={40} />
      </div>
    </div>
  )
}

/* ─────── Filter Tab ─────── */
function FilterTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily:"'Press Start 2P', cursive", fontSize:7,
        color: active ? '#000' : 'rgba(255,255,255,0.6)',
        background: active ? '#049CD8' : 'rgba(255,255,255,0.05)',
        border:'2px solid ' + (active ? '#049CD8' : 'rgba(255,255,255,0.2)'),
        boxShadow: active ? '3px 3px 0 #000' : '2px 2px 0 #000',
        padding:'6px 14px', cursor:'pointer',
        transform: active ? 'translate(0,0)' : 'none',
        transition:'all 0.1s steps(2)',
      }}
    >
      {label}
    </button>
  )
}

/* ─────── Main ─────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const { play } = useSound()

  const filtered = useMemo(() =>
    activeFilter === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter),
    [activeFilter]
  )

  return (
    <div style={{ minHeight:'100vh', position:'relative', overflow:'hidden', paddingTop:64 }}>
      <ParallaxBackground theme="underground" />

      {/* Pipe decorations */}
      <div style={{ position:'absolute', left:0, bottom:0, zIndex:2, display:'flex', gap:16, paddingLeft:16 }}>
        <DecorPipe height={100} />
        <DecorPipe height={148} color="#43B047" />
      </div>
      <div style={{ position:'absolute', right:0, bottom:0, zIndex:2, display:'flex', gap:16, paddingRight:16 }}>
        <DecorPipe height={124} color="#049CD8" />
        <DecorPipe height={80} />
      </div>

      <div style={{ position:'relative', zIndex:10, maxWidth:980, margin:'0 auto', padding:'60px 24px 100px' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{
            display:'inline-block', background:'rgba(0,0,0,0.92)',
            border:'4px solid #049CD8',
            boxShadow:'0 0 22px #049CD840,6px 6px 0 #000',
            padding:'12px 28px', marginBottom:16,
          }}>
            <h2 style={{
              fontFamily:"'Press Start 2P', cursive",
              fontSize:'clamp(11px,2.5vw,19px)',
              color:'#049CD8',
              textShadow:'2px 2px 0 #000,0 0 14px #049CD8',
              letterSpacing:2,
            }}>
              🔧 WORLD 2-1: PROJECTS
            </h2>
          </div>
          <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:7, color:'rgba(255,255,255,0.45)', textShadow:'1px 1px 0 #000' }}>
            CLICK CARDS TO FLIP & REVEAL PROJECT DETAILS
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', marginBottom:32 }}>
          {ALL_CATS.map(cat => (
            <FilterTab
              key={cat}
              label={cat}
              active={activeFilter === cat}
              onClick={() => { setActiveFilter(cat); play('coin') }}
            />
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',
          gap:24,
        }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
