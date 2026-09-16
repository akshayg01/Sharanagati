import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { eraYearsShort } from '../../data/timeline.js'

/** Mobile and tablet: a sticky strip of chapter chips that follows the reading position. */
export default function EraChips({ eras, activeSlug }) {
  const activeRef = useRef(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [activeSlug])

  return (
    <div className="sticky top-16 z-30 border-b border-white/5 bg-night-950/80 backdrop-blur-xl lg:hidden">
      <nav
        className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 py-3"
        aria-label="Jump to a chapter"
      >
        {eras.map((era) => {
          const active = era.slug === activeSlug
          return (
            <Link
              key={era.slug}
              ref={active ? activeRef : undefined}
              to={`/timeline/${era.slug}`}
              aria-current={active ? 'true' : undefined}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? 'border-saffron-400/50 bg-saffron-500/15 text-saffron-200'
                  : 'border-white/10 text-night-300 hover:border-saffron-400/30 hover:text-saffron-200'
              }`}
            >
              <span className="font-serif text-sm opacity-70">{era.numeral}</span>
              {eraYearsShort(era)}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
