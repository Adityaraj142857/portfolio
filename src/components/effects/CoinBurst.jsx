import { useEffect, useState } from 'react'

/*
 * CoinBurst
 * Drop <CoinBurst trigger={n} /> anywhere.
 * Every time `trigger` changes (and is truthy) a burst fires.
 *
 * Props:
 *   trigger  – any value; burst fires whenever this changes to truthy
 *   x        – left CSS value for burst origin  (default '50%')
 *   y        – top  CSS value for burst origin  (default '0px')
 *   count    – number of coin particles (default 8)
 *   color    – coin colour (default '#FFD700')
 *   size     – coin diameter px (default 14)
 *   spread   – max pixel spread  (default 60)
 *   onDone   – callback when all particles have faded
 */
export default function CoinBurst({
  trigger,
  x       = '50%',
  y       = '0px',
  count   = 8,
  color   = '#FFD700',
  size    = 14,
  spread  = 60,
  onDone,
}) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!trigger) return

    const pts = Array.from({ length: count }, (_, i) => {
      const angle  = (360 / count) * i                 // evenly spread
      const rad    = (angle * Math.PI) / 180
      const dist   = spread * (0.6 + Math.random() * 0.4)
      return {
        id:  `${Date.now()}-${i}`,
        dx:  Math.cos(rad) * dist,
        dy:  Math.sin(rad) * dist - spread * 0.3,      // bias upward
      }
    })

    setParticles(pts)

    const t = setTimeout(() => {
      setParticles([])
      if (onDone) onDone()
    }, 700)

    return () => clearTimeout(t)
  }, [trigger])   // eslint-disable-line react-hooks/exhaustive-deps

  if (particles.length === 0) return null

  return (
    <div
      style={{
        position: 'absolute',
        left:     x,
        top:      y,
        width:    0,
        height:   0,
        pointerEvents: 'none',
        zIndex:   100,
      }}
    >
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width:    size,
            height:   size,
            marginLeft: -size / 2,
            marginTop:  -size / 2,
            borderRadius: '50%',
            background:
              `radial-gradient(circle at 35% 30%, #FFE566, ${color}, #B8860B)`,
            border:     '2px solid #000',
            boxShadow:  `0 0 4px ${color}`,
            /* keyframe defined inline via Web Animations-style vars */
            animation:  'coinBurstParticle 0.65s ease-out forwards',
            '--tx': `${p.dx}px`,
            '--ty': `${p.dy}px`,
          }}
        />
      ))}

      {/* Inline keyframe using <style> tag inside the component */}
      <style>{`
        @keyframes coinBurstParticle {
          0%   { transform: translate(0,0)                    scale(1);   opacity: 1; }
          60%  { transform: translate(var(--tx), var(--ty))   scale(1);   opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty))   scale(0);   opacity: 0; }
        }
      `}</style>
    </div>
  )
}
