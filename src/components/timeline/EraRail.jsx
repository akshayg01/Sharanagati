import { Link } from 'react-router-dom'
import { eraYearsShort } from '../../data/timeline.js'

/** Sticky desktop rail: a line that fills as you scroll, and one marker per chapter. */
export default function EraRail({ eras, activeSlug, progress }) {
  return (
    <aside className="hidden lg:block" aria-label="Chapters">
      <div className="sticky top-28 pt-16">
        <p className="mb-5 pl-6 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-night-500">
          The Chapters
        </p>
        <div className="relative pl-6">
          <div className="absolute bottom-1 left-[6px] top-1 w-px bg-white/10" aria-hidden="true" />
          <div
            className="absolute left-[6px] top-1 w-px origin-top bg-gradient-to-b from-saffron-300 to-lotus-500 transition-transform duration-150 ease-out"
            style={{ bottom: '0.25rem', transform: `scaleY(${progress})` }}
            aria-hidden="true"
          />

          <ol className="space-y-5">
            {eras.map((era) => {
              const active = era.slug === activeSlug
              return (
                <li key={era.slug} className="relative">
                  <span
                    className={`absolute -left-6 top-[0.45rem] h-3 w-3 rounded-full border-2 transition-all duration-300 ${
                      active
                        ? 'border-saffron-300 bg-saffron-400 shadow-[0_0_0_4px_rgba(255,125,11,0.15)]'
                        : 'border-white/20 bg-night-950'
                    }`}
                    aria-hidden="true"
                  />
                  <Link
                    to={`/timeline/${era.slug}`}
                    className="block leading-tight transition-colors"
                    aria-current={active ? 'true' : undefined}
                  >
                    <span
                      className={`block text-[0.65rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                        active ? 'text-saffron-300' : 'text-night-500'
                      }`}
                    >
                      {eraYearsShort(era)}
                    </span>
                    <span
                      className={`mt-0.5 block font-serif text-lg transition-colors ${
                        active ? 'text-white' : 'text-night-400 hover:text-night-100'
                      }`}
                    >
                      {era.title}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </aside>
  )
}
