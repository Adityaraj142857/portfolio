import { useRef, useEffect } from 'react'

/*
 * FloatingCoins
 * Renders `count` spinning coins at random positions.
 * Each coin has its own size, speed, delay and opacity.
 * Props:
 *   count   – number of coins (default 12)
 *   zIndex  – CSS z-index (default 2)
 *   opacity – base opacity cap (default 0.55)
 */
export default function FloatingCoins({ count = 12, zIndex = 2, opacity = 0.55 }) {
  /* Build a stable list of coin configs once */
  const coins = useRef(
    Array.from({ length: count }, (_, i) => ({
      id:      i,
      left:    `${(i * 8.3 + 2) % 97}%`,
      top:     `${(i * 13.7 + 5) % 88}%`,
      size:    12 + (i % 4) * 5,          // 12 | 17 | 22 | 27 px
      delay:   (i * 0.37) % 3,            // 0 – 2.9 s
      dur:     1.0 + (i % 5) * 0.25,      // 1.0 – 2.0 s
      spin:    0.8 + (i % 4) * 0.35,      // spin duration
      op:      0.15 + (i % 6) * (opacity / 6),
    }))
  ).current

  return (
    <div
      style={{
        position: 'absolute',
        inset:    0,
        pointerEvents: 'none',
        zIndex,
        overflow: 'hidden',
      }}
    >
      {coins.map(c => (
        <div
          key={c.id}
          style={{
            position: 'absolute',
            left:   c.left,
            top:    c.top,
            width:  c.size,
            height: c.size,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 30%, #FFE566 10%, #FFD700 55%, #B8860B 100%)',
            border: `${c.size > 18 ? 2 : 1}px solid #000`,
            boxShadow: '1px 1px 0 #000',
            opacity: c.op,
            animation:
              `float   ${c.dur}s  ease-in-out ${c.delay}s  infinite,
               spinCoin ${c.spin}s steps(4)    ${c.delay}s  infinite`,
          }}
        />
      ))}
    </div>
  )
}
