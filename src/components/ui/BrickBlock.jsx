import { useState } from 'react'
import { useGame } from '../../context/GameContext'
import { useSound } from '../../hooks/useSound'

export default function BrickBlock({ onReveal, size = 48, children }) {
  const [hit, setHit] = useState(false)
  const [bounce, setBounce] = useState(false)
  const { addScore, addCoin } = useGame()
  const { play } = useSound()

  const handleClick = () => {
    if (hit) return
    play('block')
    addScore(300)
    addCoin()
    setBounce(true)
    setTimeout(() => { setHit(true); setBounce(false); if (onReveal) onReveal() }, 250)
  }

  return (
    <div style={{ position:'relative', display:'inline-block' }}>
      <div
        onClick={handleClick}
        title={hit ? '' : 'Hit me!'}
        style={{
          width: size, height: size,
          background: hit ? '#5C3D11' : '#F8B800',
          border:'3px solid #000',
          boxShadow: hit ? '2px 2px 0 #000' : 'inset 3px 3px 0 rgba(255,255,255,0.4),inset -3px -3px 0 rgba(0,0,0,0.3),4px 4px 0 #000',
          display:'flex', alignItems:'center', justifyContent:'center',
          cursor: hit ? 'default' : 'pointer',
          fontFamily:"'Press Start 2P', monospace",
          fontSize: size * 0.42, color: hit ? '#333' : '#8B4513',
          transform: bounce ? 'translateY(-8px)' : 'translateY(0)',
          transition:'transform 0.12s steps(2),background 0.1s,box-shadow 0.1s',
          userSelect:'none',
        }}
      >
        {hit ? '▪' : '?'}
      </div>
      {hit && children && (
        <div style={{
          position:'absolute', bottom:'110%', left:'50%', transform:'translateX(-50%)',
          background:'rgba(0,0,0,0.95)', border:'2px solid #FBD000',
          boxShadow:'4px 4px 0 #000', padding:'8px 12px',
          fontFamily:"'Press Start 2P', monospace", fontSize:8, color:'#fff',
          whiteSpace:'nowrap', zIndex:50,
          animation:'popIn 0.3s cubic-bezier(0.17,0.67,0.83,0.67) forwards',
        }}>
          {children}
        </div>
      )}
    </div>
  )
}