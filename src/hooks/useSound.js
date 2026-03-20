import { useCallback } from 'react'
import { useGame } from '../context/GameContext'
import { sfx } from '../utils/soundManager'

export function useSound() {
  const { soundEnabled } = useGame()

  const play = useCallback((name) => {
    if (!soundEnabled) return
    const fn = sfx[name]
    if (fn) fn()
  }, [soundEnabled])

  return { play, soundEnabled }
}