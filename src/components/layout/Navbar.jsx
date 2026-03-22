import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Zap, Search, Sun, Moon, Menu, X, Sparkles } from 'lucide-react'
import SearchModal from '../ui/SearchModal'

const NAV = [
  { to:'/codigos',  label:'Códigos' },
  { to:'/guias',    label:'Guías' },
  { to:'/quiz',     label:'Quiz 🎯' },
  { to:'/ia',       label:'IA',  badge:'NUEVO' },
]

export default function Navbar({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [search,   setSearch]   = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const active = (to) => pathname === to || (to !== '/' && pathname.startsWith(to))

  return (
    <>
      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000, height:64,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 20px',
        background: scrolled ? 'rgba(8,8,16,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,229,255,0.08)' : 'none',
        transition: 'all .3s ease',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <div style={{
            width:36, height:36, borderRadius:10,
            background:'linear-gradient(135deg,#00e5ff,#c026d3)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 0 20px rgba(0,229,255,0.35)',
          }}>
            <Zap size={18} color="#fff" />
          </div>
          <div>
            <span style={{
              fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:900,
              background:'linear-gradient(90deg,#00e5ff,#c026d3)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            }}>RobloxHub</span>
            <div style={{
              fontFamily:'var(--font-display)', fontSize:'.52rem', letterSpacing:'2px',
              color:'rgba(0,229,255,0.5)', marginTop:'-3px',
            }}>CÓDIGOS • GUÍAS • IA</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display:'flex', alignItems:'center', gap:4, '@media(max-width:768px)':{display:'none'} }} className="hide-mobile">
          {NAV.map(n => (
            <Link key={n.to} to={n.to} style={{
              display:'flex', alignItems:'center', gap:5,
              padding:'6px 14px', borderRadius:8,
              fontFamily:'var(--font-ui)', fontWeight:600, fontSize:'.88rem',
              color: active(n.to) ? 'var(--cyan)' : 'var(--text-2)',
              background: active(n.to) ? 'rgba(0,229,255,0.08)' : 'transparent',
              border: `1px solid ${active(n.to) ? 'rgba(0,229,255,0.18)' : 'transparent'}`,
              transition:'all .2s',
            }}
              onMouseEnter={e=>{ if(!active(n.to)){ e.currentTarget.style.color='var(--text)'; e.currentTarget.style.background='rgba(255,255,255,0.04)' }}}
              onMouseLeave={e=>{ if(!active(n.to)){ e.currentTarget.style.color='var(--text-2)'; e.currentTarget.style.background='transparent' }}}
            >
              {n.label}
              {n.badge && (
                <span style={{
                  padding:'1px 6px', borderRadius:99,
                  background:'linear-gradient(135deg,#00e5ff,#c026d3)',
                  color:'#fff', fontSize:'.55rem', fontFamily:'var(--font-display)',
                  fontWeight:700, letterSpacing:'0.5px',
                }}>{n.badge}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <button onClick={()=>setSearch(true)} style={{
            background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)',
            borderRadius:8, width:36, height:36, display:'flex', alignItems:'center',
            justifyContent:'center', color:'var(--text-2)', transition:'all .2s',
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-cyan)';e.currentTarget.style.color='var(--cyan)'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text-2)'}}
          >
            <Search size={16} />
          </button>
          <button onClick={()=>setDark(!dark)} style={{
            background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)',
            borderRadius:8, width:36, height:36, display:'flex', alignItems:'center',
            justifyContent:'center', color:'var(--text-2)', transition:'all .2s',
          }}>
            {dark ? <Sun size={16}/> : <Moon size={16}/>}
          </button>
          <Link to="/ia" className="btn btn-primary btn-sm hide-mobile" style={{ gap:5 }}>
            <Sparkles size={13}/> Usar IA
          </Link>
          <button onClick={()=>setMenuOpen(!menuOpen)} style={{
            background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)',
            borderRadius:8, width:36, height:36, display:'none', alignItems:'center',
            justifyContent:'center', color:'var(--text-2)',
          }} className="show-mobile-flex">
            {menuOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position:'fixed', top:64, left:0, right:0, zIndex:999,
          background:'rgba(8,8,16,0.98)', backdropFilter:'blur(20px)',
          borderBottom:'1px solid rgba(0,229,255,0.1)',
          padding:'12px 20px 20px', display:'flex', flexDirection:'column', gap:6,
        }}>
          {[{to:'/',label:'🏠 Inicio'}, ...NAV].map(n => (
            <Link key={n.to} to={n.to} style={{
              padding:'12px 14px', borderRadius:10,
              fontFamily:'var(--font-ui)', fontWeight:600, fontSize:'1rem',
              color: active(n.to) ? 'var(--cyan)' : 'var(--text)',
              background: active(n.to) ? 'rgba(0,229,255,0.08)' : 'rgba(255,255,255,0.03)',
              display:'flex', alignItems:'center', gap:8,
            }}>
              {n.label}
              {n.badge && <span style={{ padding:'1px 6px', borderRadius:99, background:'linear-gradient(135deg,#00e5ff,#c026d3)', color:'#fff', fontSize:'.55rem', fontFamily:'var(--font-display)', fontWeight:700 }}>{n.badge}</span>}
            </Link>
          ))}
        </div>
      )}

      {search && <SearchModal onClose={()=>setSearch(false)} />}

      <style>{`
        @media(max-width:768px){
          .hide-mobile{display:none!important}
          .show-mobile-flex{display:flex!important}
        }
      `}</style>
    </>
  )
}
