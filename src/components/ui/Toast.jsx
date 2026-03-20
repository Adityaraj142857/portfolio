import { useState, useEffect, useCallback, useRef } from 'react'

/* ─────────────────────────────────────────────
   TOAST STORE  (module-level singleton)
   Components call addToast() from anywhere.
   ───────────────────────────────────────────── */
let _listeners = []
let _idCounter = 0

export function addToast({ title, subtitle = '', emoji = '⭐', color = '#FBD000', duration = 3000 }) {
  const id = ++_idCounter
  _listeners.forEach(fn => fn({ id, title, subtitle, emoji, color, duration }))
  return id
}

/* ─────────────────────────────────────────────
   SINGLE TOAST ITEM
   ───────────────────────────────────────────── */
function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    /* slide in */
    const t1 = setTimeout(() => setVisible(true), 20)
    /* start leaving */
    const t2 = setTimeout(() => setLeaving(true), toast.duration - 300)
    /* remove */
    const t3 = setTimeout(() => onRemove(toast.id), toast.duration)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        fontFamily:    "'Press Start 2P', cursive",
        background:    'rgba(0,0,0,0.95)',
        border:        `3px solid ${toast.color}`,
        boxShadow:     `0 0 20px ${toast.color}60, 4px 4px 0 #000`,
        padding:       '12px 18px',
        display:       'flex',
        alignItems:    'center',
        gap:            12,
        minWidth:       260,
        maxWidth:       360,
        transform:      visible && !leaving ? 'translateX(0)' : 'translateX(120%)',
        opacity:        visible && !leaving ? 1 : 0,
        transition:    'transform 0.25s steps(4), opacity 0.25s ease',
        cursor:        'pointer',
        userSelect:    'none',
      }}
      onClick={() => { setLeaving(true); setTimeout(() => onRemove(toast.id), 300) }}
    >
      {/* Emoji / icon */}
      <div style={{
        fontSize:   28,
        flexShrink:  0,
        animation:  'bouncePixel 0.6s steps(3) 1',
      }}>
        {toast.emoji}
      </div>

      {/* Text */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <p style={{
          fontSize:    8,
          color:       toast.color,
          marginBottom: 4,
          textShadow:  '1px 1px 0 #000',
          whiteSpace:  'nowrap',
          overflow:    'hidden',
          textOverflow:'ellipsis',
        }}>
          ★ ACHIEVEMENT UNLOCKED
        </p>
        <p style={{
          fontSize:   10,
          color:      '#fff',
          textShadow: '2px 2px 0 #000',
          lineHeight:  1.5,
        }}>
          {toast.title}
        </p>
        {toast.subtitle && (
          <p style={{
            fontSize:   7,
            color:      'rgba(255,255,255,0.55)',
            marginTop:   4,
            textShadow: '1px 1px 0 #000',
          }}>
            {toast.subtitle}
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div style={{
        position:  'absolute',
        bottom:     0, left: 0, right: 0,
        height:     3,
        background: 'rgba(255,255,255,0.1)',
        overflow:  'hidden',
      }}>
        <div style={{
          height:    '100%',
          background: toast.color,
          animation: `loadFill ${toast.duration}ms linear forwards`,
        }} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TOAST CONTAINER  — mount once in App.jsx
   ───────────────────────────────────────────── */
export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  useEffect(() => {
    const handler = (toast) => setToasts(prev => [...prev, toast])
    _listeners.push(handler)
    return () => { _listeners = _listeners.filter(fn => fn !== handler) }
  }, [])

  return (
    <div
      style={{
        position:       'fixed',
        bottom:          24,
        right:           24,
        zIndex:          9998,
        display:        'flex',
        flexDirection:  'column-reverse',
        gap:             10,
        pointerEvents:  'none',
      }}
    >
      {toasts.map(t => (
        <div key={t.id} style={{ pointerEvents: 'auto' }}>
          <ToastItem toast={t} onRemove={remove} />
        </div>
      ))}
    </div>
  )
}
