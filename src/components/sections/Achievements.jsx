import { useState } from 'react'
import { useGame } from '../../context/GameContext'
import { useSound } from '../../hooks/useSound'
import CoinBurst from '../effects/CoinBurst'
import { addToast } from '../ui/Toast'

/* ─────── DATA ─────── */
const ACHIEVEMENTS = [
  {
    id:       1,
    emoji:    '✈️',
    title:    'AEROTHON 6.0 FINALIST',
    subtitle: 'Top 10 out of 8,000+ — DGCA / Boeing National Challenge 2024',
    color:    '#FFD700',
    score:    950,
    rarity:   'LEGENDARY',
    cat:      'Competition',
    year:     2024,
    detail:   'Led a 5-member team to design an ML-based pilot navigation & ATC system. Recognised by senior panellists for innovative implementation.',
  },

  {
    id:       2,
    emoji:    '🔥',
    title:    'HACKED MITS WEBSITE',
    subtitle: 'First student to find a firewall vulnerability — MITS Gwalior 2021',
    color:    '#E52521',
    score:    800,
    rarity:   'EPIC',
    cat:      'Cybersecurity',
    year:     2021,
    detail:   'Identified a firewall vulnerability before it could be exploited. Received an appreciation letter from the Head of Department and published an article in the college magazine and on Medium.',
  },

  {
    id:       3,
    emoji:    '🐛',
    title:    'BUG BOUNTY — NUMERIC INFOTECH',
    subtitle: 'Critical admin-access vulnerability — 500+ accounts protected 2021',
    color:    '#049CD8',
    score:    750,
    rarity:   'EPIC',
    cat:      'Cybersecurity',
    year:     2021,
    detail:   'Discovered a critical vulnerability allowing unauthorized admin access. Prevented potential data breaches and received a direct appreciation letter from the CEO of Numeric Infotech.',
  },

  {
    id:       4,
    emoji:    '🛰️',
    title:    'ISRO / IIRS CERTIFICATION',
    subtitle: 'Geo-data Sharing & Cyber Security — IIRS ISRO 2021',
    color:    '#43A047',
    score:    500,
    rarity:   'RARE',
    cat:      'Certification',
    year:     2021,
    detail:   'Completed the official IIRS ISRO course gaining proficiency in cybersecurity protocols, threat mitigation, and geospatial data analysis.',
  },

  {
    id:       5,
    emoji:    '⚡',
    title:    'NATIONAL HACKATHON ORGANIZER',
    subtitle: 'Microsoft · Ansys · Cadre Design — ₹80,000+ sponsorships secured 2022',
    color:    '#8E24AA',
    score:    600,
    rarity:   'RARE',
    cat:      'Leadership',
    year:     2022,
    detail:   'Organised a college-level hackathon in collaboration with Microsoft, Ansys, and Cadre Design. Secured sponsorships worth over ₹80,000 and managed end-to-end event logistics.',
  },

  {
    id:       6,
    emoji:    '🎮',
    title:    'TRINITY GAMING EVENT VOLUNTEER',
    subtitle: 'Next Level — Facebook Gaming × Trinity Gaming 2022',
    color:    '#FF6B35',
    score:    350,
    rarity:   'COMMON',
    cat:      'Community',
    year:     2022,
    detail:   'Received a Certificate of Appreciation from the CEO of Trinity Gaming for organising the "Next Level" gaming event in collaboration with Facebook Gaming.',
  },
];

const RARITY_STYLES = {
  LEGENDARY: { bg:'#FFD700', border:'#B8860B', glow:'#FFD70080', text:'#000' },
  EPIC:      { bg:'#9B59B6', border:'#6C3483', glow:'#9B59B680', text:'#fff' },
  RARE:      { bg:'#049CD8', border:'#02618A', glow:'#049CD880', text:'#fff' },
  COMMON:    { bg:'#555',    border:'#333',    glow:'#55555540', text:'#fff' },
}

