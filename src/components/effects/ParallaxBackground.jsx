/**
 * ParallaxBackground.jsx — Performance optimised
 *
 * Key changes vs old version:
 * - Uses CSS custom properties + direct DOM style writes instead of
 *   React state (setScrollY). This means ZERO React re-renders on scroll.
 * - Stars are rendered once and never updated.
 * - Clouds and hills move via CSS transform updated directly on the DOM node.
 */
import { useEffect, useRef } from 'react'

const THEMES = {
  sky: {
    bg: 'linear-gradient(180deg,#3a6fd8 0%,#5C94FC 45%,#81B0FF 75%,#c8dbff 100%)',
    showClouds: true, showHills: true, showGround: true, showStars: false,
    groundColor: '#C84C0C', groundTop: '#E86020', groundBottom: '#8B2500',
    hillColors: ['#3a9e40','#2d7a32','#4ab84f'],
  },
  underground: {
    bg: 'linear-gradient(180deg,#000 0%,#0a0a1e 60%,#0D0D2B 100%)',
    showClouds: false, showHills: false, showGround: false, showStars: true,
    starColor: '#4444ff',
  },
  castle: {
    bg: 'linear-gradient(180deg,#0d0d1e 0%,#1a1a2e 40%,#16213e 70%,#0f3460 100%)',
    showClouds: false, showHills: false, showGround: true, showStars: true,
    groundColor: '#333', groundTop: '#444', groundBottom: '#222', starColor: '#aaaaff',
  },
  star: {
    bg: 'linear-gradient(180deg,#0e0020 0%,#1e0040 30%,#2d1b69 60%,#1a0033 100%)',
    showClouds: false, showHills: false, showGround: false, showStars: true,
    starColor: '#FBD000',
  },
  grassland: {
    bg: 'linear-gradient(180deg,#5C94FC 0%,#81B0FF 50%,#c8dbff 100%)',
    showClouds: true, showHills: true, showGround: true, showStars: false,
    groundColor: '#C84C0C', groundTop: '#E86020', groundBottom: '#8B2500',
    hillColors: ['#43B047','#2d8a35','#57cc5b'],
  },
}

const CLOUDS = [
  { w:110, h:58, left:'4%',  top:'11%', speed:0.12 },
  { w:80,  h:44, left:'24%', top:'20%', speed:0.18 },
  { w:130, h:68, left:'48%', top:'7%',  speed:0.10 },
  { w:90,  h:48, left:'70%', top:'17%', speed:0.15 },
  { w:70,  h:38, left:'88%', top:'5%',  speed:0.22 },
]
const HILLS = [
  { left:'-2%',  bottom:'6%', width:220, height:110, ci:0 },
  { left:'15%',  bottom:'4%', width:160, height:80,  ci:1 },
  { left:'34%',  bottom:'7%', width:260, height:130, ci:0 },
  { left:'58%',  bottom:'5%', width:190, height:95,  ci:2 },
  { left:'76%',  bottom:'6%', width:220, height:110, ci:1 },
  { left:'94%',  bottom:'5%', width:170, height:85,  ci:0 },
]

function PixelCloud({ w, h }) {
  return (
    <div style={{ position:'relative', width:w, height:h }}>
      <div style={{ position:'absolute', bottom:0, left:'10%', width:'80%', height:'55%', background:'#fff', border:'3px solid #000' }} />
      <div style={{ position:'absolute', bottom:'48%', left:'12%', width:'28%', height:'52%', background:'#fff', border:'3px solid #000' }} />
      <div style={{ position:'absolute', bottom:'48%', left:'30%', width:'36%', height:'72%', background:'#fff', border:'3px solid #000' }} />
      <div style={{ position:'absolute', bottom:'48%', right:'12%', width:'24%', height:'44%', background:'#fff', border:'3px solid #000' }} />
    </div>
  )
}

