import { useState } from 'react'
import { useGame } from '../../context/GameContext'
import { useSound } from '../../hooks/useSound'
import ParallaxBackground from '../effects/ParallaxBackground'
import CoinBurst from '../effects/CoinBurst'
import { addToast } from '../ui/Toast'

/* ─────── DATA ─────── */
const EDUCATION = [
  {
    id:          1,
    degree:      'PGDBA — Business Analytics',
    institution: 'IIM CALCUTTA · IIT KHARAGPUR · ISI KOLKATA',
    year:        '2025 – 2027',
    grade:       'In Progress',
    emoji:       '🏛️',
    color:       '#1A73E8',
    world:       'WORLD 4-1',
    courses:     ['Business Analytics', 'Data Science', 'Statistics', 'Machine Learning', 'Operations Research'],
    skills:      [
      { name: 'Business Analytics',  pct: 85 },
      { name: 'Data Science',        pct: 88 },
      { name: 'Statistical Modeling',pct: 82 },
    ],
    extra: 'Joint Program across IIM Calcutta, IIT Kharagpur & ISI Kolkata',
  },

  {
    id:          2,
    degree:      'B.Tech — Computer Science Engineering',
    institution: 'MADHAV INSTITUTE OF TECHNOLOGY & SCIENCE, GWALIOR',
    year:        '2020 – 2024',
    grade:       'CGPA: 8.35',
    emoji:       '🎓',
    color:       '#E52521',
    world:       'WORLD 3-1',
    courses:     ['Data Structures', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'SQL', 'Cybersecurity'],
    skills:      [
      { name: 'Python',              pct: 90 },
      { name: 'Machine Learning',    pct: 88 },
      { name: 'Cybersecurity',       pct: 82 },
      { name: 'Problem Solving',     pct: 85 },
    ],
    extra: 'First student to identify & report a firewall vulnerability — appreciated by HoD',
  },

  {
    id:          3,
    degree:      'Class XII — CBSE',
    institution: 'GREEN WOOD PUBLIC SCHOOL, GWALIOR',
    year:        '2020',
    grade:       '93%',
    emoji:       '📘',
    color:       '#00A651',
    world:       'WORLD 2-1',
    courses:     ['Physics', 'Chemistry', 'Mathematics', 'Computer Science', 'English'],
    skills:      [
      { name: 'Mathematics',         pct: 93 },
      { name: 'Computer Science',    pct: 95 },
      { name: 'Physics',             pct: 90 },
    ],
    extra: 'Scored 93% — Strong foundation in Science & Mathematics',
  },

  {
    id:          4,
    degree:      'Class X — CBSE',
    institution: 'GREEN WOOD PUBLIC SCHOOL, GWALIOR',
    year:        '2018',
    grade:       '83%',
    emoji:       '📗',
    color:       '#FBBA00',
    world:       'WORLD 1-1',
    courses:     ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'],
    skills:      [
      { name: 'Mathematics',         pct: 85 },
      { name: 'Science',             pct: 83 },
      { name: 'English',             pct: 80 },
    ],
    extra: 'Scored 83% — Early spark for computers & problem solving',
  },
];

/* ─────── Skill Bar ─────── */
function SkillBar({ name, pct, color, visible }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{
        display:'flex', justifyContent:'space-between',
        fontFamily:"'Press Start 2P', cursive", fontSize:6,
        color:'rgba(255,255,255,0.7)', marginBottom:4,
      }}>
        <span>{name}</span>
        <span style={{ color }}>{pct}%</span>
      </div>
      <div style={{ height:10, background:'#1a1a1a', border:'2px solid #000', overflow:'hidden' }}>
        <div style={{
          height:'100%', width: visible ? pct + '%' : '0%',
          background:`linear-gradient(90deg,${color}99,${color})`,
          boxShadow:`0 0 6px ${color}`,
          transition:'width 1.2s steps(12)',
        }}>
          <div style={{
            height:'100%',
            background:'repeating-linear-gradient(90deg,transparent 0,transparent 8px,rgba(255,255,255,0.12) 8px,rgba(255,255,255,0.12) 10px)',
          }} />
        </div>
      </div>
    </div>
  )
}

