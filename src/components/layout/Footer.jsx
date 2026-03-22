import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { GAMES } from '../../data/db'

export default function Footer() {
  const col1 = GAMES.slice(0,5), col2 = GAMES.slice(5,10), col3 = GAMES.slice(10)
  const year = new Date().getFullYear()

  return (
    <footer style={{ background:'var(--bg-2)', borderTop:'1px solid var(--border)', padding:'56px 0 32px', marginTop:80 }}>
      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:'2rem', marginBottom:'3rem' }}>
          {/* Brand */}
          <div style={{ gridColumn:'span 2' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <div style={{ width:32,height:32,borderRadius:9, background:'linear-gradient(135deg,#00e5ff,#c026d3)', display:'flex',alignItems:'center',justifyContent:'center' }}>
                <Zap size={16} color="#fff"/>
              </div>
              <span style={{ fontFamily:'var(--font-display)',fontSize:'1rem',fontWeight:900, background:'linear-gradient(90deg,#00e5ff,#c026d3)', WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>RobloxHub</span>
            </div>
            <p style={{ color:'var(--text-3)', fontSize:'.82rem', lineHeight:1.7, maxWidth:240, marginBottom:16 }}>
              El portal #1 de Roblox en español. Códigos verificados, guías completas y IA integrada.
            </p>
            <div style={{ display:'flex', gap:8 }}>
              {['𝕏','YT','TT','DC'].map(s=>(
                <button key={s} style={{ width:32,height:32,borderRadius:8, background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)', color:'var(--text-2)', fontSize:'.7rem', fontFamily:'var(--font-display)', fontWeight:700, cursor:'pointer', transition:'all .2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-cyan)';e.currentTarget.style.color='var(--cyan)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text-2)'}}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontFamily:'var(--font-display)',fontSize:'.62rem',letterSpacing:'2px',color:'var(--text-3)',marginBottom:14 }}>NAVEGACIÓN</div>
            {[['/',  '🏠 Inicio'],['/codigos','🎁 Códigos'],['/guias','📚 Guías'],['/quiz','🎯 Quiz'],['/ia','🤖 Centro IA']].map(([to,l])=>(
              <Link key={to} to={to} style={{ display:'block',color:'var(--text-2)',fontSize:'.85rem',marginBottom:8,transition:'color .2s' }}
                onMouseEnter={e=>e.target.style.color='var(--cyan)'}
                onMouseLeave={e=>e.target.style.color='var(--text-2)'}
              >{l}</Link>
            ))}
          </div>

          {/* Games col 1 */}
          <div>
            <div style={{ fontFamily:'var(--font-display)',fontSize:'.62rem',letterSpacing:'2px',color:'var(--text-3)',marginBottom:14 }}>JUEGOS</div>
            {col1.map(g=>(
              <Link key={g.slug} to={`/codigos/${g.slug}`} style={{ display:'flex',alignItems:'center',gap:6,color:'var(--text-2)',fontSize:'.83rem',marginBottom:8,transition:'color .2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='var(--cyan)'}
                onMouseLeave={e=>e.currentTarget.style.color='var(--text-2)'}
              >{g.emoji} {g.name}</Link>
            ))}
          </div>

          {/* Games col 2 */}
          <div>
            <div style={{ fontFamily:'var(--font-display)',fontSize:'.62rem',letterSpacing:'2px',color:'var(--text-3)',marginBottom:14 }}>MÁS JUEGOS</div>
            {col2.map(g=>(
              <Link key={g.slug} to={`/codigos/${g.slug}`} style={{ display:'flex',alignItems:'center',gap:6,color:'var(--text-2)',fontSize:'.83rem',marginBottom:8,transition:'color .2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='var(--cyan)'}
                onMouseLeave={e=>e.currentTarget.style.color='var(--text-2)'}
              >{g.emoji} {g.name}</Link>
            ))}
          </div>

          {/* Games col 3 + legal */}
          <div>
            <div style={{ fontFamily:'var(--font-display)',fontSize:'.62rem',letterSpacing:'2px',color:'var(--text-3)',marginBottom:14 }}>NUEVOS</div>
            {col3.map(g=>(
              <Link key={g.slug} to={`/codigos/${g.slug}`} style={{ display:'flex',alignItems:'center',gap:6,color:'var(--text-2)',fontSize:'.83rem',marginBottom:8,transition:'color .2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='var(--cyan)'}
                onMouseLeave={e=>e.currentTarget.style.color='var(--text-2)'}
              >{g.emoji} {g.name}</Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop:'1px solid var(--border)',paddingTop:24, display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12 }}>
          <p style={{ color:'var(--text-3)',fontSize:'.75rem' }}>
            © {year} RobloxHub · No afiliado con Roblox Corporation · Hecho con ❤️ para la comunidad
          </p>
          <div style={{ display:'flex',gap:20 }}>
            {['Privacidad','Términos','Contacto'].map(s=>(
              <span key={s} style={{ color:'var(--text-3)',fontSize:'.75rem',cursor:'pointer',transition:'color .2s' }}
                onMouseEnter={e=>e.target.style.color='var(--cyan)'}
                onMouseLeave={e=>e.target.style.color='var(--text-3)'}
              >{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
