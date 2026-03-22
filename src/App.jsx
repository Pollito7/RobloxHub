import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar    from './components/layout/Navbar'
import Footer    from './components/layout/Footer'
import Ticker    from './components/layout/Ticker'
import Home      from './pages/Home'
import CodesPage from './pages/CodesPage'
import GamePage  from './pages/GamePage'
import GuidesPage from './pages/GuidesPage'
import GuidePage from './pages/GuidePage'
import QuizPage  from './pages/QuizPage'
import AICenter  from './pages/ai/AICenter'
import NotFound  from './pages/NotFound'

export default function App() {
  const [dark, setDark] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => { window.scrollTo(0,0) }, [pathname])
  useEffect(() => { document.body.style.background = dark ? '#080810' : '#f8fafc' }, [dark])

  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <Ticker />
      <main>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/codigos"      element={<CodesPage />} />
          <Route path="/codigos/:slug" element={<GamePage />} />
          <Route path="/guias"        element={<GuidesPage />} />
          <Route path="/guias/:slug"  element={<GuidePage />} />
          <Route path="/quiz"         element={<QuizPage />} />
          <Route path="/ia"           element={<AICenter />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