/* ─────── Question Block ─────── */
function QuestionBlock({ item, onHit, onBurst }) {
  const [hit, setHit] = useState(false)
  const { play } = useSound()

  const handleClick = () => {
    if (hit) return
    play('block')
    setHit(true)
    onHit(item.id)
    onBurst()
    addToast({ title: item.extra, subtitle: item.institution, emoji: item.emoji, color: item.color })
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
      <div
        onClick={handleClick}
        style={{
          width:52, height:52,
          background: hit ? '#5C3D11' : '#F8B800',
          border:'3px solid #000',
          boxShadow: hit
            ? '2px 2px 0 #000'
            : 'inset 3px 3px 0 rgba(255,255,255,0.45),inset -3px -3px 0 rgba(0,0,0,0.3),4px 4px 0 #000',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor: hit ? 'default' : 'pointer',
          fontFamily:"'Press Start 2P', cursive",
          fontSize:24, color: hit ? '#333' : '#8B4513',
          transform: hit ? 'translateY(4px)' : 'translateY(0)',
          transition:'all 0.15s steps(2)',
          userSelect:'none',
          animation: hit ? 'none' : 'float 2s ease-in-out infinite',
        }}
      >
        {hit ? '▪' : '?'}
      </div>
      <span style={{ fontFamily:"'Press Start 2P', cursive", fontSize:6, color:'#FBD000', textShadow:'1px 1px 0 #000', whiteSpace:'nowrap' }}>
        {item.world}
      </span>
    </div>
  )
}

