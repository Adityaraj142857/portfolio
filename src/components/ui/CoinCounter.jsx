import { useEffect, useState } from 'react'
import { useGame } from '../../context/GameContext'

export default function CoinCounter({ showLabel = true, size = 'md' }) {
  const { coins, formattedCoins } = useGame()
  const [pop, setPop] = useState(false)

  useEffect(() => {
    if (coins === 0) return
    setPop(true)
    const t = setTimeout(() => setPop(false), 300)
    return () => clearTimeout(t)
  }, [coins])

  const s = size === 'lg' ? { coin:28, font:16 } : size === 'sm' ? { coin:14, font:8 } : { coin:20, font:12 }

  return (
    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
      <div style={{
        width: s.coin, height: s.coin, borderRadius:'50%',
        background:'radial-gradient(circle at 35% 35%,#FFE566,#FFD700,#B8860B)',
        border:'2px solid #000',
        boxShadow: pop ? '0 0 8px #FFD700' : '1px 1px 0 #000',
        animation:'spinCoin 1.2s steps(4) infinite',
        flexShrink:0,
      }} />
      <span style={{
        fontFamily:"'Press Start 2P', monospace", fontSize: s.font,
        color:'#fff', textShadow:'2px 2px 0 #000',
        transform: pop ? 'scale(1.3)' : 'scale(1)',
        transition:'transform 0.15s steps(2)', display:'inline-block',
      }}>
        ×{formattedCoins}
      </span>
      {showLabel && (
        <span style={{ fontFamily:"'Press Start 2P', monospace", fontSize:7, color:'#FBD000', textShadow:'1px 1px 0 #000' }}>
          COINS
        </span>
      )}
    </div>
  )
}