import { useEffect } from 'react'

export default function Modal({ open, onClose, title = '', emoji = '⭐', color = '#FBD000', children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position:'fixed', inset:0, zIndex:9500,
        background:'rgba(0,0,0,0.78)',
        display:'flex', alignItems:'center', justifyContent:'center', padding:24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background:'#0a0a0a', border:`4px solid ${color}`,
          boxShadow:`0 0 40px ${color}50,8px 8px 0 #000`,
          maxWidth:520, width:'100%', padding:32, position:'relative',
        }}
      >
        <button onClick={onClose} style={{
          position:'absolute', top:12, right:12,
          fontFamily:"'Press Start 2P', monospace", fontSize:10,
          color:'#fff', background:'#333', border:'2px solid #000',
          boxShadow:'2px 2px 0 #000', width:28, height:28, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>✕</button>

        <div style={{ fontSize:48, textAlign:'center', marginBottom:12 }}>{emoji}</div>
        {title && (
          <h3 style={{
            fontFamily:"'Press Start 2P', monospace", fontSize:'clamp(12px,2.5vw,16px)',
            color, textShadow:`2px 2px 0 #000`, textAlign:'center', marginBottom:20, lineHeight:1.5,
          }}>{title}</h3>
        )}
        <div style={{ height:3, background:`linear-gradient(90deg,transparent,${color},transparent)`, marginBottom:20 }} />
        <div>{children}</div>
        <div style={{ textAlign:'center', marginTop:24 }}>
          <button onClick={onClose} style={{
            fontFamily:"'Press Start 2P', monospace", fontSize:9,
            color:'#000', background:color, border:'3px solid #000',
            boxShadow:'4px 4px 0 #000', padding:'8px 24px', cursor:'pointer',
          }}>CLOSE ✕</button>
        </div>
      </div>
    </div>
  )
}