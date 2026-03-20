import { useState } from 'react'
import { useSound } from '../../hooks/useSound'

export default function WarpPipe({ targetId, label, color = '#2BA94C', darkColor = '#1A6B2F', height = 80 }) {
  const [hovered, setHovered] = useState(false)
  const { play } = useSound()

  const handleClick = () => {
    play('pipe')
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      style={{ display:'flex', flexDirection:'column', alignItems:'center', cursor:'pointer', gap:4 }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label && (
        <div style={{
          fontFamily:"'Press Start 2P', monospace", fontSize:7,
          color: hovered ? '#FBD000' : 'rgba(255,255,255,0.7)',
          textShadow:'1px 1px 0 #000', textAlign:'center', marginBottom:2,
        }}>
          {label}
        </div>
      )}
      <div style={{
        width: hovered ? 72 : 64, height:24,
        background:`linear-gradient(90deg,${darkColor},${color},#5DE87A,${color},${darkColor})`,
        border:'3px solid #000', boxShadow: hovered ? `0 0 12px ${color},4px 4px 0 #000` : '4px 4px 0 #000',
        transition:'all 0.1s steps(2)',
      }} />
      <div style={{
        width: hovered ? 56 : 48, height: hovered ? height + 8 : height,
        background:`linear-gradient(90deg,${darkColor},${color},${color},${darkColor})`,
        border:'3px solid #000', borderTop:'none',
        transition:'all 0.1s steps(2)',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        {hovered && (
          <span style={{ fontFamily:"'Press Start 2P', monospace", fontSize:10, color:'#fff', animation:'bouncePixel 0.4s steps(2) infinite' }}>↓</span>
        )}
      </div>
    </div>
  )
}