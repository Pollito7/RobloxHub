import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Search, CheckCircle, XCircle, Users, Copy, Check, RefreshCw, Sparkles, Clock, Wifi, WifiOff } from 'lucide-react'
import SEO from '../components/ui/SEO'
import { AdBanner, AdRect, AdInline } from '../components/ui/AdSense'
import { getGame, getCodes, getActiveCnt, GAMES } from '../data/db'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import toast from 'react-hot-toast'

// ── Fila de código individual ─────────────────────────────
function CodeRow({ code }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code.code)
    setCopied(true)
    toast.success(`¡${code.code} copiado! 🎁`)
    setTimeout(() => setCopied(false), 2000)
  }

  const active = code.status === 'active'
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'11px 16px',
      background: active ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.02)',
      border: `1px solid ${active ? 'rgba(16,185,129,0.15)' : 'var(--border)'}`,
      borderRadius:12, gap:12, flexWrap:'wrap',
      opacity: active ? 1 : 0.55,
      transition:'border-color .2s, box-shadow .2s',
    }}
      onMouseEnter={e => active && (e.currentTarget.style.borderColor = 'rgba(0,229,255,0.2)')}
      onMouseLeave={e => active && (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.15)')}
    >
      <div style={{ display:'flex', alignItems:'center', gap:12, flex:1, minWidth:0 }}>
        <span style={{ fontSize:'.9rem', flexShrink:0 }}>{active ? '✅' : '❌'}</span>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontWeight:600, fontSize:'.88rem', color:'var(--cyan)', letterSpacing:'1px' }}>{code.code}</span>
            {code.isNew     && <span className="badge badge-new"     style={{ fontSize:'.58rem' }}>NUEVO</span>}
            {code.verified  && <span className="badge badge-verified" style={{ fontSize:'.58rem' }}>✓ Verificado</span>}
            {code.aiGenerated && <span className="badge badge-ai"    style={{ fontSize:'.55rem' }}>IA</span>}
          </div>
          <div style={{ color:'var(--text-3)', fontSize:'.75rem', marginTop:2 }}>🎁 {code.reward}</div>
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
        <span style={{ color:'var(--text-3)', fontSize:'.7rem' }}>
          {new Date(code.date).toLocaleDateString('es-ES', { day:'numeric', month:'short' })}
        </span>
        <span className={`badge ${active ? 'badge-active' : 'badge-expired'}`}>{active ? 'Activo' : 'Expirado'}</span>
        {active && (
          <button onClick={copy} style={{
            display:'flex', alignItems:'center', gap:5, padding:'5px 13px',
            background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(0,229,255,0.1)',
            border: `1px solid ${copied ? 'rgba(16,185,129,0.4)' : 'rgba(0,229,255,0.3)'}`,
            borderRadius:8,
            color: copied ? 'var(--green)' : 'var(--cyan)',
            fontFamily:'var(--font-ui)', fontWeight:700, fontSize:'.78rem',
            cursor:'pointer', transition:'all .2s', whiteSpace:'nowrap',
          }}>
            {copied ? <Check size={13}/> : <Copy size={13}/>}
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Skeleton loader ───────────────────────────────────────
function CodeSkeleton() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} className="skeleton" style={{ height:60, borderRadius:12, animationDelay:`${i * 0.1}s` }}/>
      ))}
    </div>
  )
}

