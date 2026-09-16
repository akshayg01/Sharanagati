import { Link } from 'react-router-dom'
import Reveal from '../Reveal.jsx'
import { LotusMark } from '../Om.jsx'
import { songs } from '../../data/songs.js'
import { OFFICIAL_CHANNELS } from '../../data/audio.js'

/**
 * Closing panel of the final chapter: the life ends, the voice does not.
 * Links straight into the songs on this site that carry his recordings.
 */
export default function ListenPanel() {
  const recorded = songs.filter((s) => s.audio).slice(0, 8)

  return (
    <Reveal className="glass relative mt-10 overflow-hidden rounded-3xl p-7 sm:p-10">
      <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-saffron-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <LotusMark className="h-6 w-6" />
          <p className="section-eyebrow">His voice remains</p>
        </div>

        <h3 className="mt-3 font-serif text-2xl text-white sm:text-3xl">
          The songs he left behind
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-night-200">
          Śrīla Bhaktivinoda Ṭhākura wrote <em>Śaraṇāgati</em> in 1893. A century later
          Maharaja sang it — and it is through these recordings that most of us first heard
          what surrender sounds like. This whole website exists for them.
        </p>

        {recorded.length > 0 && (
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {recorded.map((song) => (
              <li key={song.slug}>
                <Link
                  to={`/song/${song.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-saffron-400/40 hover:bg-white/[0.06]"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-saffron-500/15 text-saffron-300 transition-colors group-hover:bg-saffron-500/25">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.72-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14z" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-serif text-[15px] text-white group-hover:text-saffron-100">
                      {song.title}
                    </span>
                    <span className="block truncate text-xs text-night-400">
                      Song {song.order}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/songbook" className="btn-primary">
            Enter the Songbook
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </Link>
          <a
            href={OFFICIAL_CHANNELS.soundcloud}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-6 py-3 font-medium text-night-100 transition-colors hover:border-saffron-400/40 hover:text-saffron-200"
          >
            His official channels
          </a>
        </div>
      </div>
    </Reveal>
  )
}
