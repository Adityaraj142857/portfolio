import { useState } from 'react'
import { useGame } from '../../context/GameContext'
import { useSound } from '../../hooks/useSound'
import ParallaxBackground from '../effects/ParallaxBackground'
import CoinBurst from '../effects/CoinBurst'
import { addToast } from '../ui/Toast'

/* ─────── DATA ─────── */
const ROLES = [
  {
    id:      1,
    role:    'TRAINING & PLACEMENT COORDINATOR',
    org:     'MITS Gwalior — Madhav Institute of Technology & Science',
    period:  '2023 – 2024',
    emoji:   '🎯',
    color:   '#FFD700',
    points:  [
      'Coordinated with recruiters from top tech and core companies to drive campus placements',
      'Organized career workshops, mock interview sessions, and resume-building clinics for students',
      'Published official placement reports and managed communication during recruitment drives',
      'Guided students through end-to-end placement prep — from applications to offer letters',
    ],
    skills:  ['Recruitment Coordination', 'Event Management', 'Communication', 'Career Coaching'],
    impact:  'BATCH PLACED IN TECH & CORE COMPANIES',
    score:   600,
  },

  {
    id:      2,
    role:    'ML / AI INTERN',
    org:     'Techies Shubhdeeep',
    period:  '2022',
    emoji:   '🤖',
    color:   '#049CD8',
    points:  [
      'Designed, trained, and deployed end-to-end ML and deep learning models using Python',
      'Applied NLP and Computer Vision techniques across multiple production-level tasks',
      'Leveraged Agile/Scrum methodology to coordinate across cross-functional teams',
      'Built automated data pipelines and predictive models to drive business impact',
    ],
    skills:  ['Python', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Power BI', 'SQL'],
    impact:  'END-TO-END ML MODELS DEPLOYED',
    score:   750,
  },

  {
    id:      3,
    role:    'CYBERSECURITY INTERN',
    org:     'Gurugram Cyber Cell',
    period:  '2021',
    emoji:   '🛡️',
    color:   '#E52521',
    points:  [
      'Conducted vulnerability assessments, penetration testing, and risk analysis on live systems',
      'Performed simulated cyber-attacks to understand real-world attack vectors',
      'Applied threat mitigation strategies in coordination with law enforcement professionals',
      'Acquired hands-on experience in cybersecurity best practices in a government setting',
    ],
    skills:  ['Penetration Testing', 'Vulnerability Assessment', 'Threat Mitigation', 'Risk Analysis'],
    impact:  'REAL-WORLD THREAT ANALYSIS CONDUCTED',
    score:   800,
  },

  {
    id:      4,
    role:    'ACADEMIC INTERN',
    org:     'Bhautiki Plus',
    period:  '2020',
    emoji:   '📚',
    color:   '#43A047',
    points:  [
      'Delivered comprehensive instructional support and managed academic activities',
      'Mentored students individually and coordinated educational workshops',
      'Contributed to the Research & Development team on collaborative projects',
      'Fostered academic growth and enhanced learning outcomes for enrolled students',
    ],
    skills:  ['Mentoring', 'Instructional Design', 'R&D', 'Workshop Coordination'],
    impact:  'STUDENTS MENTORED & WORKSHOPS DELIVERED',
    score:   350,
  },
];

/* ─────── Animated Flag Pole ─────── */
function FlagPole({ color, reached, height = 130 }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:32, flexShrink:0 }}>
      {/* Flag */}
      <div style={{
        width:26, height:18,
        background: reached ? color : '#333',
        border:'2px solid #000',
        boxShadow: reached ? `0 0 10px ${color}` : 'none',
        transition:'all 0.4s steps(4)',
        clipPath:'polygon(0 0,100% 25%,100% 75%,0 100%)',
        marginBottom:2,
        animation: reached ? 'heartbeat 2s ease-in-out infinite' : 'none',
      }} />
      {/* Pole */}
      <div style={{
        width:4,
        height: reached ? height : height * 0.35,
        background:'#aaa',
        border:'1px solid #000',
        transition:'height 0.6s steps(8)',
      }} />
      {/* Base */}
      <div style={{ width:18, height:10, background:'#8B4513', border:'2px solid #000' }} />
    </div>
  )
}

