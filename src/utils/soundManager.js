/**
 * soundManager.js — Simple HTML Audio (most compatible, zero deps)
 * Files go in: public/sounds/
 *
 * Auto-pause: music stops when tab loses focus (user opens resume/external link)
 *             music resumes when user comes back to the portfolio tab
 */

const _audio = {}
let _enabled = false

const FILES = {
  coin:       '/sounds/coin.mp3',
  jump:       '/sounds/jump.mp3',
  powerup:    '/sounds/powerup.mp3',
  stageClear: '/sounds/stage-clear.mp3',
  gameOver:   '/sounds/game-over.mp3',
  pipe:       '/sounds/pipe.mp3',
  block:      '/sounds/block.mp3',
  bg:         '/sounds/bg-music.mp3',
}

/* ── Pre-create Audio objects ── */
export function initSounds() {
  Object.entries(FILES).forEach(([key, src]) => {
    try {
      const a = new Audio(src)
      a.volume  = key === 'bg' ? 0.25 : 0.55
      if (key === 'bg') a.loop = true
      a.preload = 'auto'
      _audio[key] = a
    } catch (_) {}
  })

  /* ── Auto-pause / resume when tab visibility changes ── */
  document.addEventListener('visibilitychange', () => {
    if (!_enabled) return
    const bg = _audio['bg']
    if (!bg) return
    if (document.hidden) {
      /* Tab lost focus → user switched to resume/external site → pause */
      try { bg.pause() } catch (_) {}
    } else {
      /* Tab regained focus → user came back → resume */
      try { bg.play().catch(() => {}) } catch (_) {}
    }
  })
}

/* ── Play ── */
export function playSound(name) {
  if (!_enabled) return
  const a = _audio[name]
  if (!a) return
  try {
    if (name === 'bg') {
      if (a.paused) a.play().catch(() => {})
    } else {
      const clone = a.cloneNode()
      clone.volume = a.volume
      clone.play().catch(() => {})
    }
  } catch (_) {}
}

/* ── Stop ── */
export function stopSound(name) {
  const a = _audio[name]
  if (!a) return
  try { a.pause(); a.currentTime = 0 } catch (_) {}
}

/* ── Enable / disable all sound ── */
export function setSoundEnabled(val) {
  _enabled = val
  if (val) {
    playSound('bg')
  } else {
    stopSound('bg')
  }
}

export const sfx = {
  coin:       () => playSound('coin'),
  jump:       () => playSound('jump'),
  powerup:    () => playSound('powerup'),
  stageClear: () => playSound('stageClear'),
  gameOver:   () => playSound('gameOver'),
  pipe:       () => playSound('pipe'),
  block:      () => playSound('block'),
}

export default { initSounds, playSound, stopSound, setSoundEnabled, sfx }