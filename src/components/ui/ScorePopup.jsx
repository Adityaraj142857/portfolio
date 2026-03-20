/**
 * ScorePopup.jsx  — Phase 4
 * Global overlay that shows floating "+100" style numbers
 * whenever score is earned. Call  showScorePopup(pts, x, y)  from anywhere.
 */
import { useState, useEffect, useCallback } from 'react'

/* ── Module-level event bus ── */
let _listeners = []
let _uid = 0

export function showScorePopup(pts, x, y) {
  const id = ++_uid
  _listeners.forEach(fn => fn({ id, pts, x, y }))
}

/* ── Single floating number ── */
function Popup({ item, onDone }) {
  const [alive, setAlive] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => { setAlive(false); setTimeout(() => onDone(item.id), 350) }, 900)
    return () => clearTimeout(t)
  }, []) // eslint-disable-line

  const color = item.pts >= 500 ? '#FFD700' : item.pts >= 200 ? '#43B047' : '#fff'

  return (
    <div
      style={{
        position:   'fixed',
        left:        item.x,
        top:         item.y,
        transform:  'translateX(-50%)',
        fontFamily: "'Press Start 2P', cursive",
        fontSize:    item.pts >= 500 ? 16 : item.pts >= 200 ? 13 : 11,
        color,
        textShadow: `2px 2px 0 #000, 0 0 8px ${color}`,
        pointerEvents: 'none',
        zIndex:      9997,
        whiteSpace: 'nowrap',
        opacity:     alive ? 1 : 0,
        animation:  'scorePop 1.25s ease-out forwards',
        transition: 'opacity 0.35s ease',
        userSelect: 'none',
      }}
    >
      +{item.pts}
    </div>
  )
}

/* ── Container — mount once in App.jsx ── */
export default function ScorePopupContainer() {
  const [popups, setPopups] = useState([])

  useEffect(() => {
    const handler = (item) => setPopups(prev => [...prev.slice(-8), item]) // max 8 at once
    _listeners.push(handler)
    return () => { _listeners = _listeners.filter(fn => fn !== handler) }
  }, [])

  const remove = useCallback((id) => {
    setPopups(prev => prev.filter(p => p.id !== id))
  }, [])

  return (
    <>
      {popups.map(p => (
        <Popup key={p.id} item={p} onDone={remove} />
      ))}
    </>
  )
}
