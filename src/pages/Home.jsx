import { Link } from 'react-router-dom'
import { Zap, ArrowRight, Sparkles, Code, BookOpen, Trophy, Shield, Clock, Star } from 'lucide-react'
import SEO from '../components/ui/SEO'
import { AdBanner, AdInline } from '../components/ui/AdSense'
import { GAMES, CODES, getRecentCodes, getTotalActive } from '../data/db'
import { getRecentGuides } from '../data/guides'

function GameCard({ g }) {
  const active = CODES[g.slug]?.filter(c=>c.status==='active').length || 0
  return (
    <Link to={`/codigos/${g.slug}`} style={{ textDecoration:'none' }}>
      <div className="card" style={{ cursor:'pointer' }}>
        <div style={{ height:100, background:g.gradient, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.8rem', position:'relative' }}>
          {g.emoji}
          {g.hot && <span style={{ position:'absolute',top:8,right:8,background:'rgba(249,115,22,0.9)',borderRadius:99,padding:'2px 8px',fontSize:'.6rem',fontFamily:'var(--font-display)',fontWeight:700,color:'#fff',letterSpacing:'1px' }}>🔥 HOT</span>}
          <span style={{ position:'absolute',top:8,left:8,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(8px)',borderRadius:99,padding:'2px 8px',fontSize:'.6rem',fontFamily:'var(--font-display)',color:'rgba(255,255,255,0.8)' }}>{g.category}</span>
        </div>
        <div style={{ padding:'12px 14px' }}>
          <div style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.95rem',color:'var(--text)',marginBottom:4 }}>{g.name}</div>
          <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <span style={{ color:'var(--text-3)',fontSize:'.75rem' }}>👥 {g.players}</span>
            <span style={{ color:'var(--green)',fontSize:'.75rem',fontWeight:700 }}>✅ {active} códigos</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function CodeRow({ c }) {
  const game = GAMES.find(g=>g.slug===c.gameSlug)
  const copy = () => { navigator.clipboard.writeText(c.code) }
  return (
    <div className="code-row active" style={{ display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8 }}>
      <div style={{ display:'flex',alignItems:'center',gap:10 }}>
        <span style={{ fontSize:'1.2rem' }}>{game?.emoji||'🎮'}</span>
        <div>
          <div style={{ display:'flex',alignItems:'center',gap:6 }}>
            <span className="code-text">{c.code}</span>
            {c.isNew && <span className="badge badge-new">NUEVO</span>}
          </div>
          <div style={{ color:'var(--text-3)',fontSize:'.75rem',marginTop:2 }}>🎁 {c.reward}</div>
        </div>
      </div>
      <div style={{ display:'flex',alignItems:'center',gap:8 }}>
        <span style={{ color:'var(--text-3)',fontSize:'.72rem',textTransform:'capitalize' }}>{c.gameSlug?.replace(/-/g,' ')}</span>
        <button onClick={copy} style={{ padding:'5px 12px',background:'rgba(0,229,255,0.1)',border:'1px solid rgba(0,229,255,0.25)',borderRadius:7,color:'var(--cyan)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.78rem',cursor:'pointer',transition:'all .2s' }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(0,229,255,0.18)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(0,229,255,0.1)'}}
          onClick={e=>{navigator.clipboard.writeText(c.code); e.target.textContent='✓ Copiado'; setTimeout(()=>e.target.textContent='📋 Copiar',1500)}}
        >📋 Copiar</button>
      </div>
    </div>
  )
}

export default function Home() {
  const recent = getRecentCodes(10)
  const recentGuides = getRecentGuides(3)
  const totalActive = getTotalActive()
  const hotGames = GAMES.filter(g=>g.hot).slice(0,4)
  const allGames = GAMES

  return (
    <>
      <SEO title="Inicio" desc={`${totalActive}+ códigos de Roblox verificados y actualizados cada hora. Blox Fruits, Fisch, Arsenal y 18 juegos más. ¡Gratis!`} />

      {/* ── HERO ── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden', paddingTop:94 }}>
        {/* Background orbs */}
        <div style={{ position:'absolute',top:'10%',left:'5%',width:500,height:500,background:'radial-gradient(circle,rgba(0,229,255,0.08),transparent)',borderRadius:'50%',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',bottom:'5%',right:'5%',width:400,height:400,background:'radial-gradient(circle,rgba(192,38,211,0.07),transparent)',borderRadius:'50%',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:800,height:400,background:'radial-gradient(ellipse,rgba(244,63,94,0.04),transparent)',pointerEvents:'none' }}/>

        <div className="container" style={{ position:'relative',zIndex:1,textAlign:'center',padding:'60px 20px' }}>
          {/* Live badge */}
          <div style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'6px 16px',background:'rgba(0,229,255,0.08)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:99,marginBottom:24,fontFamily:'var(--font-display)',fontSize:'.62rem',letterSpacing:'2px',color:'var(--cyan)' }}>
            <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--green)',display:'inline-block',boxShadow:'0 0 6px var(--green)' }}/>
            LIVE · {totalActive} CÓDIGOS ACTIVOS · ACTUALIZADO CADA HORA
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2.4rem,8vw,5.5rem)',fontWeight:900,lineHeight:1.05,marginBottom:20 }}>
            <span style={{ background:'linear-gradient(135deg,#fff 30%,rgba(255,255,255,0.7))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              El Hub #1 de
            </span>
            <br/>
            <span style={{ background:'linear-gradient(90deg,#00e5ff,#c026d3,#f43f5e)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',backgroundSize:'200%',animation:'gradShift 5s ease infinite' }}>
              Roblox en Español
            </span>
          </h1>

          <p style={{ fontSize:'clamp(.95rem,2.5vw,1.2rem)',color:'var(--text-2)',maxWidth:620,margin:'0 auto 32px',lineHeight:1.7 }}>
            Códigos verificados y actualizados automáticamente con IA, guías completas escritas por expertos
            y herramientas exclusivas para dominar{' '}
            <strong style={{ color:'var(--text)' }}>Blox Fruits, Fisch, Sol's RNG</strong> y 15+ juegos más.
          </p>

          {/* CTAs */}
          <div style={{ display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:56 }}>
            <Link to="/codigos" className="btn btn-primary btn-lg">
              <Code size={18}/> Ver Códigos Gratis
            </Link>
            <Link to="/ia" className="btn btn-outline btn-lg">
              <Sparkles size={18}/> IA en tiempo real
            </Link>
            <Link to="/guias" className="btn btn-ghost btn-lg">
              <BookOpen size={18}/> Guías
            </Link>
          </div>

          {/* Live stats */}
          <div style={{ display:'flex',justifyContent:'center',gap:32,flexWrap:'wrap' }}>
            {[
              { v:`${totalActive}+`, l:'Códigos activos', icon:'🎁', c:'var(--cyan)' },
              { v:`${GAMES.length}`,  l:'Juegos cubiertos', icon:'🎮', c:'var(--purple)' },
              { v:'8',              l:'Guías completas',  icon:'📖', c:'var(--pink)' },
              { v:'24/7',           l:'IA actualiza',     icon:'🤖', c:'var(--green)' },
            ].map(s=>(
              <div key={s.l} style={{ textAlign:'center' }}>
                <div style={{ fontSize:'1.6rem',marginBottom:4 }}>{s.icon}</div>
                <div style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,4vw,2.2rem)',fontWeight:900,color:s.c,lineHeight:1 }}>{s.v}</div>
                <div style={{ color:'var(--text-3)',fontSize:'.75rem',marginTop:4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AD ── */}
      <div className="container"><AdBanner /></div>

      {/* ── HOT GAMES ── */}
      <section className="section">
        <div className="container">
          <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:32,flexWrap:'wrap',gap:12 }}>
            <div>
              <div className="section-label"><Zap size={12}/>Tendencia</div>
              <h2 className="section-title" style={{ background:'var(--grad-brand)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
                Juegos más populares
              </h2>
            </div>
            <Link to="/codigos" className="btn btn-ghost btn-sm">Ver los {GAMES.length} juegos <ArrowRight size={14}/></Link>
          </div>
          <div className="grid-4">
            {hotGames.map(g=><GameCard key={g.slug} g={g}/>)}
          </div>
        </div>
      </section>

      {/* ── RECENT CODES ── */}
      <section className="section--sm" style={{ background:'var(--bg-2)' }}>
        <div className="container">
          <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:24,flexWrap:'wrap',gap:12 }}>
            <div>
              <div className="section-label" style={{ color:'var(--green)' }}>
                <span style={{ width:6,height:6,borderRadius:'50%',background:'var(--green)',display:'inline-block',boxShadow:'0 0 6px var(--green)' }}/>
                Verificados
              </div>
              <h2 className="section-title">Últimos Códigos Activos</h2>
            </div>
            <Link to="/codigos" className="btn btn-ghost btn-sm">Ver todos <ArrowRight size={14}/></Link>
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
            {recent.map((c,i)=><CodeRow key={i} c={c}/>)}
          </div>
          <div style={{ textAlign:'center',marginTop:24 }}>
            <Link to="/codigos" className="btn btn-primary">Todos los códigos <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* ── ALL GAMES ── */}
      <section className="section">
        <div className="container">
          <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:32,flexWrap:'wrap',gap:12 }}>
            <div>
              <div className="section-label">🎮 Todos los juegos</div>
              <h2 className="section-title">Códigos para {GAMES.length} juegos</h2>
            </div>
          </div>
          <div className="grid-5">
            {allGames.map(g=><GameCard key={g.slug} g={g}/>)}
          </div>
        </div>
      </section>

      <AdInline />

      {/* ── GUIDES ── */}
      <section className="section--sm" style={{ background:'var(--bg-2)' }}>
        <div className="container">
          <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:32,flexWrap:'wrap',gap:12 }}>
            <div>
              <div className="section-label" style={{ color:'var(--purple)' }}><BookOpen size={12}/>Aprende</div>
              <h2 className="section-title">Guías de expertos</h2>
            </div>
            <Link to="/guias" className="btn btn-ghost btn-sm">Ver las 8 guías <ArrowRight size={14}/></Link>
          </div>
          <div className="grid-3">
            {recentGuides.map(g=>(
              <Link key={g.slug} to={`/guias/${g.slug}`} style={{ textDecoration:'none' }}>
                <div className="card" style={{ padding:20,height:'100%',display:'flex',flexDirection:'column',cursor:'pointer' }}>
                  <div style={{ width:48,height:48,borderRadius:12,background:'linear-gradient(135deg,rgba(192,38,211,0.2),rgba(0,229,255,0.15))',border:'1px solid rgba(192,38,211,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',marginBottom:14 }}>{g.emoji}</div>
                  <div style={{ display:'flex',gap:6,marginBottom:8,flexWrap:'wrap' }}>
                    <span className="badge badge-ai">{g.category}</span>
                    <span style={{ padding:'2px 8px',borderRadius:99,background:'rgba(255,255,255,0.04)',border:'1px solid var(--border)',fontSize:'.65rem',color:'var(--text-3)' }}>{g.difficulty}</span>
                    {g.isNew && <span className="badge badge-new">NUEVO</span>}
                  </div>
                  <h3 style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.95rem',color:'var(--text)',flex:1,lineHeight:1.4,marginBottom:8 }}>{g.title}</h3>
                  <div style={{ display:'flex',justifyContent:'space-between',paddingTop:12,borderTop:'1px solid var(--border)',fontSize:'.75rem' }}>
                    <span style={{ color:'var(--text-3)' }}>⏱️ {g.readTime}</span>
                    <span style={{ color:'var(--purple)',fontWeight:700 }}>Leer →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center',marginBottom:48 }}>
            <div className="section-label" style={{ justifyContent:'center' }}><Star size={12}/>Por qué elegirnos</div>
            <h2 className="section-title" style={{ background:'var(--grad-brand)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              Diseñado para jugadores de verdad
            </h2>
          </div>
          <div className="grid-4">
            {[
              { icon:<Zap size={22}/>,     c:'var(--cyan)',   t:'Copia en 1 clic', d:'Sin pasos, sin redirects. Copia el código directamente al portapapeles.' },
              { icon:<Shield size={22}/>,   c:'var(--green)',  t:'100% verificados', d:'Cada código es probado manualmente. Solo mostramos los que funcionan.' },
              { icon:<Clock size={22}/>,    c:'var(--purple)', t:'Actualización IA', d:'Un agente de IA revisa y actualiza los códigos cada hora automáticamente.' },
              { icon:<Sparkles size={22}/>, c:'var(--pink)',   t:'Guías de experto', d:'8 guías escritas por jugadores con miles de horas. Actualizadas en 2024.' },
            ].map((f,i)=>(
              <div key={i} style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:20,padding:24,transition:'transform .25s,box-shadow .25s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(0,0,0,0.5)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
              >
                <div style={{ width:44,height:44,borderRadius:12,background:`${f.c}18`,border:`1px solid ${f.c}30`,display:'flex',alignItems:'center',justifyContent:'center',color:f.c,marginBottom:16 }}>{f.icon}</div>
                <div style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.97rem',color:'var(--text)',marginBottom:8 }}>{f.t}</div>
                <div style={{ color:'var(--text-3)',fontSize:'.83rem',lineHeight:1.6 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section className="section--sm">
        <div className="container">
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20 }}>
            <div style={{ background:'linear-gradient(135deg,rgba(0,229,255,0.1),rgba(192,38,211,0.08))',border:'1px solid rgba(0,229,255,0.18)',borderRadius:28,padding:36,textAlign:'center',position:'relative',overflow:'hidden' }}>
              <div style={{ position:'absolute',top:-40,right:-40,width:150,height:150,background:'radial-gradient(circle,rgba(0,229,255,0.12),transparent)',borderRadius:'50%' }}/>
              <div style={{ fontSize:'2.5rem',marginBottom:12 }}>🤖</div>
              <h3 style={{ fontFamily:'var(--font-display)',fontSize:'1.2rem',fontWeight:900,marginBottom:10,background:'var(--grad-brand)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Centro IA</h3>
              <p style={{ color:'var(--text-2)',fontSize:'.88rem',lineHeight:1.6,marginBottom:20 }}>Busca códigos, añade juegos y genera guías completas con IA en tiempo real.</p>
              <Link to="/ia" className="btn btn-outline" style={{ width:'100%',justifyContent:'center' }}>Explorar IA <Sparkles size={14}/></Link>
            </div>
            <div style={{ background:'linear-gradient(135deg,rgba(192,38,211,0.1),rgba(244,63,94,0.06))',border:'1px solid rgba(192,38,211,0.18)',borderRadius:28,padding:36,textAlign:'center',position:'relative',overflow:'hidden' }}>
              <div style={{ position:'absolute',bottom:-30,left:-30,width:130,height:130,background:'radial-gradient(circle,rgba(192,38,211,0.12),transparent)',borderRadius:'50%' }}/>
              <div style={{ fontSize:'2.5rem',marginBottom:12 }}>🎯</div>
              <h3 style={{ fontFamily:'var(--font-display)',fontSize:'1.2rem',fontWeight:900,marginBottom:10,background:'linear-gradient(90deg,#fff,#c026d3)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>¿Qué juego eres?</h3>
              <p style={{ color:'var(--text-2)',fontSize:'.88rem',lineHeight:1.6,marginBottom:20 }}>5 preguntas para descubrir qué juego de Roblox encaja con tu personalidad.</p>
              <Link to="/quiz" className="btn btn-primary" style={{ width:'100%',justifyContent:'center' }}>Hacer el Quiz <Trophy size={14}/></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
