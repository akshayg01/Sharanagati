import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { sectionsWithSongs, TOTAL_SONGS } from '../data/songs.js'
import { Divider } from '../components/Om.jsx'

export default function Songbook() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    }
  }, [hash])

  const scrollToSection = (slug) => {
    const el = document.getElementById(slug)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <header className="text-center">
        <p className="section-eyebrow">The Complete Songbook</p>
        <h1 className="mt-2 font-serif text-4xl text-white sm:text-5xl">Śaraṇāgati</h1>
        <p className="mx-auto mt-4 max-w-2xl text-night-300">
          All {TOTAL_SONGS} songs of surrender, arranged in the six limbs of śaraṇāgati as
          composed by Śrīla Bhaktivinoda Ṭhākura.
        </p>
        <Divider className="mt-6" />
      </header>

      {/* Quick section index */}
      <nav className="mt-8 flex flex-wrap justify-center gap-2">
        {sectionsWithSongs.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => scrollToSection(s.slug)}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-night-200 transition-colors hover:border-saffron-400/40 hover:text-saffron-300"
          >
            {s.name}
          </button>
        ))}
      </nav>

      <div className="mt-12 space-y-14">
        {sectionsWithSongs.map((section) => (
          <section key={section.slug} id={section.slug} className="scroll-mt-24">
            <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
              <div>
                <p className="section-eyebrow">
                  {section.index === 1 ? 'Invocation' : `Principle ${section.index - 1}`}
                </p>
                <h2 className="font-serif text-2xl text-white sm:text-3xl">
                  {section.name}
                  <span className="ml-3 text-lg font-normal text-saffron-300/80">
                    {section.meaning}
                  </span>
                </h2>
              </div>
              {section.sanskrit && (
                <span className="hidden font-deva text-3xl text-saffron-300/50 sm:block">
                  {section.sanskrit}
                </span>
              )}
            </div>

            <ol className="grid gap-2.5 sm:grid-cols-2">
              {section.songs.map((song) => (
                <li key={song.slug}>
                  <Link
                    to={`/song/${song.slug}`}
                    className="glass glass-hover group flex items-center gap-4 rounded-xl px-4 py-3.5"
                  >
                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/5 font-serif text-sm text-saffron-300/90">
                      {song.order}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-serif text-[15px] text-white group-hover:text-saffron-100">
                        {song.title}
                      </span>
                      <span className="block truncate text-xs text-night-400">{song.label}</span>
                    </span>
                    {song.audio && (
                      <span
                        title="Recording by Maharaja available"
                        className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-saffron-500/15 text-saffron-300"
                      >
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </span>
                    )}
                    <svg className="h-4 w-4 flex-none text-night-500 transition-colors group-hover:text-saffron-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  )
}
