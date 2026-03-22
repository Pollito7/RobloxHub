import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, ChevronRight, Code, Trophy } from 'lucide-react'
import SEO from '../components/ui/SEO'
import { questions, calcResult } from '../data/quiz'

export default function QuizPage() {
  const [step, setStep]     = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [result, setResult]   = useState(null)
  const [animating, setAnimating] = useState(false)

  const progress = (step / questions.length) * 100
  const q = questions[step]

  const pick = (val) => {
    if (animating) return
    setSelected(val)
    setAnimating(true)
    setTimeout(() => {
      const next = [...answers, val]
      if (step + 1 >= questions.length) { setResult(calcResult(next)) }
      else { setAnswers(next); setStep(step + 1); setSelected(null) }
      setAnimating(false)
    }, 500)
  }

  const reset = () => { setStep(0); setAnswers([]); setSelected(null); setResult(null) }

  return (
    <>
      <SEO title="¿Qué juego de Roblox eres?" desc="5 preguntas para descubrir qué juego de Roblox encaja con tu personalidad. ¡Hazlo ahora!" path="/quiz"/>
      <div style={{ paddingTop:94, minHeight:'100vh' }}>
        <div style={{ maxWidth:660, margin:'0 auto', padding:'48px 20px 80px' }}>

          {result ? (
            <div style={{ animation:'fadeUp .5s ease' }}>
              <div style={{
                background:`linear-gradient(135deg,${result.color}18,${result.color}08)`,
                border:`1px solid ${result.color}35`,
                borderRadius:24, padding:'40px 32px', textAlign:'center',
                boxShadow:`0 20px 60px ${result.color}15`,
              }}>
                <div style={{ fontSize:'5rem', marginBottom:12, filter:`drop-shadow(0 0 20px ${result.color}60)` }}>{result.emoji}</div>
                <div style={{ fontFamily:'var(--font-display)',fontSize:'.65rem',letterSpacing:'3px',color:result.color,marginBottom:6 }}>TU JUEGO IDEAL ES</div>
                <h2 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(2rem,6vw,3rem)',fontWeight:900,color:'var(--text)',marginBottom:16,textShadow:`0 0 30px ${result.color}50` }}>{result.game}</h2>
                <p style={{ color:'var(--text-2)',fontSize:'.95rem',lineHeight:1.7,maxWidth:500,margin:'0 auto 20px' }}>{result.desc}</p>
                <div style={{ display:'flex',gap:8,justifyContent:'center',marginBottom:24,flexWrap:'wrap' }}>
                  {result.traits.map(t=>(
                    <span key={t} style={{ padding:'4px 12px',borderRadius:99,background:`${result.color}15`,border:`1px solid ${result.color}35`,color:result.color,fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.83rem' }}>{t}</span>
                  ))}
                </div>
                <div style={{ background:'rgba(255,255,255,0.04)',border:'1px solid var(--border)',borderRadius:12,padding:'12px 16px',marginBottom:28,textAlign:'left' }}>
                  <span style={{ color:'var(--yellow)',fontWeight:700,fontSize:'.83rem' }}>💡 Tip: </span>
                  <span style={{ color:'var(--text-2)',fontSize:'.83rem' }}>{result.tip}</span>
                </div>
                <div style={{ display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap' }}>
                  <Link to={`/codigos/${result.slug}`} className="btn btn-primary">
                    <Code size={15}/> Códigos de {result.game}
                  </Link>
                  <button onClick={reset} className="btn btn-ghost">
                    <RotateCcw size={15}/> Repetir
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ textAlign:'center', marginBottom:36 }}>
                <div style={{ fontSize:'2.5rem', marginBottom:12 }}>🎯</div>
                <h1 style={{ fontFamily:'var(--font-display)',fontSize:'clamp(1.5rem,4vw,2.2rem)',fontWeight:900,background:'var(--grad-brand)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',marginBottom:8 }}>
                  ¿Qué juego de Roblox eres?
                </h1>
                <p style={{ color:'var(--text-2)',fontSize:'.9rem' }}>Responde {questions.length} preguntas y descúbrelo</p>
              </div>

              {/* Progress */}
              <div style={{ marginBottom:28 }}>
                <div style={{ display:'flex',justifyContent:'space-between',marginBottom:6 }}>
                  <span style={{ fontFamily:'var(--font-display)',fontSize:'.62rem',letterSpacing:'1.5px',color:'var(--text-3)' }}>PREGUNTA {step+1} DE {questions.length}</span>
                  <span style={{ fontFamily:'var(--font-mono)',fontSize:'.65rem',color:'var(--cyan)' }}>{Math.round(progress)}%</span>
                </div>
                <div style={{ height:5,background:'var(--bg-2)',borderRadius:99,overflow:'hidden',border:'1px solid var(--border)' }}>
                  <div style={{ height:'100%',width:`${progress}%`,background:'linear-gradient(90deg,var(--cyan),var(--purple))',borderRadius:99,transition:'width .4s ease',boxShadow:'0 0 8px rgba(0,229,255,0.4)' }}/>
                </div>
              </div>

              {/* Question */}
              <div style={{ background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:20,padding:'32px 24px',boxShadow:'0 8px 40px rgba(0,0,0,0.4)' }}>
                <div style={{ textAlign:'center',marginBottom:24 }}>
                  <div style={{ fontSize:'2.2rem',marginBottom:10 }}>{q.emoji}</div>
                  <h2 style={{ fontFamily:'var(--font-ui)',fontSize:'clamp(1.1rem,3vw,1.45rem)',fontWeight:700,color:'var(--text)',lineHeight:1.4 }}>{q.q}</h2>
                </div>
                <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
                  {q.opts.map((opt,i) => {
                    const isSel = selected === opt.v
                    return (
                      <button key={i} onClick={()=>pick(opt.v)} disabled={!!animating} style={{
                        width:'100%',padding:'13px 18px',
                        background: isSel ? 'linear-gradient(135deg,rgba(192,38,211,0.15),rgba(0,229,255,0.12))' : 'rgba(255,255,255,0.03)',
                        border:`1px solid ${isSel?'rgba(0,229,255,0.4)':'var(--border)'}`,
                        borderRadius:12,color: isSel?'var(--text)':'var(--text-2)',
                        fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.93rem',
                        cursor:animating?'default':'pointer',textAlign:'left',
                        display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,
                        transition:'all .2s',transform:isSel?'scale(1.01)':'scale(1)',
                        boxShadow:isSel?'0 0 20px rgba(0,229,255,0.12)':'none',
                      }}
                        onMouseEnter={e=>{ if(!isSel&&!animating){e.currentTarget.style.background='rgba(0,229,255,0.05)';e.currentTarget.style.borderColor='rgba(0,229,255,0.2)';e.currentTarget.style.color='var(--text)'} }}
                        onMouseLeave={e=>{ if(!isSel){e.currentTarget.style.background='rgba(255,255,255,0.03)';e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text-2)'} }}
                      >
                        {opt.t} <ChevronRight size={15} style={{ flexShrink:0 }}/>
                      </button>
                    )
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>
    </>
  )
}