/* ─────── Education Card ─────── */
function EducationCard({ item, index, blockHit }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="reveal"
      style={{
        display:'flex', gap:20, alignItems:'flex-start',
        padding:'24px 0',
        borderBottom: index < EDUCATION.length - 1 ? '2px dashed rgba(255,255,255,0.15)' : 'none',
        animationDelay: index * 0.15 + 's',
      }}
    >
      {/* Year badge */}
      <div style={{ flexShrink:0, width:108, textAlign:'right' }}>
        <div style={{
          background: item.color, border:'3px solid #000', boxShadow:'3px 3px 0 #000',
          padding:'6px 10px', fontFamily:"'Press Start 2P', cursive",
          fontSize:6, color:'#fff', textShadow:'1px 1px 0 #000',
          display:'inline-block', lineHeight:1.7,
        }}>
          {item.year}
        </div>
      </div>

      {/* Timeline dot */}
      <div style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center' }}>
        <div style={{
          width:22, height:22, background:item.color,
          border:'3px solid #000', boxShadow:'2px 2px 0 #000',
          transform:'rotate(45deg)', flexShrink:0,
          animation: blockHit ? 'starSpin 0.5s steps(4) 2' : 'none',
        }} />
        {index < EDUCATION.length - 1 && (
          <div style={{
            width:4, flexGrow:1, minHeight:48,
            background:`linear-gradient(180deg,${item.color}60,rgba(255,255,255,0.08))`,
          }} />
        )}
      </div>

      {/* Card body */}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          background:'rgba(0,0,0,0.72)',
          border:`3px solid ${blockHit ? item.color : '#333'}`,
          boxShadow: blockHit ? '0 0 18px ' + item.color + '50,4px 4px 0 #000' : '4px 4px 0 #000',
          padding:18, transition:'all 0.2s steps(3)',
        }}>
          {/* Header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10, flexWrap:'wrap', gap:8 }}>
            <span style={{ fontSize:24 }}>{item.emoji}</span>
            <div style={{
              background:item.color, border:'2px solid #000',
              padding:'4px 12px', fontFamily:"'Press Start 2P', cursive",
              fontSize:8, color:'#fff', boxShadow:'2px 2px 0 #000',
            }}>
              {item.grade}
            </div>
          </div>

          <h3 style={{
            fontFamily:"'Press Start 2P', cursive",
            fontSize:'clamp(9px,2vw,12px)',
            color:'#fff', textShadow:'2px 2px 0 #000',
            marginBottom:6, lineHeight:1.6,
          }}>
            {item.degree}
          </h3>
          <p style={{
            fontFamily:"'Press Start 2P', cursive", fontSize:8,
            color:item.color, marginBottom:14, textShadow:'1px 1px 0 #000',
          }}>
            {item.institution}
          </p>

          {/* Skill bars revealed after block hit */}
          {blockHit && (
            <div style={{ marginBottom:14 }}>
              {item.skills.map(s => (
                <SkillBar key={s.name} name={s.name} pct={s.pct} color={item.color} visible={true} />
              ))}
            </div>
          )}

          {/* Buttons */}
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <button
              onClick={() => setOpen(o => !o)}
              style={{
                fontFamily:"'Press Start 2P', cursive", fontSize:7, color:'#fff',
                background:'rgba(255,255,255,0.08)', border:'2px solid rgba(255,255,255,0.25)',
                padding:'5px 12px', cursor:'pointer', boxShadow:'2px 2px 0 #000',
              }}
            >
              {open ? '▲ COURSES' : '▼ COURSES'}
            </button>
            {blockHit && (
              <div style={{
                fontFamily:"'Press Start 2P', cursive", fontSize:7,
                color:item.color, background:'rgba(0,0,0,0.5)',
                border:'2px solid ' + item.color,
                padding:'5px 12px', boxShadow:'2px 2px 0 #000',
              }}>
                ★ {item.extra}
              </div>
            )}
          </div>

          {/* Courses */}
          {open && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginTop:12, animation:'fadeIn 0.3s ease forwards' }}>
              {item.courses.map(c => (
                <span key={c} style={{
                  fontFamily:"'Press Start 2P', cursive", fontSize:6,
                  color:'#000', background:'#FBD000',
                  border:'2px solid #000', padding:'3px 8px', boxShadow:'2px 2px 0 #000',
                }}>
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────── Main ─────── */
export default function Education() {
  const { addScore, addCoin } = useGame()
  const [hitBlocks,      setHitBlocks]      = useState([])
  const [burstTriggers,  setBurstTriggers]  = useState({})

  const handleBlockHit = (id) => {
    addScore(300)
    addCoin()
    setHitBlocks(prev => [...prev, id])
  }
  const triggerBurst = (id) => {
    setBurstTriggers(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  }

  return (
    <div style={{ minHeight:'100vh', position:'relative', overflow:'hidden', paddingTop:64 }}>
      <ParallaxBackground theme="grassland" />

      {/* Brick row */}
      <div style={{
        position:'absolute', top:80, left:0, right:0,
        display:'flex', justifyContent:'center', gap:3,
        zIndex:5, pointerEvents:'none',
      }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="brick-block" style={{ width:34, height:34, flexShrink:0 }} />
        ))}
      </div>

      {/* Question blocks + bursts */}
      <div style={{
        position:'absolute', top:122, left:'50%', transform:'translateX(-50%)',
        display:'flex', gap:60, zIndex:6,
      }}>
        {EDUCATION.map(item => (
          <div key={item.id} style={{ position:'relative' }}>
            <QuestionBlock
              item={item}
              onHit={handleBlockHit}
              onBurst={() => triggerBurst(item.id)}
            />
            <CoinBurst trigger={burstTriggers[item.id]} x="50%" y="-8px" count={6} spread={44} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={{ position:'relative', zIndex:10, maxWidth:820, margin:'0 auto', padding:'220px 24px 80px' }}>

        <div className="reveal" style={{ textAlign:'center', marginBottom:44 }}>
          <div style={{
            display:'inline-block', background:'#000',
            border:'4px solid #FBD000', boxShadow:'6px 6px 0 #000',
            padding:'12px 28px', marginBottom:14,
          }}>
            <h2 style={{
              fontFamily:"'Press Start 2P', cursive",
              fontSize:'clamp(12px,2.8vw,20px)',
              color:'#FBD000', textShadow:'2px 2px 0 #8B6000,4px 4px 0 #000',
              letterSpacing:3,
            }}>
              📚 WORLD 1-1: EDUCATION
            </h2>
          </div>
          <p style={{ fontFamily:"'Press Start 2P', cursive", fontSize:8, color:'rgba(255,255,255,0.6)', textShadow:'1px 1px 0 #000' }}>
            HIT ? BLOCKS ABOVE TO REVEAL SKILL STATS!
          </p>
        </div>

        {EDUCATION.map((item, i) => (
          <EducationCard key={item.id} item={item} index={i} blockHit={hitBlocks.includes(item.id)} />
        ))}
      </div>

      {/* Ground */}
      <div style={{ position:'relative', zIndex:5 }}>
        <div className="ground-row" />
        <div style={{ height:32, background:'#8B4513', borderTop:'3px solid #C84C0C' }} />
      </div>
    </div>
  )
}
