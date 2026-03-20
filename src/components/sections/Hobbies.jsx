import { useState, useRef } from 'react'
import { useGame } from '../../context/GameContext'
import { useSound } from '../../hooks/useSound'
import ParallaxBackground from '../effects/ParallaxBackground'
import CoinBurst from '../effects/CoinBurst'
import { addToast } from '../ui/Toast'

/* ─────── DATA ─────── */
const HOBBIES = [
  {
    id:    1,
    name:  'PLAYING PIANO',
    emoji: '🎹',
    color: '#FFD700',
    level: 7,
    xp:    700,
    desc:  '2+ years of self-driven piano practice. Working through classical and contemporary pieces — the one skill that has nothing to do with a terminal but everything to do with patience and precision.',
    tags:  ['Classical', 'Contemporary', 'Self-Taught', 'Music Theory'],
    stat:  '2+ YEARS OF PRACTICE',
  },

  {
    id:    2,
    name:  'READING FICTION',
    emoji: '📚',
    color: '#E52521',
    level: 8,
    xp:    800,
    desc:  'Always mid-book. Fiction is the original world-building engine — characters, plot twists, and narrative arcs that no dataset can replicate. Ask for a recommendation at your own risk.',
    tags:  ['Fiction', 'Novels', 'Storytelling', 'World Building'],
    stat:  'ALWAYS MID-BOOK',
  },

  {
    id:    3,
    name:  'TECH EXPLORATION',
    emoji: '🔭',
    color: '#049CD8',
    level: 9,
    xp:    950,
    desc:  'Constant rabbit-hole diver into LLMs, GenAI, cybersecurity exploits, and whatever dropped on arXiv this week. If it is bleeding-edge and slightly dangerous, it is already in a browser tab.',
    tags:  ['LLMs', 'GenAI', 'Cybersecurity', 'Research Papers', 'Open Source'],
    stat:  'ALWAYS A TAB TOO MANY OPEN',
  },

  {
    id:    4,
    name:  'WATCHING ANIME',
    emoji: '🎌',
    color: '#43A047',
    level: 8,
    xp:    820,
    desc:  'Enthusiastic watcher with strong opinions on story arcs and animation quality. Anime taught patience, strategy, and the importance of a good villain — transferable skills, clearly.',
    tags:  ['Shonen', 'Seinen', 'Story Arcs', 'Animation'],
    stat:  'ASK FOR RECOMMENDATIONS',
  },
];

/* ─────── XP bar ─────── */
function XPBar({ level, color, powered }) {
  const pct = level * 10
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', fontFamily:"'Press Start 2P', cursive", fontSize:6, color:'rgba(255,255,255,0.6)', marginBottom:4 }}>
        <span>LVL {level}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div style={{ height:12, background:'#1a1a1a', border:'2px solid #000', overflow:'hidden' }}>
        <div style={{
          height:'100%', width: powered ? pct + '%' : '20%',
          background:`linear-gradient(90deg,${color}88,${color})`,
          boxShadow: powered ? `0 0 8px ${color}` : 'none',
          transition:'width 1.1s steps(11), box-shadow 0.3s',
        }}>
          <div style={{
            height:'100%',
            background:'repeating-linear-gradient(90deg,transparent 0,transparent 8px,rgba(255,255,255,0.15) 8px,rgba(255,255,255,0.15) 10px)',
          }} />
        </div>
      </div>
    </div>
  )
}

