import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Gamepad2, BookOpen, Hash } from 'lucide-react'
import { GAMES, CODES } from '../../data/db'
import { guides } from '../../data/guides'

const QUICK = [
  { label:'Blox Fruits',  path:'/codigos/blox-fruits',  emoji:'🍎' },
  { label:'Arsenal',       path:'/codigos/arsenal',       emoji:'🔫' },
  { label:'Fisch',         path:'/codigos/fisch',         emoji:'🎣' },
  { label:'Guía Studio',   path:'/guias/como-hacer-un-juego-en-roblox', emoji:'🎮' },
]

export default function SearchModal({ onClose }) {
  const [q, setQ] = useState('')
  const [res, setRes] = useState([])
  const nav = useNavigate()
  const ref = useRef()
  useEffect(() => { ref.current?.focus() }, [])

  useEffect(() => {
    if (q.trim().length < 2) { setRes([]); return }
    const ql = q.toLowerCase()
    const gameR = GAMES.filter(g => g.name.toLowerCase().includes(ql))
      .map(g => ({ emoji:g.emoji, title:`Códigos de ${g.name}`, sub:`${CODES[g.slug]?.filter(c=>c.status==='active').length||0} activos`, path:`/codigos/${g.slug}`, type:'game' }))
    const guideR = (guides||[]).filter(g => g.title.toLowerCase().includes(ql) || g.description?.toLowerCase().includes(ql))
      .map(g => ({ emoji:g.emoji, title:g.title, sub:g.readTime, path:`/guias/${g.slug}`, type:'guide' }))
    const codeR = []
    Object.entries(CODES).forEach(([slug, codes]) => {
      const game = GAMES.find(g=>g.slug===slug)
      codes.filter(c=>c.status==='active'&&c.code.toLowerCase().includes(ql)).slice(0,2)
        .forEach(c=>codeR.push({ emoji:'🎁', title:c.code, sub:`${c.reward} · ${game?.name}`, path:`/codigos/${slug}`, type:'code' }))
    })
    setRes([...codeR, ...gameR, ...guideR].slice(0,8))
  }, [q])

  const go = (path) => { nav(path); onClose() }

  return (
    <div onClick={onClose} style={{
      position:'fixed',inset:0,zIndex:2000,
      background:'rgba(0,0,0,0.88)',backdropFilter:'blur(12px)',
      display:'flex',alignItems:'flex-start',justifyContent:'center',
      padding:'5rem 16px 16px',
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:'var(--bg-card)', border:'1px solid rgba(0,229,255,0.2)',
        borderRadius:20, width:'100%', maxWidth:600, overflow:'hidden',
        boxShadow:'0 32px 80px rgba(0,0,0,0.9), 0 0 60px rgba(0,229,255,0.06)',
      }}>
        {/* Input */}
        <div style={{ display:'flex',alignItems:'center',gap:12,padding:'14px 18px',borderBottom:'1px solid var(--border)' }}>
          <Search size={20} color="var(--cyan)" style={{ flexShrink:0 }} />
          <input ref={ref} value={q} onChange={e=>setQ(e.target.value)}
            placeholder="Buscar juegos, guías, códigos..."
            style={{ flex:1,background:'none',border:'none',outline:'none',color:'var(--text)',fontFamily:'var(--font-ui)',fontSize:'1.05rem' }}
          />
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.07)',border:'1px solid var(--border)',borderRadius:6,padding:'3px 8px',color:'var(--text-3)',cursor:'pointer',fontFamily:'var(--font-display)',fontSize:'.62rem',letterSpacing:'1px' }}>ESC</button>
        </div>

        {/* Results */}
        <div style={{ maxHeight:440, overflowY:'auto', padding:8 }}>
          {res.length > 0 ? res.map((r,i) => (
            <button key={i} onClick={()=>go(r.path)} style={{
              width:'100%',display:'flex',alignItems:'center',gap:12,
              padding:'10px 12px',background:'transparent',border:'none',
              borderRadius:12,cursor:'pointer',textAlign:'left',transition:'background .15s',
            }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(0,229,255,0.06)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}
            >
              <span style={{ fontSize:'1.5rem',flexShrink:0 }}>{r.emoji}</span>
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.9rem',color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{r.title}</div>
                <div style={{ color:'var(--text-3)',fontSize:'.73rem',marginTop:2,display:'flex',alignItems:'center',gap:4 }}>
                  {r.type==='game'?<Gamepad2 size={10}/>:r.type==='guide'?<BookOpen size={10}/>:<Hash size={10}/>}
                  {r.type==='game'?'Juego':r.type==='guide'?'Guía':'Código'} · {r.sub}
                </div>
              </div>
              <span style={{ color:'var(--text-3)',fontSize:'.9rem' }}>›</span>
            </button>
          )) : q.length >= 2 ? (
            <div style={{ padding:'2rem',textAlign:'center',color:'var(--text-3)' }}>
              <div style={{ fontSize:'2rem',marginBottom:8 }}>🔍</div>
              <p style={{ fontSize:'.88rem' }}>Sin resultados para "<strong style={{color:'var(--text)'}}>{q}</strong>"</p>
            </div>
          ) : (
            <div style={{ padding:'16px' }}>
              <div style={{ fontFamily:'var(--font-display)',fontSize:'.62rem',letterSpacing:'2px',color:'var(--text-3)',marginBottom:10 }}>ACCESOS RÁPIDOS</div>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:6 }}>
                {QUICK.map(item=>(
                  <button key={item.path} onClick={()=>go(item.path)} style={{
                    display:'flex',alignItems:'center',gap:8,padding:'10px 12px',
                    background:'rgba(255,255,255,0.03)',border:'1px solid var(--border)',
                    borderRadius:10,cursor:'pointer',textAlign:'left',transition:'all .15s',
                    color:'var(--text-2)',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.85rem',
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,255,0.2)';e.currentTarget.style.background='rgba(0,229,255,0.05)'}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='rgba(255,255,255,0.03)'}}
                  >
                    <span>{item.emoji}</span>{item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
