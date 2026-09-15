import { Link } from 'react-router-dom'
import { Divider, LotusMark } from '../components/Om.jsx'
import { sectionsWithSongs, TOTAL_SONGS } from '../data/songs.js'

export default function Home() {
  // Introductory song + the six limbs of surrender (exclude the later sections).
  const intro = sectionsWithSongs.find((s) => s.slug === 'introductory')
  const limbs = sectionsWithSongs.filter((s) => s.index >= 2 && s.index <= 7)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-saffron-500/20 blur-3xl" />
          <div className="absolute right-10 top-40 h-56 w-56 rounded-full bg-lotus-600/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-5 pb-16 pt-20 text-center sm:pt-28">
          <div className="mb-6 flex justify-center animate-float">
            <LotusMark className="h-16 w-16" />
          </div>
          <p className="section-eyebrow animate-fade-in-up">Surrendered to the Lord’s Shelter</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight animate-fade-in-up sm:text-7xl">
            <span className="gold-text animate-shimmer">Śaraṇāgati</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-night-200 animate-fade-in-up">
            The immortal songs of surrender by Śrīla Bhaktivinoda Ṭhākura — glorified
            through the divine recordings of{' '}
            <span className="text-saffron-200">His Holiness Bhakti Charu Swami Maharaja</span>.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
            <Link to="/songbook" className="btn-primary">
              Enter the Songbook
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" /></svg>
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white/15 px-6 py-3 font-medium text-night-100 transition-colors hover:border-saffron-400/40 hover:text-saffron-200"
            >
              Glorification of Maharaja
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8 text-sm text-night-400 animate-fade-in-up">
            <span><span className="font-serif text-2xl text-saffron-200">{TOTAL_SONGS}</span> songs</span>
            <span className="h-4 w-px bg-white/10" />
            <span><span className="font-serif text-2xl text-saffron-200">6</span> limbs of surrender</span>
            <span className="h-4 w-px bg-white/10" />
            <span><span className="font-serif text-2xl text-saffron-200">1893</span></span>
          </div>
        </div>
      </section>

      {/* The six limbs / sections */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="section-eyebrow">The Path of Surrender</p>
          <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
            The Six Limbs of Śaraṇāgati
          </h2>
          <Divider className="mt-6" />
        </div>

        {/* Introductory — full width */}
        {intro && (
          <Link
            to={`/songbook#${intro.slug}`}
            className="glass glass-hover group mb-4 flex flex-col items-start gap-3 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-6"
          >
            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-saffron-500/10 text-saffron-300/80 transition-colors group-hover:bg-saffron-500/20">
              <LotusMark className="h-7 w-7" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="section-eyebrow">Invocation</p>
              <h3 className="mt-1 font-serif text-2xl text-white">{intro.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-night-300">{intro.blurb}</p>
            </div>
            <svg className="hidden h-5 w-5 flex-none text-night-500 transition-colors group-hover:text-saffron-300 sm:block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}

        {/* The six limbs — two per row */}
        <div className="grid gap-4 sm:grid-cols-2">
          {limbs.map((section, i) => (
            <Link
              key={section.slug}
              to={`/songbook#${section.slug}`}
              className="glass glass-hover group rounded-2xl p-6"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-4xl text-white/15 transition-colors group-hover:text-saffron-400/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.sanskrit && (
                  <span className="font-deva text-2xl text-saffron-300/70">{section.sanskrit}</span>
                )}
              </div>
              <h3 className="mt-3 font-serif text-xl text-white">{section.name}</h3>
              <p className="text-sm font-medium text-saffron-300/80">{section.meaning}</p>
              <p className="mt-2 text-sm leading-relaxed text-night-300">{section.blurb}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-night-500">
                {section.songs.length} {section.songs.length === 1 ? 'song' : 'songs'}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