const ALL_CATS = ['ALL', ...Array.from(new Set(ACHIEVEMENTS.map(a => a.cat)))]

/* ─────── Badge ─────── */
function AchievementBadge({ ach, index }) {
  const [unlocked, setUnlocked] = useState(false)
  const [burst,    setBurst]    = useState(0)
  const { addScore, addCoin }   = useGame()
  const { play }                = useSound()
  const r = RARITY_STYLES[ach.rarity] || RARITY_STYLES['COMMON']

  const handle = () => {
    if (!unlocked) {
      play('powerup')
      addScore(ach.score)
      addCoin()
      setUnlocked(true)
      addToast({ title: ach.title, subtitle: ach.subtitle, emoji: ach.emoji, color: r.bg, duration: 3500 })
    } else {
      play('coin')
      addCoin()
    }
    setBurst(n => n + 1)
  }

  return (
    <div className="reveal" style={{ animationDelay: index * 0.055 + 's', position:'relative' }}>
      <div
        onClick={handle}
        style={{
          background: unlocked ? r.bg + '22' : 'rgba(0,0,0,0.72)',
          border:`3px solid ${unlocked ? r.border : '#2a2a2a'}`,
          boxShadow: unlocked ? `0 0 18px ${r.glow},4px 4px 0 #000` : '4px 4px 0 #000',
          padding:'16px 14px',
          cursor:'pointer',
          display:'flex', flexDirection:'column', alignItems:'center', gap:8,
          textAlign:'center', position:'relative', overflow:'hidden',
          minHeight:160, userSelect:'none',
          transition:'all 0.18s steps(3)',
        }}
      >
        {/* Lock overlay */}
        {!unlocked && (
          <div style={{
            position:'absolute', inset:0,
            background:'rgba(0,0,0,0.62)',
            display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter:'blur(2px)', zIndex:5,
          }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:24 }}>🔒</div>
              <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:6, color:'rgba(255,255,255,0.5)', marginTop:4 }}>
                CLICK TO UNLOCK
              </p>
            </div>
          </div>
        )}

        {/* Rarity tag */}
        <div style={{
          position:'absolute', top:0, right:0,
          background: r.bg, border:'2px solid #000', boxShadow:'-2px 2px 0 #000',
          padding:'2px 7px',
          fontFamily:"'Press Start 2P', cursive", fontSize:5,
          color: r.text,
        }}>
          {ach.rarity}
        </div>

        {/* Emoji */}
        <div style={{
          fontSize:38, filter: unlocked ? 'none' : 'grayscale(1)',
          animation: unlocked ? 'bouncePixel 0.7s steps(3) 1' : 'none',
        }}>
          {ach.emoji}
        </div>

        <p style={{
          fontFamily:"'Press Start 2P', cursive", fontSize:8,
          color: unlocked ? '#fff' : '#444',
          textShadow: unlocked ? '1px 1px 0 #000' : 'none',
          lineHeight:1.6,
        }}>
          {ach.title}
        </p>
        <p style={{
          fontFamily:"'Press Start 2P', cursive", fontSize:6,
          color: unlocked ? r.bg : '#333',
          textShadow:'1px 1px 0 #000', lineHeight:1.6,
        }}>
          {ach.subtitle}
        </p>

        {unlocked && (
          <div style={{
            background:'#000', border:'2px solid #FBD000',
            padding:'3px 10px',
            fontFamily:"'Press Start 2P', cursive", fontSize:7,
            color:'#FBD000', boxShadow:'2px 2px 0 #000',
          }}>
            +{ach.score} PTS
          </div>
        )}

        {/* Burst */}
        <div style={{ position:'absolute', top:0, left:'50%', pointerEvents:'none' }}>
          <CoinBurst trigger={burst} x="0" y="0" count={6} spread={48} />
        </div>
      </div>
    </div>
  )
}

