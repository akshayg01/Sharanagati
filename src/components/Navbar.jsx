import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LotusMark } from './Om.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/songbook', label: 'Songbook' },
  { to: '/timeline', label: 'His Life' },
  { to: '/about', label: 'Glorification' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
      isActive ? 'text-saffron-300' : 'text-night-200 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-night-950/70 backdrop-blur-xl">
      {/* h-16 is fixed on purpose: the timeline's sticky chapter chips sit at top-16. */}
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <LotusMark className="h-7 w-7 transition-transform group-hover:scale-110" />
          <span className="font-serif text-xl font-semibold tracking-wide gold-text">
            Śaraṇāgati
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className="rounded-lg p-2 text-night-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 px-5 pb-4 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-base ${
                  isActive ? 'bg-white/5 text-saffron-300' : 'text-night-200'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
