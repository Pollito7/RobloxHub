import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
export default function NotFound() {
  return (
    <>
      <SEO title="Página no encontrada"/>
      <div style={{ paddingTop:94, minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'4rem 20px' }}>
        <div style={{ maxWidth:480 }}>
          <div style={{ fontFamily:'var(--font-display)',fontSize:'clamp(5rem,20vw,9rem)',fontWeight:900,lineHeight:1,background:'var(--grad-brand)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',filter:'drop-shadow(0 0 40px rgba(0,229,255,0.3))' }}>404</div>
          <div style={{ fontSize:'3rem', marginBottom:12 }}>👾</div>
          <h1 style={{ fontFamily:'var(--font-ui)',fontWeight:700,fontSize:'1.6rem',marginBottom:12,color:'var(--text)' }}>Página no encontrada</h1>
          <p style={{ color:'var(--text-2)',marginBottom:28,lineHeight:1.7 }}>Esta página fue eliminada o nunca existió. ¡Quizá el servidor de Roblox está caído! 😅</p>
          <div style={{ display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap' }}>
            <Link to="/" className="btn btn-primary">🏠 Inicio</Link>
            <Link to="/codigos" className="btn btn-outline">🎁 Códigos</Link>
          </div>
        </div>
      </div>
    </>
  )
}
