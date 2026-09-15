import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSong, getSection, getNeighbors } from '../data/songs.js'
import AudioPlayer from '../components/AudioPlayer.jsx'
import { Divider } from '../components/Om.jsx'
import NotFound from './NotFound.jsx'

export default function SongPage() {
  const { slug } = useParams()
  const song = getSong(slug)
  const [showTranslation, setShowTranslation] = useState(true)

  if (!song) return <NotFound />

  const section = getSection(song.section)
  const { prev, next } = getNeighbors(slug)

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-night-400">
        <Link to="/songbook" className="hover:text-saffron-300">Songbook</Link>
        <span>/</span>
        <Link to={`/songbook#${section?.slug}`} className="hover:text-saffron-300">
          {section?.name}
        </Link>
      </nav>

      {/* Header */}
      <header className="text-center">
        <p className="section-eyebrow">{song.label}</p>
        <h1 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">
          {song.title}
        </h1>
        {section && (
          <p className="mt-3 text-sm text-night-300">
            {section.name} · <span className="text-saffron-300/80">{section.meaning}</span>
          </p>
        )}
        <Divider className="mt-6" />
      </header>

      {/* Audio */}
      <div className="mt-8">
        <AudioPlayer audio={song.audio} title={`${song.label} — ${song.title}`} />
      </div>

      {/* Translation toggle */}
      <div className="mt-8 flex items-center justify-end">
        <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-night-300">
          <span>Show translation</span>
          <button
            role="switch"
            aria-checked={showTranslation}
            onClick={() => setShowTranslation((v) => !v)}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              showTranslation ? 'bg-saffron-500' : 'bg-white/15'
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                showTranslation ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </label>
      </div>

      {/* Verses */}
      <div className="mt-6 space-y-8">
        {song.verses.map((verse, i) => (
          <article
            key={i}
            className="glass rounded-2xl p-6 transition-colors hover:border-white/15"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-saffron-500/15 px-2 font-serif text-sm text-saffron-300">
                {verse.label}
              </span>
              <span className="h-px flex-1 bg-white/5" />
            </div>

            <div className="space-y-1">
              {verse.translit.map((line, j) => (
                <p
                  key={j}
                  className="font-serif text-lg italic leading-relaxed text-saffron-50/95"
                >
                  {line}
                </p>
              ))}
            </div>

            {showTranslation && verse.translation && (
              <p className="mt-4 border-l-2 border-saffron-400/30 pl-4 text-[15px] leading-relaxed text-night-200">
                {verse.translation}
              </p>
            )}
          </article>
        ))}
      </div>

      {/* Source */}
      <p className="mt-8 text-center text-xs text-night-500">
        Lyrics &amp; translation courtesy of{' '}
        <a
          href={song.source?.url}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-dotted hover:text-saffron-300"
        >
          {song.source?.name}
        </a>
      </p>

      {/* Prev / Next */}
      <nav className="mt-10 grid grid-cols-2 gap-3">
        {prev ? (
          <Link to={`/song/${prev.slug}`} className="glass glass-hover group rounded-xl p-4">
            <span className="text-xs uppercase tracking-widest text-night-500">Previous</span>
            <span className="mt-1 flex items-center gap-2 font-serif text-sm text-white">
              <svg className="h-4 w-4 flex-none text-saffron-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              <span className="truncate">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/song/${next.slug}`} className="glass glass-hover group rounded-xl p-4 text-right">
            <span className="text-xs uppercase tracking-widest text-night-500">Next</span>
            <span className="mt-1 flex items-center justify-end gap-2 font-serif text-sm text-white">
              <span className="truncate">{next.title}</span>
              <svg className="h-4 w-4 flex-none text-saffron-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  )
}