/* ─────── Skill Tag ─────── */
function SkillTag({ label, color }) {
  return (
    <span style={{
      fontFamily:"'Press Start 2P', cursive", fontSize:6,
      color:'#000', background:color,
      border:'2px solid #000', padding:'3px 8px',
      boxShadow:'2px 2px 0 #000',
    }}>
      {label}
    </span>
  )
}

/* ─────── Role Card ─────── */
function RoleCard({ role, index }) {
  const [reached, setReached] = useState(false)
  const [burst,   setBurst]   = useState(0)
  const { addScore }          = useGame()
  const { play }              = useSound()
  const isLeft = index % 2 === 0

  const handleReach = () => {
    if (reached) return
    play('stageClear')
    addScore(role.score)
    setReached(true)
    setBurst(n => n + 1)
    addToast({ title: role.role, subtitle: role.impact, emoji: role.emoji, color: role.color, duration: 4000 })
  }

  return (
    <div
      className="reveal"
      style={{
        display:'flex', alignItems:'flex-start', gap:16,
        flexDirection: isLeft ? 'row' : 'row-reverse',
        animationDelay: index * 0.15 + 's',
      }}
    >
      {/* Card */}
      <div
        onClick={handleReach}
        style={{
          flex:1,
          background:'rgba(0,0,0,0.78)',
          border:`3px solid ${reached ? role.color : '#333'}`,
          boxShadow: reached ? `0 0 20px ${role.color}50,4px 4px 0 #000` : '4px 4px 0 #000',
          padding:20, cursor: reached ? 'default' : 'pointer',
          transition:'all 0.25s steps(3)',
        }}
      >
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10, flexWrap:'wrap', gap:8 }}>
          <span style={{ fontSize:28 }}>{role.emoji}</span>
          <div style={{
            background: reached ? role.color : '#333',
            border:'2px solid #000', padding:'4px 12px',
            fontFamily:"'Press Start 2P', cursive", fontSize:7,
            color:'#fff', boxShadow:'2px 2px 0 #000',
            transition:'background 0.2s steps(2)',
          }}>
            {role.period}
          </div>
        </div>

        <h3 style={{
          fontFamily:"'Press Start 2P', cursive",
          fontSize:'clamp(9px,2vw,12px)',
          color: reached ? '#fff' : '#777',
          textShadow: reached ? '2px 2px 0 #000' : 'none',
          marginBottom:6, lineHeight:1.6,
        }}>
          {role.role}
        </h3>
        <p style={{
          fontFamily:"'Press Start 2P', cursive", fontSize:8,
          color: reached ? role.color : '#444',
          marginBottom:14, textShadow:'1px 1px 0 #000',
        }}>
          {role.org}
        </p>

        {/* Points */}
        <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:9 }}>
          {role.points.map((pt, i) => (
            <li key={i} style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
              <span style={{ color: role.color, flexShrink:0, fontSize:10 }}>▶</span>
              <p style={{
                fontFamily:"'Press Start 2P', cursive", fontSize:7,
                color: reached ? 'rgba(255,255,255,0.85)' : '#444',
                lineHeight:1.8,
              }}>
                {pt}
              </p>
            </li>
          ))}
        </ul>

        {/* Skills gained */}
        {reached && (
          <div style={{ marginTop:14 }}>
            <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:6, color:'rgba(255,255,255,0.5)', marginBottom:8 }}>
              SKILLS GAINED:
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {role.skills.map(s => <SkillTag key={s} label={s} color={role.color} />)}
            </div>
          </div>
        )}

        {/* Impact badge */}
        {reached && (
          <div style={{
            marginTop:14, display:'inline-block',
            background:'#000', border:`2px solid ${role.color}`,
            padding:'5px 14px',
            fontFamily:"'Press Start 2P', cursive", fontSize:7,
            color: role.color, boxShadow:`2px 2px 0 #000,0 0 8px ${role.color}40`,
            animation:'popIn 0.4s cubic-bezier(0.17,0.67,0.83,0.67) forwards',
          }}>
            🏆 {role.impact}
          </div>
        )}

        {!reached && (
          <p style={{
            fontFamily:"'Press Start 2P', cursive", fontSize:7,
            color:'#333', marginTop:14,
            animation:'blink 1.5s steps(1) infinite',
          }}>
            CLICK TO RAISE THE FLAG!
          </p>
        )}
      </div>

      {/* Flag pole */}
      <div style={{ paddingTop:8, position:'relative' }}>
        <FlagPole color={role.color} reached={reached} />
        <div style={{ position:'absolute', top:-4, left:'50%', transform:'translateX(-50%)', pointerEvents:'none' }}>
          <CoinBurst trigger={burst} x="0" y="0" count={8} spread={50} />
        </div>
      </div>
    </div>
  )
}

