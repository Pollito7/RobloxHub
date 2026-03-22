import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react'
import SEO from '../components/ui/SEO'
import { AdInline, AdRect } from '../components/ui/AdSense'
import { getGuide, guides } from '../data/guides'

const DC = { Principiante:'var(--green)', Intermedio:'var(--yellow)', Avanzado:'var(--red)' }

export default function GuidePage() {
  const { slug } = useParams()
  const guide = getGuide(slug)
  const [open, setOpen] = useState(0)
  const others = guides.filter(g => g.slug !== slug).slice(0, 5)

  if (!guide) return (
    <div style={{ paddingTop:130, textAlign:'center', minHeight:'60vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      <div style={{ fontSize:'3rem', marginBottom:12 }}>📭</div>
      <h2 style={{ fontFamily:'var(--font-ui)', fontWeight:700, marginBottom:16 }}>Guía no encontrada</h2>
      <Link to="/guias" className="btn btn-primary">← Ver todas las guías</Link>
    </div>
  )

  return (
    <>
      <SEO title={guide.title} desc={guide.description} path={`/guias/${slug}`}/>
      <div style={{ paddingTop:94 }}>
        {/* Header */}
        <div style={{ background:'linear-gradient(135deg,rgba(192,38,211,0.07),rgba(0,229,255,0.05))', borderBottom:'1px solid var(--border)', padding:'48px 0 36px' }}>
          <div className="container" style={{ maxWidth:900 }}>
            <Link to="/guias" style={{ display:'inline-flex',alignItems:'center',gap:6,color:'var(--text-3)',marginBottom:16,textDecoration:'none',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.85rem',transition:'color .2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='var(--cyan)'}
              onMouseLeave={e=>e.currentTarget.style.color='var(--text-3)'}
            >
              <ArrowLeft size={14}/> Todas las guías
            </Link>
            <div style={{ fontSize:'2.5rem', marginBottom:12 }}>{guide.emoji}</div>
            <div style={{ display:'flex',gap:8,flexWrap:'wrap',marginBottom:12,alignItems:'center' }}>
              <span style={{ padding:'3px 10px',borderRadius:99,background:'rgba(192,38,211,0.1)',border:'1px solid rgba(192,38,211,0.2)',fontSize:'.7rem',color:'var(--purple)',fontFamily:'var(--font-ui)',fontWeight:700 }}>{guide.category}</span>
              <span style={{ padding:'3px 10px',borderRadius:99,background:'rgba(255,255,255,0.04)',border:'1px solid var(--border)',fontSize:'.7rem',color:DC[guide.difficulty]||'var(--text-3)' }}>{guide.difficulty}</span>
              <span style={{ padding:'3px 10px',borderRadius:99,background:'rgba(255,255,255,0.04)',border:'1px solid var(--border)',fontSize:'.7rem',color:'var(--text-3)' }}>⏱️ {guide.readTime}</span>
              {guide.isNew && <span className="badge badge-new">NUEVO</span>}
            </div>
            <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.6rem,4vw,2.5rem)',fontWeight:900,color:'var(--text)',lineHeight:1.15,marginBottom:12 }}>{guide.title}</h1>
            <p style={{ color:'var(--text-2)',fontSize:'1rem',lineHeight:1.7,maxWidth:700 }}>{guide.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="container" style={{ maxWidth:900, padding:'40px 20px 80px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:32, alignItems:'start' }}>
            <div>
              {/* Steps */}
              <div style={{ fontFamily:'var(--font-display)',fontSize:'.65rem',letterSpacing:'2px',color:'var(--text-3)',marginBottom:16 }}>
                📋 PASOS ({guide.steps?.length || 0})
              </div>
              <div style={{ display:'flex',flexDirection:'column',gap:8,marginBottom:32 }}>
                {(guide.steps||[]).map((step,i) => (
                  <div key={i} style={{ background:'var(--bg-card)',border:`1px solid ${open===i?'rgba(192,38,211,0.25)':'var(--border)'}`,borderRadius:14,overflow:'hidden',transition:'border-color .2s' }}>
                    <button onClick={()=>setOpen(open===i?-1:i)} style={{ width:'100%',display:'flex',alignItems:'center',gap:12,padding:'14px 18px',background:'none',border:'none',cursor:'pointer',textAlign:'left' }}>
                      <div style={{ width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#c026d3,#00e5ff)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-display)',fontWeight:900,fontSize:'.78rem',color:'#fff',flexShrink:0 }}>{i+1}</div>
                      <span style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'.93rem',color:'var(--text)',flex:1,textAlign:'left' }}>{step.title}</span>
                      {open===i ? <ChevronUp size={15} color="var(--text-3)"/> : <ChevronDown size={15} color="var(--text-3)"/>}
                    </button>
                    {open===i && (
                      <div style={{ padding:'0 18px 16px 60px' }}>
                        <p style={{ color:'var(--text-2)',fontSize:'.87rem',lineHeight:1.7,marginBottom:step.tip?12:0 }}>{step.content}</p>
                        {step.tip && (
                          <div style={{ display:'flex',gap:8,padding:'10px 12px',background:'rgba(245,158,11,0.06)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:10 }}>
                            <Lightbulb size={14} color="var(--yellow)" style={{ flexShrink:0,marginTop:2 }}/>
                            <p style={{ color:'rgba(245,158,11,0.85)',fontSize:'.82rem',lineHeight:1.6,margin:0 }}><strong>Consejo:</strong> {step.tip}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <AdInline/>

              {/* Tips */}
              {guide.tips?.length > 0 && (
                <div style={{ marginBottom:28 }}>
                  <div style={{ fontFamily:'var(--font-display)',fontSize:'.65rem',letterSpacing:'2px',color:'var(--green)',marginBottom:12 }}>✅ CONSEJOS CLAVE</div>
                  <div style={{ display:'flex',flexDirection:'column',gap:6 }}>
                    {guide.tips.map((t,i) => (
                      <div key={i} style={{ display:'flex',gap:10,padding:'10px 14px',background:'rgba(16,185,129,0.04)',border:'1px solid rgba(16,185,129,0.12)',borderRadius:10 }}>
                        <CheckCircle size={14} color="var(--green)" style={{ flexShrink:0,marginTop:2 }}/>
                        <span style={{ color:'var(--text-2)',fontSize:'.85rem',lineHeight:1.6 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Errors */}
              {guide.errors?.length > 0 && (
                <div>
                  <div style={{ fontFamily:'var(--font-display)',fontSize:'.65rem',letterSpacing:'2px',color:'var(--red)',marginBottom:12 }}>⚠️ ERRORES COMUNES</div>
                  <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                    {guide.errors.map((e,i) => (
                      <div key={i} style={{ padding:'12px 14px',background:'rgba(239,68,68,0.04)',border:'1px solid rgba(239,68,68,0.14)',borderRadius:10 }}>
                        <div style={{ display:'flex',alignItems:'center',gap:6,marginBottom:4 }}>
                          <AlertTriangle size={13} color="var(--red)"/>
                          <code style={{ fontSize:'.78rem',color:'var(--red)',background:'rgba(239,68,68,0.1)',padding:'1px 6px',borderRadius:5 }}>{e.error}</code>
                        </div>
                        <p style={{ color:'var(--text-2)',fontSize:'.82rem',margin:0,lineHeight:1.5,paddingLeft:19 }}>→ {e.solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="hide-mobile">
              <AdRect style={{ marginBottom:16 }}/>
              <div style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:14,padding:16,position:'sticky',top:100 }}>
                <div style={{ fontFamily:'var(--font-display)',fontSize:'.62rem',letterSpacing:'2px',color:'var(--text-3)',marginBottom:14 }}>MÁS GUÍAS</div>
                <div style={{ display:'flex',flexDirection:'column',gap:5 }}>
                  {others.map(g => (
                    <Link key={g.slug} to={`/guias/${g.slug}`} style={{ display:'flex',alignItems:'center',gap:10,padding:'8px',borderRadius:10,textDecoration:'none',transition:'background .15s' }}
                      onMouseEnter={e=>e.currentTarget.style.background='rgba(192,38,211,0.06)'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                    >
                      <span style={{ fontSize:'1.2rem' }}>{g.emoji}</span>
                      <div style={{ flex:1,minWidth:0 }}>
                        <div style={{ fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.82rem',color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }}>{g.title}</div>
                        <div style={{ color:'var(--text-3)',fontSize:'.68rem' }}>{g.readTime}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.hide-mobile{display:none!important}}`}</style>
    </>
  )
}
