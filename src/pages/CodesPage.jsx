import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import SEO from '../components/ui/SEO'
import { AdBanner } from '../components/ui/AdSense'
import { GAMES, CODES, CATEGORIES } from '../data/db'

export default function CodesPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Todos')
  const filtered = GAMES.filter(g => {
    const ms = g.name.toLowerCase().includes(q.toLowerCase())
    const mc = cat==='Todos' || g.category===cat
    return ms && mc
  })
  return (
    <>
      <SEO title="Códigos de Roblox 2024" desc="Todos los códigos activos para 18+ juegos de Roblox. Actualizados cada hora con IA. Copia con un clic." path="/codigos"/>
      <div style={{ paddingTop:94 }}>
        <div style={{ background:'linear-gradient(135deg,rgba(0,229,255,0.06),rgba(192,38,211,0.05))',borderBottom:'1px solid var(--border)',padding:'56px 0 40px',textAlign:'center' }}>
          <div className="container">
            <div style={{ fontSize:'2.5rem',marginBottom:12 }}>🎁</div>
            <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.8rem,5vw,2.8rem)',fontWeight:900,background:'var(--grad-brand)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:10 }}>
              Códigos de Roblox 2024
            </h1>
            <p style={{ color:'var(--text-2)',maxWidth:500,margin:'0 auto',fontSize:'1rem' }}>
              {GAMES.length} juegos · Actualizados con IA cada hora · Todos verificados
            </p>
          </div>
        </div>
        <div className="container" style={{ padding:'32px 20px 80px' }}>
          <AdBanner style={{ marginBottom:24 }}/>
          <div style={{ display:'flex',gap:12,flexWrap:'wrap',marginBottom:20 }}>
            <div className="search-wrap" style={{ flex:1,minWidth:200 }}>
              <Search size={16} className="search-icon"/>
              <input className="input" placeholder="Buscar juego..." value={q} onChange={e=>setQ(e.target.value)}/>
            </div>
            <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>
              {CATEGORIES.map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{ padding:'8px 14px',borderRadius:8,fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.82rem',cursor:'pointer',border:'1px solid',transition:'all .2s',borderColor:cat===c?'var(--cyan)':'var(--border)',background:cat===c?'rgba(0,229,255,0.1)':'transparent',color:cat===c?'var(--cyan)':'var(--text-2)' }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ color:'var(--text-3)',fontSize:'.82rem',marginBottom:16 }}>{filtered.length} juego{filtered.length!==1?'s':''} encontrado{filtered.length!==1?'s':''}</div>
          {filtered.length > 0 ? (
            <div className="grid-5">
              {filtered.map(g => {
                const active = CODES[g.slug]?.filter(c=>c.status==='active').length||0
                return (
                  <Link key={g.slug} to={`/codigos/${g.slug}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ cursor:'pointer' }}>
                      <div style={{ height:90,background:g.gradient,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.5rem',position:'relative' }}>
                        {g.emoji}
                        {g.hot&&<span style={{ position:'absolute',top:6,right:6,background:'rgba(249,115,22,0.9)',borderRadius:99,padding:'1px 7px',fontSize:'.58rem',fontFamily:'var(--font-display)',fontWeight:700,color:'#fff' }}>🔥</span>}
                        <span style={{ position:'absolute',top:6,left:6,background:'rgba(0,0,0,0.6)',borderRadius:99,padding:'1px 7px',fontSize:'.58rem',fontFamily:'var(--font-display)',color:'rgba(255,255,255,0.8)' }}>{g.category}</span>
                      </div>
                      <div style={{ padding:'10px 12px' }}>
                        <div style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.9rem',color:'var(--text)',marginBottom:4 }}>{g.name}</div>
                        <div style={{ display:'flex',justifyContent:'space-between' }}>
                          <span style={{ color:'var(--text-3)',fontSize:'.72rem' }}>👥 {g.players}</span>
                          <span style={{ color:'var(--green)',fontSize:'.72rem',fontWeight:700 }}>✅ {active}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div style={{ textAlign:'center',padding:'4rem',color:'var(--text-3)' }}>
              <div style={{ fontSize:'3rem',marginBottom:12 }}>🔍</div>
              <p>No se encontraron juegos para "{q}"</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