/* ─────── Castle turret decoration ─────── */
function Turret({ color = '#555' }) {
  return (
    <svg width="56" height="72" viewBox="0 0 28 36">
      <rect x="0"  y="0"  width="7"  height="9"  fill={color} stroke="#000" strokeWidth="1"/>
      <rect x="10" y="0"  width="8"  height="9"  fill={color} stroke="#000" strokeWidth="1"/>
      <rect x="21" y="0"  width="7"  height="9"  fill={color} stroke="#000" strokeWidth="1"/>
      <rect x="0"  y="9"  width="28" height="27" fill={color} stroke="#000" strokeWidth="1"/>
      <rect x="9"  y="14" width="10" height="11" fill="#000"/>
      <rect x="11" y="16" width="6"  height="7"  fill="#FBD000" opacity="0.5"/>
    </svg>
  )
}

/* ─────── Main ─────── */
export default function Responsibility() {
  return (
    <div style={{ minHeight:'100vh', position:'relative', overflow:'hidden', paddingTop:64 }}>
      <ParallaxBackground theme="castle" />

      {/* Castle turrets */}
      <div style={{ position:'absolute', top:64, left:0, right:0, display:'flex', justifyContent:'space-between', zIndex:1, pointerEvents:'none' }}>
        <div style={{ display:'flex', gap:4 }}>
          <Turret color="#555"/><Turret color="#444"/>
        </div>
        <div style={{ display:'flex', gap:4 }}>
          <Turret color="#444"/><Turret color="#555"/>
        </div>
      </div>

      <div style={{ position:'relative', zIndex:10, maxWidth:820, margin:'0 auto', padding:'100px 24px 80px' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign:'center', marginBottom:48 }}>
          <div style={{
            display:'inline-block', background:'rgba(0,0,0,0.92)',
            border:'4px solid #C87941',
            boxShadow:'0 0 22px #8B451340,6px 6px 0 #000',
            padding:'12px 28px',
          }}>
            <h2 style={{
              fontFamily:"'Press Start 2P', cursive",
              fontSize:'clamp(10px,2.2vw,17px)',
              color:'#C87941', textShadow:'2px 2px 0 #000',
              letterSpacing:2,
            }}>
              🏰 WORLD 4-1: POSITIONS
            </h2>
          </div>
          <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:7, color:'rgba(255,255,255,0.35)', marginTop:16 }}>
            CLICK CARDS TO RAISE THE FLAG &amp; CLAIM YOUR VICTORY!
          </p>
        </div>

        {/* Role cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:44 }}>
          {ROLES.map((role, i) => (
            <RoleCard key={role.id} role={role} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