/* ─────── Star rating row ─────── */
function StarRow({ level, color, powered }) {
  return (
    <div style={{ display:'flex', gap:3 }}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          style={{
            width:9, height:9,
            background: i < level ? color : '#222',
            border:'1px solid #000',
            transform:'rotate(45deg)',
            boxShadow: i < level && powered ? `0 0 5px ${color}` : 'none',
            transition:`background 0.08s steps(1) ${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ─────── Hobby card ─────── */
function HobbyCard({ hobby, index }) {
  const [powered,  setPowered]  = useState(false)
  const [burst,    setBurst]    = useState(0)
  const { addScore, addCoin }   = useGame()
  const { play }                = useSound()

  const handlePower = () => {
    play('powerup')
    addScore(200)
    addCoin()
    const wasOff = !powered
    setPowered(p => !p)
    if (wasOff) {
      setBurst(n => n + 1)
      addToast({ title: hobby.name, subtitle: hobby.stat, emoji: hobby.emoji, color: hobby.color, duration: 3000 })
    }
  }

  return (
    <div className="reveal" style={{ animationDelay: index * 0.08 + 's', position:'relative' }}>
      <div
        onClick={handlePower}
        style={{
          background: powered
            ? `linear-gradient(135deg,${hobby.color}28,rgba(0,0,0,0.85))`
            : 'rgba(0,0,0,0.72)',
          border:`3px solid ${powered ? hobby.color : '#2a2a2a'}`,
          boxShadow: powered
            ? `0 0 26px ${hobby.color}55,0 0 60px ${hobby.color}15,4px 4px 0 #000`
            : '4px 4px 0 #000',
          padding:20, cursor:'pointer', position:'relative', overflow:'hidden',
          transition:'all 0.2s steps(3)', userSelect:'none', minHeight:240,
        }}
      >
        {/* Star field inside card when powered */}
        {powered && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            position:'absolute',
            left:`${10 + (i * 37) % 80}%`, top:`${5 + (i * 29) % 70}%`,
            width:6, height:6, background:hobby.color,
            transform:'rotate(45deg)', opacity:0.4,
            animation:`float ${2 + i % 3}s ease-in-out ${i * 0.15}s infinite`,
            pointerEvents:'none',
          }} />
        ))}

        {/* Shimmer when powered */}
        {powered && (
          <div style={{
            position:'absolute', inset:0,
            background:`linear-gradient(135deg,transparent 35%,${hobby.color}12 50%,transparent 65%)`,
            animation:'slideIn 1.8s ease infinite',
            pointerEvents:'none',
          }} />
        )}

        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
          <div style={{
            fontSize: powered ? 36 : 28,
            transition:'font-size 0.15s steps(2)',
            animation: powered ? 'bouncePixel 0.6s steps(3) infinite' : 'none',
          }}>
            {hobby.emoji}
          </div>
          <StarRow level={hobby.level} color={hobby.color} powered={powered} />
        </div>

        <h3 style={{
          fontFamily:"'Press Start 2P', cursive",
          fontSize:'clamp(8px,1.8vw,11px)',
          color: powered ? '#fff' : '#888',
          textShadow: powered ? `2px 2px 0 #000,0 0 8px ${hobby.color}` : '1px 1px 0 #000',
          marginBottom:8, lineHeight:1.6,
        }}>
          {hobby.name}
        </h3>

        <p style={{
          fontFamily:"'Press Start 2P', cursive", fontSize:7,
          color: powered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.35)',
          lineHeight:1.9, marginBottom:12,
        }}>
          {hobby.desc}
        </p>

        {/* XP bar */}
        <div style={{ marginBottom:10 }}>
          <XPBar level={hobby.level} color={hobby.color} powered={powered} />
        </div>

        {/* Stat badge */}
        {powered && (
          <div style={{
            fontFamily:"'Press Start 2P', cursive", fontSize:7,
            color:'#000', background: hobby.color,
            border:'2px solid #000', padding:'4px 10px',
            boxShadow:'2px 2px 0 #000', display:'inline-block',
            marginBottom:10,
            animation:'popIn 0.35s cubic-bezier(0.17,0.67,0.83,0.67) forwards',
          }}>
            ⭐ {hobby.stat}
          </div>
        )}

        {/* Tags */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
          {hobby.tags.map(t => (
            <span key={t} style={{
              fontFamily:"'Press Start 2P', cursive", fontSize:5,
              color: powered ? '#000' : '#555',
              background: powered ? hobby.color : '#1a1a1a',
              border:'2px solid #000', padding:'2px 7px',
              boxShadow:'1px 1px 0 #000',
              transition:'all 0.15s steps(2)',
            }}>
              {t}
            </span>
          ))}
        </div>

        {!powered && (
          <p style={{
            fontFamily:"'Press Start 2P', cursive", fontSize:6,
            color:'#333', marginTop:10,
            animation:'blink 1.5s steps(1) infinite',
          }}>
            ⭐ CLICK TO POWER UP!
          </p>
        )}
      </div>

      {/* Burst */}
      <div style={{ position:'absolute', top:0, left:'50%', pointerEvents:'none' }}>
        <CoinBurst trigger={burst} x="0" y="0" count={7} spread={52} color="#FBD000" />
      </div>
    </div>
  )
}

/* ─────── Main ─────── */
export default function Hobbies() {
  return (
    <div style={{ minHeight:'100vh', position:'relative', overflow:'hidden', paddingTop:64 }}>
      <ParallaxBackground theme="star" />

      {/* Big background stars */}
      <div style={{ position:'absolute', top:80, right:40, fontSize:48, animation:'starSpin 4s linear infinite', opacity:0.12, pointerEvents:'none' }}>⭐</div>
      <div style={{ position:'absolute', bottom:160, left:30, fontSize:32, animation:'starSpin 6s linear reverse infinite', opacity:0.10, pointerEvents:'none' }}>⭐</div>
      <div style={{ position:'absolute', top:'40%', right:'8%', fontSize:24, animation:'float 3s ease-in-out infinite', opacity:0.08, pointerEvents:'none' }}>⭐</div>

      <div style={{ position:'relative', zIndex:10, maxWidth:980, margin:'0 auto', padding:'60px 24px 80px' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{
            display:'inline-block', background:'rgba(0,0,0,0.92)',
            border:'4px solid #FBD000',
            boxShadow:'0 0 28px #FBD00050,6px 6px 0 #000',
            padding:'12px 28px',
          }}>
            <h2 style={{
              fontFamily:"'Press Start 2P', cursive",
              fontSize:'clamp(10px,2.2vw,17px)',
              color:'#FBD000',
              textShadow:'2px 2px 0 #000,0 0 18px #FBD000',
              letterSpacing:2,
            }}>
              ⭐ WORLD 5-1: HOBBIES
            </h2>
          </div>
          <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:7, color:'rgba(255,255,255,0.35)', marginTop:16 }}>
            CLICK CARDS TO ACTIVATE STAR POWER!
          </p>
        </div>

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:24 }}>
          {HOBBIES.map((hobby, i) => (
            <HobbyCard key={hobby.id} hobby={hobby} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
