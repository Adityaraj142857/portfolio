/**
 * ProgressBar.jsx — Fixed
 * 
 * PROGRESS = weighted average of:
 *  - Sections visited  (6 sections  = 50% of bar)
 *  - Badges unlocked   (12 badges   = 30% of bar)
 *  - Coins collected   (20 coins    = 20% of bar)
 *
 * Starts at ~17% (Overview visited) and reaches 100% when you
 * visit all sections + unlock badges + collect coins.
 */
import { useMemo } from 'react'
import { useGame } from '../../context/GameContext'

const TOTAL_SECTIONS = 6
const TOTAL_BADGES   = 12
const COINS_TARGET   = 20

export default function ProgressBar({ style = {} }) {
  const { visitedSections = new Set(), achievements = [], coins = 0 } = useGame()

  const pct = useMemo(() => {
    const secPct   = (visitedSections.size / TOTAL_SECTIONS) * 50
    const badgePct = (Math.min(achievements.length, TOTAL_BADGES) / TOTAL_BADGES) * 30
    const coinPct  = (Math.min(coins, COINS_TARGET) / COINS_TARGET) * 20
    return Math.min(Math.round(secPct + badgePct + coinPct), 100)
  }, [visitedSections, achievements, coins])

  const barColor = pct >= 80 ? '#FFD700' : pct >= 50 ? '#43B047' : '#049CD8'

  return (
    <div style={{ fontFamily: "'Press Start 2P', monospace", ...style }}>
      {/* Label row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 6, color: 'rgba(255,255,255,0.6)', marginBottom: 4,
      }}>
        <span>PORTFOLIO</span>
        <span style={{ color: barColor }}>{pct}%</span>
      </div>

      {/* Bar */}
      <div style={{
        height: 10, background: '#111',
        border: '2px solid #000', overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: `linear-gradient(90deg, ${barColor}88, ${barColor})`,
          boxShadow: `0 0 6px ${barColor}`,
          transition: 'width 0.8s steps(8)',
        }}>
          {/* Stripe overlay */}
          <div style={{
            height: '100%',
            background: 'repeating-linear-gradient(90deg,transparent 0,transparent 8px,rgba(255,255,255,0.15) 8px,rgba(255,255,255,0.15) 10px)',
          }} />
        </div>
      </div>

      {/* Hints below bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 5, color: 'rgba(255,255,255,0.35)', marginTop: 3,
      }}>
        <span>WORLDS {visitedSections.size}/{TOTAL_SECTIONS}</span>
        <span>BADGES {achievements.length}/{TOTAL_BADGES}</span>
        <span>COINS {Math.min(coins, COINS_TARGET)}/{COINS_TARGET}</span>
      </div>

      {pct >= 100 && (
        <p style={{
          fontSize: 6, color: '#FFD700', textShadow: '1px 1px 0 #000',
          marginTop: 4, animation: 'blink 0.8s steps(1) infinite', textAlign: 'center',
        }}>
          ★ 100% COMPLETE! ★
        </p>
      )}
    </div>
  )
}