function StarField({ color, count = 55 }) {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left:  `${(i * 37 + 11) % 100}%`,
      top:   `${(i * 53 + 7) % 88}%`,
      size:   i % 5 === 0 ? 5 : i % 3 === 0 ? 3 : 2,
      delay: `${(i * 0.21) % 3}s`,
      dur:   `${1.2 + (i % 5) * 0.4}s`,
      bright: 0.18 + (i % 6) * 0.12,
      diamond: i % 7 === 0,
    }))
  ).current
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position:'absolute', left:s.left, top:s.top,
          width:s.size, height:s.size,
          background:color, opacity:s.bright,
          transform: s.diamond ? 'rotate(45deg)' : 'none',
          animation:`blink ${s.dur} steps(1) ${s.delay} infinite`,
        }} />
      ))}
    </div>
  )
}

export default function ParallaxBackground({ theme = 'sky' }) {
  const t          = THEMES[theme] || THEMES.sky
  const hillColors = t.hillColors  || ['#43B047','#2d8a35','#57cc5b']

  /* Refs to DOM nodes we'll move directly — no React state, no re-renders */
  const cloudRefs = useRef([])
  const hillRef   = useRef(null)
  const rafRef    = useRef(null)
  const lastY     = useRef(0)

  useEffect(() => {
    if (!t.showClouds && !t.showHills) return

    const onScroll = () => {
      if (rafRef.current) return          // already scheduled
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const y = window.scrollY
        if (Math.abs(y - lastY.current) < 1) return   // skip tiny movements
        lastY.current = y

        /* Move clouds directly via style.transform */
        cloudRefs.current.forEach((el, i) => {
          if (!el) return
          const speed = CLOUDS[i]?.speed ?? 0.15
          el.style.transform = `translateX(${-y * speed}px)`
        })

        /* Move hills layer */
        if (hillRef.current) {
          hillRef.current.style.transform = `translateX(${-y * 0.35}px)`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [t.showClouds, t.showHills])

  return (
    <div style={{
      position:'absolute', inset:0,
      background:t.bg,
      overflow:'hidden', zIndex:0, pointerEvents:'none',
    }}>
      {/* Stars */}
      {t.showStars && <StarField color={t.starColor || '#fff'} />}

      {/* Clouds */}
      {t.showClouds && CLOUDS.map((c, i) => (
        <div
          key={i}
          ref={el => cloudRefs.current[i] = el}
          style={{
            position:'absolute', left:c.left, top:c.top,
            willChange:'transform',
          }}
        >
          <PixelCloud w={c.w} h={c.h} />
        </div>
      ))}

      {/* Hills */}
      {t.showHills && (
        <div
          ref={hillRef}
          style={{
            position:'absolute', left:0, right:0, bottom:'8%',
            height:'22%', willChange:'transform',
          }}
        >
          {HILLS.map((h, i) => (
            <div key={i} style={{
              position:'absolute',
              left:h.left, bottom:h.bottom,
              width:h.width, height:h.height,
              background: hillColors[h.ci % hillColors.length],
              border:'3px solid #000',
              borderRadius:'50% 50% 0 0',
              boxShadow:'inset 8px 12px 0 rgba(255,255,255,0.18)',
            }} />
          ))}
        </div>
      )}

      {/* Ground */}
      {t.showGround && (
        <div style={{ position:'absolute', bottom:0, left:0, right:0 }}>
          <div style={{
            height:48, background:t.groundColor || '#C84C0C',
            borderTop:`6px solid ${t.groundTop || '#E86020'}`,
            borderBottom:`4px solid ${t.groundBottom || '#8B2500'}`,
            overflow:'hidden', position:'relative',
          }}>
            <div style={{
              position:'absolute', inset:0,
              background:'repeating-linear-gradient(90deg,transparent 0px,transparent 31px,rgba(0,0,0,0.18) 31px,rgba(0,0,0,0.18) 32px)',
            }} />
          </div>
          <div style={{ height:36, background:'#8B4513', borderTop:`3px solid ${t.groundColor || '#C84C0C'}` }} />
        </div>
      )}
    </div>
  )
}