import { useGame } from '../../context/GameContext'
import { setSoundEnabled } from '../../utils/soundManager'

export default function SoundToggle() {
  const { soundEnabled, toggleSound } = useGame()

  const handle = () => {
    toggleSound()
    setSoundEnabled(!soundEnabled)
  }

  return (
    <button
      onClick={handle}
      title={soundEnabled ? 'Mute' : 'Enable Sound'}
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize:    14,
        background:  soundEnabled ? '#43B047' : '#555',
        color:      '#fff',
        border:     '2px solid #000',
        boxShadow:  '2px 2px 0 #000',
        padding:    '5px 10px',
        cursor:     'pointer',
        flexShrink:  0,
        lineHeight:   1,
      }}
    >
      {soundEnabled ? '🔊' : '🔇'}
    </button>
  )
}