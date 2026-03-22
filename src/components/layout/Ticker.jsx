import { useRef, useEffect, useState } from 'react'
import { getRecentCodes } from '../../data/db'

export default function Ticker() {
  const items = getRecentCodes(12)
  const ref   = useRef(null)
  const [time, setTime] = useState('')

  // Countdown to next hour
  useEffect(() => {
    const tick = () => {
      const now  = new Date()
      const next = new Date(now); next.setHours(next.getHours()+1,0,0,0)
      const diff = next - now
      const m = String(Math.floor(diff/60000)).padStart(2,'0')
      const s = String(Math.floor((diff%60000)/1000)).padStart(2,'0')
      setTime(`${m}:${s}`)
    }
    tick(); const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const text = items.map(c => `  ✦  🎁 ${c.code} → ${c.reward}  (${c.gameSlug.replace(/-/g,' ')})`).join('')

  return (
    <div style={{
      position:'fixed', top:64, left:0, right:0, zIndex:998, height:30,
      background:'linear-gradient(90deg,rgba(0,229,255,0.08),rgba(192,38,211,0.06),rgba(0,229,255,0.08))',
      borderBottom:'1px solid rgba(0,229,255,0.1)',
      display:'flex', alignItems:'center', overflow:'hidden',
    }}>
      {/* Label */}
      <div style={{
        flexShrink:0, padding:'0 14px',
        fontFamily:'var(--font-display)', fontSize:'.6rem', fontWeight:700,
        letterSpacing:'1.5px', color:'var(--cyan)',
        borderRight:'1px solid rgba(0,229,255,0.12)',
        display:'flex', alignItems:'center', gap:6, height:'100%',
        background:'rgba(0,229,255,0.05)',
      }}>
        <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', display:'inline-block', boxShadow:'0 0 6px var(--green)' }} />
        LIVE
      </div>

      {/* Scrolling text */}
      <div style={{ flex:1, overflow:'hidden', position:'relative' }}>
        <div ref={ref} style={{
          display:'inline-block', whiteSpace:'nowrap',
          fontFamily:'var(--font-display)', fontSize:'.6rem', letterSpacing:'0.5px',
          color:'rgba(0,229,255,0.6)',
          animation:'ticker 60s linear infinite',
        }}>
          {text}{text}
        </div>
      </div>

      {/* Next update */}
      <div style={{
        flexShrink:0, padding:'0 12px',
        fontFamily:'var(--font-mono)', fontSize:'.6rem',
        color:'rgba(255,255,255,0.3)',
        borderLeft:'1px solid rgba(0,229,255,0.1)',
        height:'100%', display:'flex', alignItems:'center', gap:5,
      }}>
        🔄 {time}
      </div>
    </div>
  )
}