/* ─────── Stats bar ─────── */
function StatsBar() {
  const { formattedScore, coins } = useGame()
  const unlocked = ACHIEVEMENTS.length
  return (
    <div style={{ display:'flex', gap:20, justifyContent:'center', flexWrap:'wrap', marginBottom:36 }}>
      {[
        { label:'SCORE',        val: formattedScore, color:'#FBD000' },
        { label:'COINS',        val: '×' + coins,   color:'#FFD700' },
        { label:'ACHIEVEMENTS', val: unlocked,       color:'#43B047' },
        { label:'RARITY',       val: '4 TYPES',      color:'#9B59B6' },
      ].map(s => (
        <div key={s.label} style={{
          background:'rgba(0,0,0,0.82)',
          border:`3px solid ${s.color}`,
          boxShadow:`4px 4px 0 #000,0 0 12px ${s.color}40`,
          padding:'10px 18px', textAlign:'center', minWidth:110,
        }}>
          <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:6, color:s.color, marginBottom:5 }}>{s.label}</p>
          <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:16, color:'#fff', textShadow:'2px 2px 0 #000' }}>{s.val}</p>
        </div>
      ))}
    </div>
  )
}

/* ─────── Main ─────── */
export default function Achievements() {
  const [cat, setCat] = useState('ALL')
  const { play } = useSound()

  const filtered = cat === 'ALL' ? ACHIEVEMENTS : ACHIEVEMENTS.filter(a => a.cat === cat)

  return (
    <div style={{
      minHeight:'100vh', position:'relative', overflow:'hidden', paddingTop:64,
      background:'linear-gradient(180deg,#1a1000 0%,#2a1c00 50%,#1a1000 100%)',
    }}>
      {/* Ambient coins bg */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        {Array.from({ length: 22 }).map((_, i) => (
          <div key={i} style={{
            position:'absolute',
            left:`${(i * 23 + 5) % 95}%`, top:`${(i * 41 + 3) % 85}%`,
            width:14, height:14, borderRadius:'50%',
            background:'radial-gradient(circle at 35% 35%,#FFE566,#FFD700)',
            border:'2px solid #000',
            opacity: 0.08 + (i % 5) * 0.04,
            animation:`spinCoin ${1 + (i % 3) * 0.5}s steps(4) ${(i * 0.3) % 2}s infinite`,
          }} />
        ))}
      </div>

      <div style={{ position:'relative', zIndex:10, maxWidth:980, margin:'0 auto', padding:'60px 24px 80px' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{
            display:'inline-block', background:'rgba(0,0,0,0.92)',
            border:'4px solid #FFD700',
            boxShadow:'0 0 28px #FFD70060,6px 6px 0 #000',
            padding:'12px 28px', marginBottom:14,
          }}>
            <h2 style={{
              fontFamily:"'Press Start 2P', cursive",
              fontSize:'clamp(11px,2.5vw,19px)',
              color:'#FFD700',
              textShadow:'2px 2px 0 #8B6000,0 0 14px #FFD700',
              letterSpacing:2,
            }}>
              🏆 WORLD 3-1: ACHIEVEMENTS
            </h2>
          </div>
          <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:7, color:'rgba(255,255,255,0.4)', textShadow:'1px 1px 0 #000' }}>
            CLICK BADGES TO UNLOCK &amp; COLLECT COINS!
          </p>
        </div>

        <StatsBar />

        {/* Category filter */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center', marginBottom:28 }}>
          {ALL_CATS.map(c => (
            <button
              key={c}
              onClick={() => { setCat(c); play('coin') }}
              style={{
                fontFamily:"'Press Start 2P', cursive", fontSize:7,
                color: cat === c ? '#000' : 'rgba(255,255,255,0.55)',
                background: cat === c ? '#FFD700' : 'rgba(255,255,255,0.05)',
                border:'2px solid ' + (cat === c ? '#FFD700' : 'rgba(255,255,255,0.2)'),
                boxShadow:'2px 2px 0 #000', padding:'6px 14px', cursor:'pointer',
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Badge grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:14 }}>
          {filtered.map((a, i) => (
            <AchievementBadge key={a.id} ach={a} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}