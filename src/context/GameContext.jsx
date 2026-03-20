import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const GameContext = createContext(null)
const LS_KEY = 'mario-portfolio-highscore'

export function GameProvider({ children }) {
  const [score,          setScore]          = useState(0)
  const [highScore,      setHighScore]      = useState(() => {
    try { return parseInt(localStorage.getItem(LS_KEY) || '0', 10) } catch { return 0 }
  })
  const [coins,          setCoins]          = useState(0)
  const [lives,          setLives]          = useState(3)
  const [currentWorld,   setCurrentWorld]   = useState('WORLD 0-0')
  const [soundEnabled,   setSoundEnabled]   = useState(false)
  const [achievements,   setAchievements]   = useState([])
  const [isLoading,      setIsLoading]      = useState(true)
  const [activeSection,  setActiveSection]  = useState('overview')
  const [sessionTime,    setSessionTime]    = useState(0)
  /* Track which sections the user has actually visited */
  const [visitedSections, setVisitedSections] = useState(new Set(['overview']))

  /* Session timer */
  useEffect(() => {
    const t = setInterval(() => setSessionTime(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  /* Persist high score */
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      try { localStorage.setItem(LS_KEY, String(score)) } catch {}
    }
  }, [score, highScore])

  const addScore = useCallback((pts = 100) => setScore(p => p + pts), [])

  const addCoin = useCallback(() => {
    setCoins(prev => {
      const next = prev + 1
      if (next % 100 === 0) setLives(l => l + 1)
      return next
    })
    setScore(prev => prev + 200)
  }, [])

  const toggleSound = useCallback(() => setSoundEnabled(p => !p), [])

  const unlockAchievement = useCallback((id, label) => {
    setAchievements(prev => {
      if (prev.find(a => a.id === id)) return prev
      return [...prev, { id, label, unlockedAt: Date.now() }]
    })
    addScore(500)
  }, [addScore])

  const goToWorld = useCallback((worldName, sectionId) => {
    setCurrentWorld(worldName)
    setActiveSection(sectionId)
    /* Mark section as visited */
    setVisitedSections(prev => {
      if (prev.has(sectionId)) return prev
      const next = new Set(prev)
      next.add(sectionId)
      return next
    })
    addScore(50)
  }, [addScore])

  const resetScore = useCallback(() => {
    setScore(0); setCoins(0); setLives(3)
  }, [])

  const formattedScore   = String(score).padStart(6, '0')
  const formattedCoins   = String(coins).padStart(2, '0')
  const formattedHiScore = String(highScore).padStart(6, '0')

  return (
    <GameContext.Provider value={{
      score, highScore, coins, lives, currentWorld,
      soundEnabled, achievements, isLoading, activeSection,
      sessionTime, visitedSections,
      formattedScore, formattedCoins, formattedHiScore,
      addScore, addCoin, toggleSound, unlockAchievement,
      goToWorld, setIsLoading, setCurrentWorld, setActiveSection, resetScore,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>')
  return ctx
}