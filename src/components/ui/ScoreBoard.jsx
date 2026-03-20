import { useGame } from '../../context/GameContext'

/* Heart / Life icon */
function LifeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 8 8">
      <rect x="1" y="0" width="2" height="1" fill="#E52521"/>
      <rect x="5" y="0" width="2" height="1" fill="#E52521"/>
      <rect x="0" y="1" width="8" height="3" fill="#E52521"/>
      <rect x="0" y="4" width="7" height="1" fill="#E52521"/>
      <rect x="1" y="5" width="5" height="1" fill="#E52521"/>
      <rect x="2" y="6" width="3" height="1" fill="#E52521"/>
      <rect x="3" y="7" width="1" height="1" fill="#E52521"/>
    </svg>
  )
}

/* Coin icon */
function CoinIcon({ spin = false }) {
  return (
    <span
      className={`inline-block w-4 h-4 rounded-full border border-black ${spin ? 'animate-spin-coin' : ''}`}
      style={{
        background: 'radial-gradient(circle at 35% 35%, #FFE566, #FFD700, #B8860B)',
        boxShadow: '1px 1px 0 #000',
        flexShrink: 0,
      }}
    />
  )
}

export default function ScoreBoard() {
  const { formattedScore, formattedCoins, lives, currentWorld } = useGame()

  return (
    <>
      {/* MARIO label */}
      <div className="hud-item">
        <span className="hud-label">MARIO</span>
        <span className="hud-value" style={{ color: '#fff', fontSize: '13px' }}>
          {formattedScore}
        </span>
      </div>

      <div className="hud-divider" />

      {/* Coins */}
      <div className="hud-item flex-row items-center gap-1" style={{ flexDirection: 'row', alignItems: 'center', gap: '6px', minWidth: 'auto' }}>
        <CoinIcon spin />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span className="hud-label">COINS</span>
          <span className="hud-value" style={{ fontSize: '12px' }}>×{formattedCoins}</span>
        </div>
      </div>

      <div className="hud-divider" />

      {/* World */}
      <div className="hud-item">
        <span className="hud-label">WORLD</span>
        <span className="hud-value" style={{ fontSize: '10px', color: '#FBD000' }}>
          {currentWorld}
        </span>
      </div>

      <div className="hud-divider" />

      {/* Lives */}
      <div className="hud-item" style={{ flexDirection: 'row', alignItems: 'center', gap: '6px', minWidth: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span className="hud-label">LIVES</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {Array.from({ length: Math.min(lives, 5) }).map((_, i) => (
              <LifeIcon key={i} />
            ))}
            {lives > 5 && (
              <span className="hud-label" style={{ color: '#fff' }}>+{lives - 5}</span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}