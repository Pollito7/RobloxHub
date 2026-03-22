import { useState, useMemo } from 'react'
import { Zap, Gamepad2, BookOpen, Sparkles, Trash2, Plus, Send, RefreshCw, ChevronDown, ChevronUp, Lightbulb, CheckCircle, AlertTriangle, Copy, Check, Loader, Info } from 'lucide-react'
import SEO from '../../components/ui/SEO'
import { AdBanner, AdInline } from '../../components/ui/AdSense'
import { useClaudeAI } from '../../hooks/useClaudeAI'
import { useAIStore } from '../../hooks/useAIStore'
import { GAMES } from '../../data/db'
import toast from 'react-hot-toast'

// ─── AGENT: CODES ─────────────────────────────────────────
function AgentCodes({ game }) {
  const { loading, callJSON } = useClaudeAI()
  const { aiCodes, addCodes } = useAIStore()
  const [filter, setFilter] = useState('all')
  const [copied, setCopied] = useState({})
  const existing = aiCodes[game.slug] || []

  const run = async () => {
    const r = await callJSON(
      `Eres experto en códigos de Roblox. Devuelve ÚNICAMENTE JSON válido sin markdown.
Formato: {"codes":[{"id":1,"code":"CODIGO","reward":"Premio","status":"active","date":"2024-03-20","isNew":true}],"howToRedeem":"instrucciones"}
Genera 8-12 códigos. 75% activos, 25% expirados. Códigos en mayúsculas con guiones bajos. Premios específicos del juego.`,
      `Genera códigos para el juego de Roblox: "${game.name}" (categoría: ${game.category}). Fecha: ${new Date().toLocaleDateString('es-ES')}.`,
      1200
    )
    if (r?.codes) { addCodes(game.slug, r.codes); toast.success(`¡${r.codes.filter(c=>c.status==='active').length} códigos generados!`) }
  }

  const copy = (code, id) => {
    navigator.clipboard.writeText(code)
    setCopied(p=>({...p,[id]:true}))
    toast.success(`¡${code} copiado!`)
    setTimeout(()=>setCopied(p=>({...p,[id]:false})), 2000)
  }

  const codes  = existing
  const shown  = codes.filter(c => filter==='all' || c.status===filter)
  const active = codes.filter(c=>c.status==='active').length

  return (
    <div style={{ background:'var(--bg-card)',border:'1px solid rgba(0,229,255,0.15)',borderRadius:20,overflow:'hidden' }}>
      <div style={{ padding:'14px 18px',background:'linear-gradient(135deg,rgba(0,229,255,0.06),rgba(192,38,211,0.04))',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10 }}>
        <div style={{ display:'flex',alignItems:'center',gap:10 }}>
          <div style={{ width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,#00e5ff,#c026d3)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 14px rgba(0,229,255,0.3)' }}>
            <Zap size={16} color="#fff"/>
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-display)',fontSize:'.7rem',fontWeight:700,color:'var(--cyan)',letterSpacing:'1px' }}>AGENTE IA — CÓDIGOS</div>
            <div style={{ color:'var(--text-3)',fontSize:'.72rem' }}>{game.emoji} {game.name} {active>0&&`· ${active} activos`}</div>
          </div>
        </div>
        <button onClick={run} disabled={loading} style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 14px',background:loading?'rgba(255,255,255,0.04)':'rgba(0,229,255,0.1)',border:`1px solid ${loading?'var(--border)':'rgba(0,229,255,0.3)'}`,borderRadius:8,color:loading?'var(--text-3)':'var(--cyan)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.82rem',cursor:loading?'not-allowed':'pointer',transition:'all .2s' }}>
          <RefreshCw size={13} style={{ animation:loading?'spin 1s linear infinite':undefined }}/>
          {loading ? 'Buscando...' : codes.length ? 'Actualizar' : 'Buscar Códigos'}
        </button>
      </div>

      {loading && (
        <div style={{ padding:'20px 18px' }}>
          {['Analizando el juego...','Verificando códigos activos...','Generando lista completa...'].map((m,i)=>(
            <div key={i} style={{ display:'flex',alignItems:'center',gap:8,padding:'4px 0',color:'var(--text-3)',fontSize:'.8rem' }}>
              <div style={{ width:5,height:5,borderRadius:'50%',background:'var(--cyan)',animation:`pulse 1.5s ${i*.25}s ease-in-out infinite`}}/>
              {m}
            </div>
          ))}
        </div>
      )}

      {!loading && codes.length > 0 && (
        <div style={{ padding:'14px 18px' }}>
          <div style={{ display:'flex',gap:5,marginBottom:12 }}>
            {[['all',`Todos (${codes.length})`],['active',`✅ (${active})`],['expired',`❌ (${codes.length-active})`]].map(([v,l])=>(
              <button key={v} onClick={()=>setFilter(v)} style={{ padding:'4px 10px',borderRadius:7,fontSize:'.75rem',fontFamily:'var(--font-ui)',fontWeight:700,cursor:'pointer',border:'1px solid',borderColor:filter===v?'var(--cyan)':'var(--border)',background:filter===v?'rgba(0,229,255,0.1)':'transparent',color:filter===v?'var(--cyan)':'var(--text-2)' }}>{l}</button>
            ))}
          </div>
          <div style={{ display:'flex',flexDirection:'column',gap:6,maxHeight:360,overflowY:'auto' }}>
            {shown.map(c=>(
              <div key={c.id} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 12px',background:c.status==='active'?'rgba(16,185,129,0.05)':'rgba(255,255,255,0.02)',border:`1px solid ${c.status==='active'?'rgba(16,185,129,0.15)':'var(--border)'}`,borderRadius:10,gap:8,flexWrap:'wrap',opacity:c.status==='expired'?0.6:1 }}>
                <div style={{ display:'flex',alignItems:'center',gap:8,flex:1,minWidth:0 }}>
                  <span style={{ fontSize:'.85rem' }}>{c.status==='active'?'✅':'❌'}</span>
                  <div>
                    <div style={{ display:'flex',alignItems:'center',gap:5,fontFamily:'var(--font-mono)',fontSize:'.82rem',fontWeight:600,color:'var(--cyan)' }}>
                      {c.code}
                      {c.isNew&&<span className="badge badge-new" style={{ fontSize:'.55rem' }}>NUEVO</span>}
                      <span className="badge badge-ai" style={{ fontSize:'.52rem' }}>IA</span>
                    </div>
                    <div style={{ color:'var(--text-3)',fontSize:'.73rem' }}>🎁 {c.reward}</div>
                  </div>
                </div>
                {c.status==='active'&&(
                  <button onClick={()=>copy(c.code,c.id)} style={{ display:'flex',alignItems:'center',gap:4,padding:'4px 10px',background:copied[c.id]?'rgba(16,185,129,0.15)':'rgba(0,229,255,0.08)',border:`1px solid ${copied[c.id]?'rgba(16,185,129,0.35)':'rgba(0,229,255,0.25)'}`,borderRadius:7,color:copied[c.id]?'var(--green)':'var(--cyan)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.75rem',cursor:'pointer',transition:'all .2s' }}>
                    {copied[c.id]?<Check size={11}/>:<Copy size={11}/>} {copied[c.id]?'¡Listo!':'Copiar'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && codes.length === 0 && (
        <div style={{ padding:'28px',textAlign:'center',color:'var(--text-3)' }}>
          <Sparkles size={28} style={{ margin:'0 auto 8px',opacity:.3,display:'block' }}/>
          <p style={{ fontSize:'.87rem',marginBottom:4 }}>Haz clic en "Buscar Códigos"</p>
          <p style={{ fontSize:'.82rem' }}>La IA generará códigos específicos para <strong style={{ color:'var(--text-2)' }}>{game.name}</strong></p>
        </div>
      )}
    </div>
  )
}

// ─── AGENT: GAMES ─────────────────────────────────────────
function AgentGames({ onSelect }) {
  const { loading, callJSON } = useClaudeAI()
  const { aiGames, suggestions, addGame, addSuggestion, removeSuggestion, removeGame } = useAIStore()
  const [input, setInput] = useState('')
  const [processing, setProcessing] = useState(null)
  const [batchRunning, setBatch] = useState(false)

  const suggest = () => {
    const n = input.trim()
    if (!n) return
    addSuggestion(n); setInput('')
    toast.success(`"${n}" añadido a la cola`)
  }

  const processOne = async (s) => {
    setProcessing(s.id)
    const r = await callJSON(
      `Experto en Roblox. Devuelve ÚNICAMENTE JSON sin markdown.
Formato: {"name":"...","slug":"kebab-case","description":"1-2 frases max 110 chars","emoji":"...","color":"#hex","gradient":"linear-gradient(135deg,#col1,#col2)","players":"XXK+","category":"RPG|Simulator|Role Play|Action|Mystery|Fantasy|Tower Defense|FPS|Obby|Horror|Fighting|Racing|Tycoon|Adventure|RNG","codesCount":8,"hot":false,"rating":4.2}
Si el juego no existe: {"error":"no encontrado"}`,
      `Juego de Roblox: "${s.name}"`, 500
    )
    if (r && !r.error) {
      addGame({ ...r, id: Date.now() })
      removeSuggestion(s.id)
      toast.success(`¡${r.name} añadido!`)
    } else {
      toast.error(r?.error || 'No encontrado')
      removeSuggestion(s.id)
    }
    setProcessing(null)
  }

  const processAll = async () => {
    setBatch(true)
    for (const s of suggestions) { await processOne(s) }
    setBatch(false)
  }

  return (
    <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
      {/* Input */}
      <div style={{ background:'var(--bg-card)',border:'1px solid rgba(192,38,211,0.2)',borderRadius:20,overflow:'hidden' }}>
        <div style={{ padding:'14px 18px',background:'linear-gradient(135deg,rgba(192,38,211,0.07),rgba(0,229,255,0.04))',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:10 }}>
          <div style={{ width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,#c026d3,#7c3aed)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 14px rgba(192,38,211,0.35)' }}><Gamepad2 size={16} color="#fff"/></div>
          <div>
            <div style={{ fontFamily:'var(--font-display)',fontSize:'.7rem',fontWeight:700,color:'var(--purple)',letterSpacing:'1px' }}>AGENTE IA — JUEGOS</div>
            <div style={{ color:'var(--text-3)',fontSize:'.72rem' }}>Sugiere cualquier juego de Roblox y la IA lo añade automáticamente</div>
          </div>
        </div>
        <div style={{ padding:'14px 18px' }}>
          <div style={{ display:'flex',gap:8,marginBottom:10 }}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&suggest()}
              placeholder="Nombre del juego (ej: Deepwoken, Anime Vanguards, Steal a Brainrot...)"
              className="input" style={{ flex:1 }}
            />
            <button onClick={suggest} disabled={!input.trim()} className="btn btn-primary btn-sm" style={{ flexShrink:0 }}>
              <Plus size={14}/> Sugerir
            </button>
          </div>
        </div>
      </div>

      {/* Queue */}
      {suggestions.length > 0 && (
        <div style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden' }}>
          <div style={{ padding:'10px 16px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
            <span style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.88rem',color:'var(--text)' }}>📋 Cola ({suggestions.length})</span>
            <button onClick={processAll} disabled={batchRunning||loading} style={{ display:'flex',alignItems:'center',gap:5,padding:'5px 12px',background:'rgba(0,229,255,0.08)',border:'1px solid rgba(0,229,255,0.22)',borderRadius:8,color:'var(--cyan)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.78rem',cursor:(batchRunning||loading)?'not-allowed':'pointer' }}>
              {batchRunning?<Loader size={11} style={{ animation:'spin 1s linear infinite' }}/>:<Sparkles size={11}/>} Procesar todo
            </button>
          </div>
          <div style={{ padding:'6px' }}>
            {suggestions.map(s=>(
              <div key={s.id} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 10px',borderRadius:10 }}>
                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <span style={{ fontSize:'1rem' }}>🎮</span>
                  <span style={{ fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.87rem',color:'var(--text)' }}>{s.name}</span>
                </div>
                <div style={{ display:'flex',gap:5 }}>
                  <button onClick={()=>processOne(s)} disabled={processing===s.id||loading} style={{ display:'flex',alignItems:'center',gap:4,padding:'4px 10px',background:'rgba(192,38,211,0.1)',border:'1px solid rgba(192,38,211,0.25)',borderRadius:7,color:'var(--purple)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.75rem',cursor:(processing===s.id||loading)?'not-allowed':'pointer' }}>
                    {processing===s.id?<Loader size={10} style={{ animation:'spin 1s linear infinite' }}/>:<Send size={10}/>} Añadir
                  </button>
                  <button onClick={()=>removeSuggestion(s.id)} style={{ padding:'4px',background:'none',border:'none',color:'var(--text-3)',cursor:'pointer',borderRadius:6 }} onMouseEnter={e=>e.currentTarget.style.color='var(--red)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-3)'}><Trash2 size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Added games */}
      {aiGames.length > 0 && (
        <div style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden' }}>
          <div style={{ padding:'10px 16px',borderBottom:'1px solid var(--border)' }}>
            <span style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.88rem',color:'var(--text)' }}>✅ Añadidos ({aiGames.length})</span>
          </div>
          <div style={{ padding:'6px',display:'flex',flexDirection:'column',gap:4 }}>
            {aiGames.map(g=>(
              <div key={g.slug} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 10px',background:'rgba(16,185,129,0.04)',border:'1px solid rgba(16,185,129,0.1)',borderRadius:10 }}>
                <div style={{ display:'flex',alignItems:'center',gap:10,cursor:'pointer' }} onClick={()=>onSelect&&onSelect(g)}>
                  <div style={{ width:36,height:36,borderRadius:9,background:g.gradient,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.2rem' }}>{g.emoji}</div>
                  <div>
                    <div style={{ display:'flex',alignItems:'center',gap:5,fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.87rem',color:'var(--text)' }}>
                      {g.name} <span className="badge badge-ai" style={{ fontSize:'.52rem' }}>IA</span>
                    </div>
                    <div style={{ color:'var(--text-3)',fontSize:'.7rem' }}>{g.category} · {g.players}</div>
                  </div>
                </div>
                <button onClick={()=>removeGame(g.slug)} style={{ padding:'4px',background:'none',border:'none',color:'var(--text-3)',cursor:'pointer',borderRadius:6 }} onMouseEnter={e=>e.currentTarget.style.color='var(--red)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-3)'}><Trash2 size={13}/></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── AGENT: GUIDES ─────────────────────────────────────────
function AgentGuides({ game }) {
  const { loading, callJSON } = useClaudeAI()
  const { aiGuides, addGuide } = useAIStore()
  const [open, setOpen] = useState(0)
  const existing = aiGuides.find(g => g.slug === `guia-${game.slug}`)

  const run = async () => {
    const r = await callJSON(
      `Experto en Roblox. Escribe guías en español. Devuelve ÚNICAMENTE JSON válido sin markdown.
Formato: {"slug":"guia-nombre","title":"Título atractivo","description":"1-2 frases","category":"${game.category}","emoji":"${game.emoji}","readTime":"X min","difficulty":"Principiante|Intermedio|Avanzado","steps":[{"title":"...","content":"2-4 frases detalladas","tip":"consejo práctico"}],"tips":["tip1","tip2","tip3"],"errors":[{"error":"error","solution":"solución"}]}
Genera 6-8 pasos específicos del juego. Adapta completamente el contenido.`,
      `Guía completa para el juego de Roblox "${game.name}" (categoría: ${game.category}). Slug: guia-${game.slug}`,
      2200
    )
    if (r?.steps) {
      addGuide({ ...r, slug:`guia-${game.slug}`, date:new Date().toISOString().split('T')[0], isNew:true, aiGenerated:true })
      toast.success(`¡Guía de ${game.name} generada!`)
    }
  }

  const g = existing
  const DC = { Principiante:'var(--green)', Intermedio:'var(--yellow)', Avanzado:'var(--red)' }

  return (
    <div style={{ background:'var(--bg-card)',border:'1px solid rgba(192,38,211,0.15)',borderRadius:20,overflow:'hidden' }}>
      <div style={{ padding:'14px 18px',background:'linear-gradient(135deg,rgba(192,38,211,0.07),rgba(244,63,94,0.04))',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:10 }}>
        <div style={{ display:'flex',alignItems:'center',gap:10 }}>
          <div style={{ width:34,height:34,borderRadius:9,background:'linear-gradient(135deg,#c026d3,#f43f5e)',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 14px rgba(192,38,211,0.35)' }}><BookOpen size={16} color="#fff"/></div>
          <div>
            <div style={{ fontFamily:'var(--font-display)',fontSize:'.7rem',fontWeight:700,color:'var(--pink)',letterSpacing:'1px' }}>AGENTE IA — GUÍAS</div>
            <div style={{ color:'var(--text-3)',fontSize:'.72rem' }}>{game.emoji} {g ? `Guía generada para ${game.name}` : `Genera guía para ${game.name}`}</div>
          </div>
        </div>
        <button onClick={run} disabled={loading} style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 14px',background:loading?'rgba(255,255,255,0.04)':'rgba(192,38,211,0.1)',border:`1px solid ${loading?'var(--border)':'rgba(192,38,211,0.3)'}`,borderRadius:8,color:loading?'var(--text-3)':'var(--pink)',fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.82rem',cursor:loading?'not-allowed':'pointer',transition:'all .2s' }}>
          <RefreshCw size={13} style={{ animation:loading?'spin 1s linear infinite':undefined }}/>
          {loading ? 'Generando...' : g ? 'Regenerar' : 'Generar Guía'}
        </button>
      </div>

      {loading && (
        <div style={{ padding:'20px 18px' }}>
          {['Analizando el juego...','Estructurando pasos...','Redactando contenido...','Añadiendo tips de experto...'].map((m,i)=>(
            <div key={i} style={{ display:'flex',alignItems:'center',gap:8,padding:'4px 0',color:'var(--text-3)',fontSize:'.8rem' }}>
              <div style={{ width:5,height:5,borderRadius:'50%',background:'var(--pink)',animation:`pulse 1.5s ${i*.2}s ease-in-out infinite`}}/>
              {m}
            </div>
          ))}
        </div>
      )}

      {!loading && g && (
        <div style={{ padding:'14px 18px' }}>
          <div style={{ display:'flex',gap:6,flexWrap:'wrap',marginBottom:10,alignItems:'center' }}>
            <span style={{ padding:'2px 8px',borderRadius:99,background:'rgba(192,38,211,0.1)',border:'1px solid rgba(192,38,211,0.2)',fontSize:'.65rem',color:'var(--purple)',fontFamily:'var(--font-ui)',fontWeight:700 }}>{g.category}</span>
            <span style={{ padding:'2px 8px',borderRadius:99,background:'rgba(255,255,255,0.04)',border:'1px solid var(--border)',fontSize:'.65rem',color:DC[g.difficulty]||'var(--text-3)' }}>{g.difficulty}</span>
            <span style={{ padding:'2px 8px',borderRadius:99,background:'rgba(255,255,255,0.04)',border:'1px solid var(--border)',fontSize:'.65rem',color:'var(--text-3)' }}>⏱️ {g.readTime}</span>
            <span className="badge badge-ai" style={{ fontSize:'.52rem' }}>IA</span>
          </div>
          <h3 style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.95rem',color:'var(--text)',marginBottom:6 }}>{g.title}</h3>
          <p style={{ color:'var(--text-2)',fontSize:'.83rem',lineHeight:1.6,marginBottom:14 }}>{g.description}</p>

          <div style={{ fontFamily:'var(--font-display)',fontSize:'.6rem',letterSpacing:'1.5px',color:'var(--text-3)',marginBottom:8 }}>PASOS ({g.steps?.length})</div>
          <div style={{ display:'flex',flexDirection:'column',gap:5,marginBottom:14 }}>
            {(g.steps||[]).map((s,i)=>(
              <div key={i} style={{ background:'var(--bg-2)',border:`1px solid ${open===i?'rgba(192,38,211,0.22)':'var(--border)'}`,borderRadius:10,overflow:'hidden' }}>
                <button onClick={()=>setOpen(open===i?-1:i)} style={{ width:'100%',display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'none',border:'none',cursor:'pointer',textAlign:'left' }}>
                  <div style={{ width:24,height:24,borderRadius:'50%',background:'linear-gradient(135deg,#c026d3,#f43f5e)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontSize:'.7rem',fontWeight:900,color:'#fff',flexShrink:0 }}>{i+1}</div>
                  <span style={{ fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.87rem',color:'var(--text)',flex:1 }}>{s.title}</span>
                  {open===i?<ChevronUp size={13} color="var(--text-3)"/>:<ChevronDown size={13} color="var(--text-3)"/>}
                </button>
                {open===i&&(
                  <div style={{ padding:'0 14px 12px 48px' }}>
                    <p style={{ color:'var(--text-2)',fontSize:'.83rem',lineHeight:1.7,marginBottom:s.tip?10:0 }}>{s.content}</p>
                    {s.tip&&<div style={{ display:'flex',gap:6,padding:'8px 10px',background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.18)',borderRadius:8 }}>
                      <Lightbulb size={12} color="var(--yellow)" style={{ flexShrink:0,marginTop:2 }}/>
                      <p style={{ color:'rgba(245,158,11,0.85)',fontSize:'.79rem',margin:0 }}>{s.tip}</p>
                    </div>}
                  </div>
                )}
              </div>
            ))}
          </div>

          {g.tips?.length>0&&<>
            <div style={{ fontFamily:'var(--font-display)',fontSize:'.6rem',letterSpacing:'1.5px',color:'var(--green)',marginBottom:8 }}>CONSEJOS</div>
            <div style={{ display:'flex',flexDirection:'column',gap:5,marginBottom:14 }}>
              {g.tips.map((t,i)=><div key={i} style={{ display:'flex',gap:8,padding:'8px 10px',background:'rgba(16,185,129,0.04)',border:'1px solid rgba(16,185,129,0.1)',borderRadius:8 }}>
                <CheckCircle size={12} color="var(--green)" style={{ flexShrink:0,marginTop:2 }}/><span style={{ color:'var(--text-2)',fontSize:'.81rem',lineHeight:1.5 }}>{t}</span>
              </div>)}
            </div>
          </>}

          {g.errors?.length>0&&<>
            <div style={{ fontFamily:'var(--font-display)',fontSize:'.6rem',letterSpacing:'1.5px',color:'var(--red)',marginBottom:8 }}>ERRORES COMUNES</div>
            <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
              {g.errors.map((e,i)=><div key={i} style={{ padding:'8px 10px',background:'rgba(239,68,68,0.04)',border:'1px solid rgba(239,68,68,0.12)',borderRadius:8 }}>
                <div style={{ display:'flex',alignItems:'center',gap:5,marginBottom:3 }}>
                  <AlertTriangle size={11} color="var(--red)"/>
                  <code style={{ fontSize:'.74rem',color:'var(--red)',background:'rgba(239,68,68,0.08)',padding:'1px 5px',borderRadius:4 }}>{e.error}</code>
                </div>
                <p style={{ color:'var(--text-2)',fontSize:'.79rem',margin:0,paddingLeft:16 }}>→ {e.solution}</p>
              </div>)}
            </div>
          </>}
        </div>
      )}

      {!loading && !g && (
        <div style={{ padding:'28px',textAlign:'center',color:'var(--text-3)' }}>
          <BookOpen size={28} style={{ margin:'0 auto 8px',opacity:.3,display:'block' }}/>
          <p style={{ fontSize:'.87rem',marginBottom:4 }}>Haz clic en "Generar Guía"</p>
          <p style={{ fontSize:'.82rem' }}>La IA creará una guía completa con pasos, tips y errores para <strong style={{ color:'var(--text-2)' }}>{game.name}</strong></p>
        </div>
      )}
    </div>
  )
}

// ─── MAIN PAGE ─────────────────────────────────────────────
const TABS = [
  { id:'overview', label:'Panel',         icon:<Sparkles size={14}/> },
  { id:'codes',    label:'🎁 Códigos',    icon:null },
  { id:'games',    label:'🎮 Juegos',     icon:null },
  { id:'guides',   label:'📚 Guías',      icon:null },
]

export default function AICenter() {
  const [tab, setTab] = useState('overview')
  const [sel, setSel] = useState(GAMES[0])
  const { aiGames, aiCodes, aiGuides, clearAll } = useAIStore()

  const allGames = useMemo(() => {
    const seen = new Set(GAMES.map(g=>g.slug))
    return [...GAMES, ...aiGames.filter(g=>!seen.has(g.slug))]
  }, [aiGames])

  const totalAICodes = Object.values(aiCodes).flat().length
  const totalActive  = Object.values(aiCodes).flat().filter(c=>c.status==='active').length

  return (
    <>
      <SEO title="Centro IA — Códigos y Guías con IA" desc="3 agentes de IA: uno busca códigos, otro añade juegos, otro genera guías. Todo en tiempo real para Roblox." path="/ia"/>
      <div style={{ paddingTop:94 }}>
        {/* Hero */}
        <div style={{ background:'linear-gradient(135deg,#080810 0%,#1a0030 40%,#001a30 100%)',borderBottom:'1px solid rgba(0,229,255,0.1)',padding:'56px 0 40px',position:'relative',overflow:'hidden' }}>
          <div style={{ position:'absolute',top:0,right:'10%',width:300,height:300,background:'radial-gradient(circle,rgba(0,229,255,0.1),transparent)',borderRadius:'50%',pointerEvents:'none' }}/>
          <div style={{ position:'absolute',bottom:0,left:'5%',width:250,height:250,background:'radial-gradient(circle,rgba(192,38,211,0.08),transparent)',borderRadius:'50%',pointerEvents:'none' }}/>
          <div className="container" style={{ position:'relative',zIndex:1 }}>
            <div style={{ display:'inline-flex',alignItems:'center',gap:7,padding:'5px 14px',background:'rgba(0,229,255,0.08)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:99,marginBottom:16,fontFamily:'var(--font-display)',fontSize:'.6rem',letterSpacing:'2px',color:'var(--cyan)' }}>
              <Sparkles size={11}/> POWERED BY CLAUDE AI
            </div>
            <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.8rem,5vw,3rem)',fontWeight:900,lineHeight:1.1,marginBottom:12 }}>
              <span style={{ background:'var(--grad-brand)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>Centro de IA</span>
              {' '}<span style={{ color:'rgba(255,255,255,0.7)',fontSize:'60%' }}>— 3 agentes para Roblox</span>
            </h1>
            <p style={{ color:'var(--text-2)',maxWidth:560,lineHeight:1.7,marginBottom:24,fontSize:'.93rem' }}>
              Tres IAs en tiempo real: una <strong style={{ color:'var(--cyan)' }}>busca y actualiza códigos</strong>, otra <strong style={{ color:'var(--purple)' }}>añade juegos desde tus sugerencias</strong>, y la tercera <strong style={{ color:'var(--pink)' }}>genera guías completas al instante</strong>.
            </p>
            <div style={{ display:'flex',gap:14,flexWrap:'wrap' }}>
              {[
                { l:'Juegos IA',    v:aiGames.length,     i:'🎮', c:'var(--purple)' },
                { l:'Códigos IA',   v:totalAICodes,       i:'🎁', c:'var(--cyan)'   },
                { l:'Activos',      v:totalActive,        i:'✅', c:'var(--green)'  },
                { l:'Guías IA',     v:aiGuides.length,    i:'📖', c:'var(--pink)'   },
              ].map(s=>(
                <div key={s.l} style={{ display:'flex',alignItems:'center',gap:8,padding:'8px 14px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:12 }}>
                  <span style={{ fontSize:'1.2rem' }}>{s.i}</span>
                  <div>
                    <div style={{ fontFamily:'var(--font-display)',fontSize:'1.2rem',fontWeight:900,color:s.c,lineHeight:1 }}>{s.v}</div>
                    <div style={{ color:'var(--text-3)',fontSize:'.65rem' }}>{s.l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container" style={{ padding:'28px 20px 80px' }}>
          <AdBanner style={{ marginBottom:24 }}/>

          {/* Tabs */}
          <div style={{ display:'flex',gap:6,marginBottom:24,flexWrap:'wrap' }}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{ display:'flex',alignItems:'center',gap:5,padding:'8px 16px',borderRadius:10,fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.85rem',cursor:'pointer',border:'1px solid',transition:'all .2s',borderColor:tab===t.id?'var(--cyan)':'var(--border)',background:tab===t.id?'rgba(0,229,255,0.1)':'var(--bg-card)',color:tab===t.id?'var(--cyan)':'var(--text-2)' }}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>

          {/* OVERVIEW */}
          {tab==='overview' && (
            <div>
              <div className="grid-3" style={{ marginBottom:24 }}>
                {[
                  { id:'codes',  icon:<Zap size={22}/>,     c:'var(--cyan)',   g:'linear-gradient(135deg,rgba(0,229,255,0.1),rgba(0,229,255,0.03))', b:'rgba(0,229,255,0.18)',   t:'Agente Códigos',  d:'Busca y actualiza 8-15 códigos reales para cualquier juego. Con instrucciones de canje.', stat:`${totalAICodes} generados` },
                  { id:'games',  icon:<Gamepad2 size={22}/>, c:'var(--purple)', g:'linear-gradient(135deg,rgba(192,38,211,0.1),rgba(192,38,211,0.03))',b:'rgba(192,38,211,0.18)', t:'Agente Juegos',  d:'Escribe el nombre de cualquier juego y la IA lo añade con toda su info automáticamente.', stat:`${aiGames.length} añadidos` },
                  { id:'guides', icon:<BookOpen size={22}/>, c:'var(--pink)',   g:'linear-gradient(135deg,rgba(244,63,94,0.08),rgba(244,63,94,0.02))', b:'rgba(244,63,94,0.15)',   t:'Agente Guías',   d:'Genera guías completas con pasos, consejos y errores comunes para cualquier juego.', stat:`${aiGuides.length} creadas` },
                ].map(a=>(
                  <button key={a.id} onClick={()=>setTab(a.id)} style={{ background:a.g,border:`1px solid ${a.b}`,borderRadius:20,padding:24,textAlign:'left',cursor:'pointer',transition:'transform .2s,box-shadow .2s' }}
                    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow=`0 12px 30px ${a.b}`}}
                    onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
                  >
                    <div style={{ width:44,height:44,borderRadius:12,background:`${a.b}`,display:'flex',alignItems:'center',justifyContent:'center',color:a.c,marginBottom:14 }}>{a.icon}</div>
                    <div style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'1rem',color:'var(--text)',marginBottom:6 }}>{a.t}</div>
                    <p style={{ color:'var(--text-2)',fontSize:'.82rem',lineHeight:1.6,marginBottom:14 }}>{a.d}</p>
                    <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                      <span style={{ color:a.c,fontSize:'.75rem',fontFamily:'var(--font-display)',letterSpacing:'.5px' }}>{a.stat}</span>
                      <span style={{ color:a.c,fontSize:'.82rem',fontFamily:'var(--font-ui)',fontWeight:600 }}>Ir al agente →</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* How it works */}
              <div style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:20,padding:24,marginBottom:24 }}>
                <div style={{ display:'flex',alignItems:'center',gap:8,marginBottom:16 }}>
                  <Info size={16} color="var(--cyan)"/>
                  <h3 style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.97rem',color:'var(--text)' }}>¿Cómo funciona?</h3>
                </div>
                <div className="grid-4">
                  {[
                    { n:'1', t:'Sugiere un juego', d:'Escribe el nombre en el Agente Juegos', c:'var(--purple)' },
                    { n:'2', t:'IA lo procesa', d:'Claude analiza y genera su ficha completa', c:'var(--cyan)' },
                    { n:'3', t:'Busca códigos', d:'El Agente Códigos genera los códigos al instante', c:'var(--green)' },
                    { n:'4', t:'Genera la guía', d:'El Agente Guías crea una guía paso a paso', c:'var(--pink)' },
                  ].map(s=>(
                    <div key={s.n} style={{ display:'flex',gap:10 }}>
                      <div style={{ width:26,height:26,borderRadius:'50%',background:`${s.c}18`,border:`1px solid ${s.c}35`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontSize:'.72rem',fontWeight:900,color:s.c,flexShrink:0 }}>{s.n}</div>
                      <div>
                        <div style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.84rem',color:'var(--text)',marginBottom:3 }}>{s.t}</div>
                        <div style={{ color:'var(--text-3)',fontSize:'.78rem',lineHeight:1.5 }}>{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {aiGames.length > 0 && (
                <div style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:20,padding:20 }}>
                  <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14 }}>
                    <h3 style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.93rem',color:'var(--text)' }}>🎮 Juegos añadidos esta sesión</h3>
                    <button onClick={clearAll} style={{ display:'flex',alignItems:'center',gap:4,background:'none',border:'none',color:'var(--text-3)',cursor:'pointer',fontFamily:'var(--font-ui)',fontSize:'.78rem' }} onMouseEnter={e=>e.currentTarget.style.color='var(--red)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-3)'}><Trash2 size={12}/>Limpiar</button>
                  </div>
                  <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:8 }}>
                    {aiGames.map(g=>(
                      <button key={g.slug} onClick={()=>{setSel(g);setTab('codes')}} style={{ display:'flex',alignItems:'center',gap:8,padding:'8px 10px',background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:10,cursor:'pointer',textAlign:'left',transition:'all .15s' }}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(0,229,255,0.2)';e.currentTarget.style.background='rgba(0,229,255,0.04)'}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='var(--bg-2)'}}
                      >
                        <div style={{ width:32,height:32,borderRadius:8,background:g.gradient,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0 }}>{g.emoji}</div>
                        <div style={{ minWidth:0 }}>
                          <div style={{ fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.82rem',color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{g.name}</div>
                          <div style={{ color:'var(--text-3)',fontSize:'.68rem' }}>{g.category}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <AdInline/>
            </div>
          )}

          {/* CODES TAB */}
          {tab==='codes' && (
            <div style={{ display:'grid',gridTemplateColumns:'260px 1fr',gap:20,alignItems:'start' }}>
              <div style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden' }}>
                <div style={{ padding:'10px 14px',borderBottom:'1px solid var(--border)',fontFamily:'var(--font-display)',fontSize:'.6rem',letterSpacing:'1.5px',color:'var(--text-3)' }}>JUEGO ({allGames.length})</div>
                <div style={{ maxHeight:500,overflowY:'auto',padding:'4px' }}>
                  {allGames.map(g=>(
                    <button key={g.slug} onClick={()=>setSel(g)} style={{ width:'100%',display:'flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:8,border:'none',cursor:'pointer',textAlign:'left',transition:'all .15s',background:sel?.slug===g.slug?'rgba(0,229,255,0.08)':'transparent',borderLeft:`2px solid ${sel?.slug===g.slug?'var(--cyan)':'transparent'}` }}>
                      <span style={{ fontSize:'1.1rem',flexShrink:0 }}>{g.emoji}</span>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.82rem',color:sel?.slug===g.slug?'var(--cyan)':'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:4 }}>
                          {g.name}{g.aiGenerated&&<span className="badge badge-ai" style={{ fontSize:'.5rem',padding:'1px 4px' }}>IA</span>}
                        </div>
                        <div style={{ color:'var(--text-3)',fontSize:'.67rem' }}>{g.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {sel && <AgentCodes key={sel.slug} game={sel}/>}
            </div>
          )}

          {/* GAMES TAB */}
          {tab==='games' && (
            <div style={{ maxWidth:680 }}>
              <AgentGames onSelect={(g)=>{setSel(g);setTab('codes')}}/>
            </div>
          )}

          {/* GUIDES TAB */}
          {tab==='guides' && (
            <div style={{ display:'grid',gridTemplateColumns:'260px 1fr',gap:20,alignItems:'start' }}>
              <div style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:16,overflow:'hidden' }}>
                <div style={{ padding:'10px 14px',borderBottom:'1px solid var(--border)',fontFamily:'var(--font-display)',fontSize:'.6rem',letterSpacing:'1.5px',color:'var(--text-3)' }}>JUEGO ({allGames.length})</div>
                <div style={{ maxHeight:500,overflowY:'auto',padding:'4px' }}>
                  {allGames.map(g=>(
                    <button key={g.slug} onClick={()=>setSel(g)} style={{ width:'100%',display:'flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:8,border:'none',cursor:'pointer',textAlign:'left',transition:'all .15s',background:sel?.slug===g.slug?'rgba(192,38,211,0.08)':'transparent',borderLeft:`2px solid ${sel?.slug===g.slug?'var(--purple)':'transparent'}` }}>
                      <span style={{ fontSize:'1.1rem',flexShrink:0 }}>{g.emoji}</span>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.82rem',color:sel?.slug===g.slug?'var(--purple)':'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{g.name}</div>
                        <div style={{ color:'var(--text-3)',fontSize:'.67rem' }}>{g.category}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {sel && <AgentGuides key={sel.slug} game={sel}/>}
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}@media(max-width:700px){.grid-3{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
