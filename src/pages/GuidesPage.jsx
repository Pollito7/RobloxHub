import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import SEO from '../components/ui/SEO'
import { AdBanner } from '../components/ui/AdSense'
import { guides, GUIDE_CATS } from '../data/guides'

const DC = { Principiante:'var(--green)', Intermedio:'var(--yellow)', Avanzado:'var(--red)', Todos:'var(--cyan)' }

export default function GuidesPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('Todos')
  const filtered = guides.filter(g => {
    const ms = g.title.toLowerCase().includes(q.toLowerCase()) || g.description.toLowerCase().includes(q.toLowerCase())
    const mc = cat === 'Todos' || g.category === cat
    return ms && mc
  })
  return (
    <>
      <SEO title="Guías de Roblox 2024" desc="8 guías completas sobre Roblox: Studio, Blox Fruits, Fisch, Sol's RNG, Lua scripting y más. Escritas por expertos." path="/guias"/>
      <div style={{ paddingTop:94 }}>
        <div style={{ background:'linear-gradient(135deg,rgba(192,38,211,0.07),rgba(0,229,255,0.05))',borderBottom:'1px solid var(--border)',padding:'56px 0 40px',textAlign:'center' }}>
          <div className="container">
            <div style={{ fontSize:'2.5rem',marginBottom:12 }}>📚</div>
            <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.8rem,5vw,2.8rem)',fontWeight:900,background:'linear-gradient(90deg,#c026d3,#00e5ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:10 }}>
              Guías de Roblox
            </h1>
            <p style={{ color:'var(--text-2)',maxWidth:500,margin:'0 auto',fontSize:'1rem' }}>
              {guides.length} guías completas · Desarrollo, economía, juegos específicos y más
            </p>
          </div>
        </div>
        <div className="container" style={{ padding:'32px 20px 80px' }}>
          <AdBanner style={{ marginBottom:24 }}/>
          <div style={{ display:'flex',gap:10,flexWrap:'wrap',marginBottom:20 }}>
            <div className="search-wrap" style={{ flex:1,minWidth:200 }}>
              <Search size={15} className="search-icon"/>
              <input className="input" placeholder="Buscar guías..." value={q} onChange={e=>setQ(e.target.value)}/>
            </div>
            <div style={{ display:'flex',gap:6,flexWrap:'wrap' }}>
              {GUIDE_CATS.map(c=>(
                <button key={c} onClick={()=>setCat(c)} style={{ padding:'8px 14px',borderRadius:8,fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.82rem',cursor:'pointer',border:'1px solid',transition:'all .2s',borderColor:cat===c?'var(--purple)':'var(--border)',background:cat===c?'rgba(192,38,211,0.1)':'transparent',color:cat===c?'var(--purple)':'var(--text-2)' }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ color:'var(--text-3)',fontSize:'.82rem',marginBottom:20 }}>{filtered.length} guía{filtered.length!==1?'s':''}</div>
          <div className="grid-3">
            {filtered.map(g=>(
              <Link key={g.slug} to={`/guias/${g.slug}`} style={{ textDecoration:'none' }}>
                <div className="card" style={{ padding:20,height:'100%',display:'flex',flexDirection:'column',cursor:'pointer' }}>
                  <div style={{ width:50,height:50,borderRadius:13,background:'linear-gradient(135deg,rgba(192,38,211,0.2),rgba(0,229,255,0.15))',border:'1px solid rgba(192,38,211,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.6rem',marginBottom:14 }}>{g.emoji}</div>
                  <div style={{ display:'flex',gap:5,flexWrap:'wrap',marginBottom:8 }}>
                    <span style={{ padding:'2px 8px',borderRadius:99,background:'rgba(192,38,211,0.1)',border:'1px solid rgba(192,38,211,0.2)',fontSize:'.65rem',color:'var(--purple)',fontFamily:'var(--font-ui)',fontWeight:700 }}>{g.category}</span>
                    <span style={{ padding:'2px 8px',borderRadius:99,background:'rgba(255,255,255,0.04)',border:'1px solid var(--border)',fontSize:'.65rem',color:DC[g.difficulty]||'var(--text-3)',fontFamily:'var(--font-ui)',fontWeight:600 }}>{g.difficulty}</span>
                    {g.isNew && <span className="badge badge-new">NUEVO</span>}
                  </div>
                  <h3 style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.93rem',color:'var(--text)',flex:1,lineHeight:1.4,marginBottom:8 }}>{g.title}</h3>
                  <p style={{ color:'var(--text-3)',fontSize:'.8rem',lineHeight:1.5,marginBottom:14,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden' }}>{g.description}</p>
                  <div style={{ display:'flex',justifyContent:'space-between',paddingTop:12,borderTop:'1px solid var(--border)',fontSize:'.73rem' }}>
                    <span style={{ color:'var(--text-3)' }}>⏱️ {g.readTime}</span>
                    <span style={{ color:'var(--purple)',fontWeight:700 }}>Leer →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
