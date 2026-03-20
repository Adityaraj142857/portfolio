import { useEffect, useState, useCallback } from 'react'

/*
 * PixelTransition
 *
 * Wraps the entire app and provides a black-block curtain wipe
 * whenever `trigger` changes.
 *
 * Usage in App.jsx:
 *   <PixelTransition trigger={activeSection}>
 *     {children}
 *   </PixelTransition>
 *
 * Props:
 *   trigger   – any value; a new transition fires on every change
 *   children  – content rendered underneath the curtain
 *   cols      – grid columns (default 10)
 *   rows      – grid rows    (default 6)
 *   duration  – ms for the whole wipe (default 600)
 */
export default function PixelTransition({
  trigger,
  children,
  cols     = 10,
  rows     = 6,
  duration = 600,
}) {
  const total          = cols * rows
  const delayPerBlock  = duration / total / 2   // stagger each block

  /* 'idle' | 'in' | 'out' */
  const [phase, setPhase] = useState('idle')
  const [prevTrigger, setPrevTrigger] = useState(trigger)

  useEffect(() => {
    if (trigger === prevTrigger) return
    setPrevTrigger(trigger)

    /* Phase 1: blocks slide IN (cover screen) */
    setPhase('in')

    /* Phase 2: blocks slide OUT (reveal screen) */
    const t1 = setTimeout(() => setPhase('out'), duration)

    /* Phase 3: done */
    const t2 = setTimeout(() => setPhase('idle'), duration * 2)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [trigger])   // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      {children}

      {/* Curtain grid — only rendered during transitions */}
      {phase !== 'idle' && (
        <div
          style={{
            position: 'fixed',
            inset:    0,
            display:  'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows:    `repeat(${rows}, 1fr)`,
            zIndex:   9000,
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: total }, (_, i) => {
            const delay = i * delayPerBlock
            return (
              <div
                key={i}
                style={{
                  background: '#000',
                  transform:
                    phase === 'in'  ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin:
                    phase === 'in'  ? 'top'       : 'bottom',
                  transition: `transform ${duration / total}ms steps(4) ${delay}ms`,
                }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
