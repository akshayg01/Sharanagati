import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Songbook from './pages/Songbook.jsx'
import SongPage from './pages/SongPage.jsx'
import Timeline from './pages/Timeline.jsx'
import Qualities from './pages/Qualities.jsx'
import Offering from './pages/Offering.jsx'
import Support from './pages/Support.jsx'
import NotFound from './pages/NotFound.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // These scroll themselves to the chapter / quality they name.
    if (/^\/(timeline|qualities)\/.+/.test(pathname)) return
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songbook" element={<Songbook />} />
          <Route path="/song/:slug" element={<SongPage />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/timeline/:anchor" element={<Timeline />} />
          <Route path="/qualities" element={<Qualities />} />
          <Route path="/qualities/:slug" element={<Qualities />} />
          <Route path="/offering" element={<Offering />} />
          <Route path="/offering/:slug" element={<Offering />} />
          <Route path="/support" element={<Support />} />
          {/* The old Glorification page now opens His Life, where its content lives. */}
          <Route path="/about" element={<Navigate to="/timeline" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