// ── Página principal ──────────────────────────────────────
export default function GamePage() {
  const { slug } = useParams()
  const game = getGame(slug)
  const baseCodes = getCodes(slug)

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const { aiCodes, refreshing, lastFetch, error, countdown, refresh } = useAutoRefresh(
    slug,
    game?.name,
    game?.category
  )

  // Combina códigos base + IA (los de IA tienen prioridad)
  const allCodes = useMemo(() => {
    if (aiCodes && aiCodes.length > 0) return aiCodes  // IA reemplaza los estáticos
    return baseCodes  // fallback mientras carga
  }, [aiCodes, baseCodes])

  const filtered = useMemo(() => allCodes.filter(c => {
    const ms = c.code.toLowerCase().includes(search.toLowerCase()) ||
               c.reward.toLowerCase().includes(search.toLowerCase())
    const mf = filter === 'all' || c.status === filter
    return ms && mf
  }), [allCodes, search, filter])

  const activeCount  = allCodes.filter(c => c.status === 'active').length
  const expiredCount = allCodes.filter(c => c.status === 'expired').length
  const isUsingAI    = aiCodes && aiCodes.length > 0
  const others = GAMES.filter(g => g.slug !== slug).slice(0, 6)

  if (!game) return (
    <div style={{ paddingTop:130, textAlign:'center', minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      <div style={{ fontSize:'3rem', marginBottom:12 }}>❌</div>
      <h2 style={{ marginBottom:16 }}>Juego no encontrado</h2>
      <Link to="/codigos" className="btn btn-primary">← Ver todos los juegos</Link>
    </div>
  )

  const fbtn = (val, label) => ({
    padding:'6px 12px', borderRadius:8, fontFamily:'var(--font-ui)', fontWeight:600, fontSize:'.8rem',
    cursor:'pointer', border:'1px solid', transition:'all .2s',
    borderColor: filter === val ? 'var(--cyan)' : 'var(--border)',
    background:  filter === val ? 'rgba(0,229,255,0.1)' : 'transparent',
    color:       filter === val ? 'var(--cyan)' : 'var(--text-2)',
  })

  return (
    <>
      <SEO
        title={`Códigos de ${game.name} ${new Date().getFullYear()}`}
        desc={`${activeCount} códigos activos para ${game.name}. Actualizados automáticamente con IA cada hora. Copia gratis.`}
        path={`/codigos/${slug}`}
      />
      <div style={{ paddingTop:94 }}>

        {/* ── Game header ── */}
        <div style={{ background:game.gradient, padding:'48px 0 36px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(2px)' }}/>
          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <Link to="/codigos" style={{ display:'inline-flex', alignItems:'center', gap:6, color:'rgba(255,255,255,0.6)', marginBottom:16, textDecoration:'none', fontFamily:'var(--font-ui)', fontWeight:600, fontSize:'.85rem', transition:'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
              <ArrowLeft size={14}/> Todos los juegos
            </Link>
            <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
              <div style={{ width:80, height:80, borderRadius:20, background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.5rem', flexShrink:0 }}>
                {game.emoji}
              </div>
              <div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'.62rem', letterSpacing:'2px', color:'rgba(255,255,255,0.55)', marginBottom:4 }}>{game.category}</div>
                <h1 style={{ fontFamily:'var(--font-display)', fontSize:'clamp(1.6rem,4vw,2.4rem)', fontWeight:900, color:'#fff', marginBottom:8, lineHeight:1.1 }}>
                  Códigos de {game.name}
                </h1>
                <div style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'center' }}>
                  <span style={{ color:'rgba(255,255,255,0.7)', fontSize:'.85rem', display:'flex', alignItems:'center', gap:5 }}>
                    <Users size={13}/>{game.players}
                  </span>
                  <span style={{ color:'rgba(16,185,129,0.9)', fontSize:'.85rem', display:'flex', alignItems:'center', gap:5 }}>
                    <CheckCircle size={13}/>{activeCount} activos
                  </span>
                  <span style={{ color:'rgba(255,255,255,0.45)', fontSize:'.85rem', display:'flex', alignItems:'center', gap:5 }}>
                    <XCircle size={13}/>{expiredCount} expirados
                  </span>
                  {/* Indicador IA en vivo */}
                  {isUsingAI ? (
                    <span style={{ display:'flex', alignItems:'center', gap:5, padding:'3px 10px', background:'rgba(0,229,255,0.15)', border:'1px solid rgba(0,229,255,0.3)', borderRadius:99, fontSize:'.72rem', color:'var(--cyan)', fontFamily:'var(--font-display)', letterSpacing:'0.5px' }}>
                      <Wifi size={11}/> IA · ACTUALIZADO
                    </span>
                  ) : (
                    <span style={{ display:'flex', alignItems:'center', gap:5, padding:'3px 10px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:99, fontSize:'.72rem', color:'rgba(255,255,255,0.6)', fontFamily:'var(--font-display)', letterSpacing:'0.5px' }}>
                      <Sparkles size={11}/> IA CARGANDO...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="container" style={{ padding:'32px 20px 80px' }}>
          <AdBanner style={{ marginBottom:24 }}/>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:28, alignItems:'start' }}>
            {/* ── Columna principal ── */}
            <div style={{ minWidth:0 }}>

              {/* Cómo canjear */}
              <div style={{ background:'linear-gradient(135deg,rgba(0,229,255,0.05),rgba(192,38,211,0.04))', border:'1px solid rgba(0,229,255,0.14)', borderRadius:14, padding:'14px 18px', marginBottom:16 }}>
                <div style={{ fontFamily:'var(--font-ui)', fontWeight:700, fontSize:'.88rem', color:'var(--cyan)', marginBottom:6 }}>
                  📋 ¿Cómo canjear en {game.name}?
                </div>
                <p style={{ color:'var(--text-2)', fontSize:'.84rem', lineHeight:1.6, margin:0 }}>
                  Entra al juego → Busca el botón <strong>Twitter / Codes</strong> en el menú → Pega el código exactamente → Confirma. ¡Recompensa instantánea!
                </p>
              </div>

              {/* ── Barra de estado IA ── */}
              <div style={{
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'10px 16px',
                background: isUsingAI ? 'rgba(0,229,255,0.04)' : 'var(--bg-2)',
                border: `1px solid ${isUsingAI ? 'rgba(0,229,255,0.18)' : 'var(--border)'}`,
                borderRadius:12, marginBottom:14, flexWrap:'wrap', gap:8,
                transition:'all .3s',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  {isUsingAI
                    ? <Wifi size={14} color="var(--cyan)"/>
                    : <Sparkles size={14} color="var(--text-3)" style={{ animation:'spin 2s linear infinite' }}/>
                  }
                  <span style={{ fontFamily:'var(--font-ui)', fontWeight:600, fontSize:'.82rem', color: isUsingAI ? 'var(--text-2)' : 'var(--text-3)' }}>
                    {refreshing
                      ? '🤖 IA buscando códigos actualizados...'
                      : isUsingAI && lastFetch
                        ? `✅ IA actualizó: ${lastFetch.toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit' })} · próxima en ${countdown}`
                        : '⏳ Cargando códigos con IA...'
                    }
                  </span>
                </div>
                <button
                  onClick={() => refresh(true)}
                  disabled={refreshing}
                  style={{
                    display:'flex', alignItems:'center', gap:6,
                    padding:'6px 14px',
                    background:'rgba(0,229,255,0.08)', border:'1px solid rgba(0,229,255,0.25)',
                    borderRadius:8, color:'var(--cyan)', fontFamily:'var(--font-ui)', fontWeight:700,
                    fontSize:'.78rem', cursor: refreshing ? 'not-allowed' : 'pointer',
                    opacity: refreshing ? 0.6 : 1, transition:'all .2s',
                  }}
                >
                  <RefreshCw size={12} style={{ animation: refreshing ? 'spin 1s linear infinite' : undefined }}/>
                  {refreshing ? 'Actualizando...' : 'Actualizar ahora'}
                </button>
              </div>

              {/* Error de IA */}
              {error && !refreshing && (
                <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', background:'rgba(239,68,68,0.06)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:10, marginBottom:12, color:'var(--red)', fontSize:'.8rem' }}>
                  <WifiOff size={13}/>
                  IA no disponible — mostrando datos base. Reintentando en {countdown}.
                </div>
              )}

              {/* Filtros */}
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
                <div style={{ flex:1, minWidth:180, position:'relative' }}>
                  <Search size={14} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--text-3)', pointerEvents:'none' }}/>
                  <input className="input" placeholder="Buscar código..." value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ paddingLeft:36, fontSize:'.85rem', padding:'8px 12px 8px 36px' }}
                  />
                </div>
                <div style={{ display:'flex', gap:5 }}>
                  {[['all','Todos'], ['active','✅ Activos'], ['expired','❌ Expirados']].map(([v,l]) => (
                    <button key={v} onClick={() => setFilter(v)} style={fbtn(v,l)}>{l}</button>
                  ))}
                </div>
              </div>

              <div style={{ color:'var(--text-3)', fontSize:'.78rem', marginBottom:10 }}>
                {isUsingAI && <span style={{ color:'var(--cyan)', marginRight:8 }}>🤖 IA</span>}
                Mostrando <strong style={{ color:'var(--text-2)' }}>{filtered.length}</strong> de {allCodes.length} códigos
              </div>

              {/* Lista de códigos o skeleton */}
              {refreshing && !aiCodes ? (
                <CodeSkeleton/>
              ) : filtered.length > 0 ? (
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {filtered.map(c => <CodeRow key={c.id + c.code} code={c}/>)}
                </div>
              ) : (
                <div style={{ textAlign:'center', padding:'3rem', color:'var(--text-3)' }}>
                  <div style={{ fontSize:'2.5rem', marginBottom:8 }}>🔍</div>
                  Sin resultados
                </div>
              )}

              <AdInline/>

              {/* Sobre el juego */}
              <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:14, padding:20 }}>
                <h3 style={{ fontFamily:'var(--font-ui)', fontWeight:700, marginBottom:10, fontSize:'.95rem' }}>
                  {game.emoji} Sobre {game.name}
                </h3>
                <p style={{ color:'var(--text-2)', fontSize:'.87rem', lineHeight:1.7, margin:0 }}>
                  {game.name} es uno de los juegos más populares de Roblox en la categoría{' '}
                  <strong style={{ color:'var(--text)' }}>{game.category}</strong> con{' '}
                  <strong style={{ color:'var(--text)' }}>{game.players} jugadores</strong> activos.
                  Los códigos son actualizados automáticamente por nuestra IA cada hora directamente
                  desde las fuentes oficiales de los desarrolladores. ¡Márcala en favoritos!
                </p>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="hide-mobile">
              <AdRect style={{ marginBottom:16 }}/>
              <div style={{ background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:14, padding:16 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'.62rem', letterSpacing:'2px', color:'var(--text-3)', marginBottom:14 }}>OTROS JUEGOS</div>
                <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                  {others.map(g => (
                    <Link key={g.slug} to={`/codigos/${g.slug}`} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px', borderRadius:10, textDecoration:'none', transition:'background .15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,229,255,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ fontSize:'1.2rem' }}>{g.emoji}</span>
                      <div>
                        <div style={{ fontFamily:'var(--font-ui)', fontWeight:600, fontSize:'.85rem', color:'var(--text)' }}>{g.name}</div>
                        <div style={{ color:'var(--green)', fontSize:'.68rem' }}>{getActiveCnt(g.slug)} activos</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @media(max-width:900px) { .hide-mobile { display:none!important } }
      `}</style>
    </>
  )
}
