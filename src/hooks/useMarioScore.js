import { useEffect, useRef } from 'react'
import { useGame } from '../context/GameContext'

/**
 * Automatically increases score as the user scrolls.
 * Each 100px of new scroll distance = +10 points.
 */
export function useMarioScore() {
  const { addScore } = useGame()
  const lastY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastY.current

      if (delta > 100) {
        addScore(10)
        lastY.current = currentY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [addScore])
}