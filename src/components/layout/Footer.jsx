/**
 * Footer.jsx — Phase 5+6
 * Added: session stats, progress bar, social links, 
 *        game-over style score summary.
 */
import { useGame }    from '../../context/GameContext'
import ProgressBar    from '../ui/ProgressBar'

/* ── format mm:ss ── */
function formatTime(secs) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
}

/* ── Social link button ── */
function SocialBtn({ label, href, color = '#FBD000' }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? '_self' : '_blank'}
      rel="noreferrer"
      onClick={e => e.stopPropagation()}
      style={{
        fontFamily: "'Press Start 2P', cursive",
        fontSize:    8,
        color:      '#000',
        background:  color,
        border:     '3px solid #000',
        boxShadow:  '3px 3px 0 #000',
        padding:    '7px 16px',
        textDecoration: 'none',
        display:    'inline-block',
        transition: 'all 0.1s steps(2)',
        cursor:     'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translate(2px,2px)'
        e.currentTarget.style.boxShadow = '1px 1px 0 #000'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = '3px 3px 0 #000'
      }}
    >
      {label}
    </a>
  )
}

export default function Footer() {
  const { formattedScore, formattedHiScore, coins, achievements, sessionTime } = useGame()

  return (
    <footer style={{
      background:  '#000',
      borderTop:  '4px solid #FBD000',
      fontFamily: "'Press Start 2P', cursive",
      overflow:   'hidden',
    }}>
      {/* Ground row */}
      <div className="ground-row" />

      {/* ── Score card ── */}
      <div style={{
        maxWidth:  800,
        margin:   '0 auto',
        padding:  '36px 24px 28px',
        textAlign: 'center',
      }}>
        {/* GAME OVER banner */}
        <div style={{
          display:   'inline-block',
          background: '#E52521',
          border:    '4px solid #000',
          boxShadow: '6px 6px 0 #000',
          padding:   '10px 28px',
          marginBottom: 28,
        }}>
          <p style={{
            fontSize:    'clamp(14px,3vw,22px)',
            color:       '#fff',
            textShadow:  '2px 2px 0 #8B0000,4px 4px 0 #000',
            letterSpacing: 4,
          }}>
            GAME  CLEAR !
          </p>
        </div>

        {/* Stats grid */}
        <div style={{
          display:        'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))',
          gap:             16,
          marginBottom:    28,
        }}>
          {[
            { label:'SCORE',       val: formattedScore,              color:'#FBD000' },
            { label:'HI-SCORE',    val: formattedHiScore,            color:'#E52521' },
            { label:'COINS',       val: String(coins).padStart(3,'0'), color:'#FFD700' },
            { label:'BADGES',      val: String(achievements.length).padStart(2,'0'), color:'#9B59B6' },
            { label:'TIME',        val: formatTime(sessionTime),     color:'#43B047' },
            { label:'RANK',        val: coins >= 50 ? 'S' : coins >= 25 ? 'A' : 'B', color:'#43B047' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.04)',
              border:    `2px solid ${s.color}40`,
              padding:   '12px 8px',
            }}>
              <p style={{ fontSize:6, color: s.color, marginBottom:6 }}>{s.label}</p>
              <p style={{
                fontSize:  s.label === 'RANK' ? 22 : 15,
                color:    '#fff',
                textShadow:'2px 2px 0 #000',
              }}>
                {s.val}
              </p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ maxWidth: 480, margin: '0 auto 28px' }}>
          <ProgressBar />
        </div>

        {/* Thank you */}
        <p style={{
          fontSize:    10,
          color:      '#fff',
          textShadow: '2px 2px 0 #000',
          marginBottom: 24,
          animation:  'blink 1s steps(1) infinite',
        }}>
          ✨ THANK YOU FOR PLAYING! ✨
        </p>

        {/* Social links — EDIT THESE */}
        <div style={{ display:'flex', justifyContent:'center', gap:12, flexWrap:'wrap', marginBottom:24 }}>
          <SocialBtn label="GITHUB"   href="https://github.com/Adityaraj142857/"          color="#333" />
          <SocialBtn label="LINKEDIN" href="https://linkedin.com/in/aditya-raj-shukla-b021121ab"       color="#049CD8" />
          {/* <SocialBtn label="TWITTER"  href="https://twitter.com/yourhandle"            color="#1DA1F2" /> */}
          <SocialBtn label="EMAIL"    href="mailto:adityashukla.cat@gmail.com"                    color="#E52521" />
          <SocialBtn label="RESUME"   href="/resume.pdf"                               color="#43B047" />
        </div>

        {/* Legal */}
        <p style={{ fontSize:6, color:'#444', marginBottom:6 }}>
          © {new Date().getFullYear()} ADITYA RAJ SHUKLA — BUILT WITH ❤️ &amp; ☕
        </p>
        <p style={{ fontSize:5, color:'#2a2a2a' }}>
          NOT AFFILIATED WITH NINTENDO. SUPER MARIO IS A TRADEMARK OF NINTENDO CO., LTD.
        </p>
      </div>
    </footer>
  )
}













