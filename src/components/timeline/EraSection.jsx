import Reveal from '../Reveal.jsx'
import EventCard from './EventCard.jsx'
import { eraYears } from '../../data/timeline.js'

/**
 * One chapter of the life: a hero card with the chapter numeral and theme,
 * an optional feature panel (stats, listening), then the events on a rail.
 */
export default function EraSection({ era, isLast, children, afterEvents }) {
  const years = eraYears(era)

  return (
    <section id={era.slug} className="scroll-mt-32 pt-14 lg:scroll-mt-24" aria-labelledby={`${era.slug}-title`}>
      <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-night-900/80 via-night-950/60 to-night-950 shadow-2xl shadow-night-950/50">
        {/* Glow + watermark numeral */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-saffron-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-lotus-600/10 blur-3xl" />
        </div>
        <span
          className="pointer-events-none absolute -top-6 right-6 select-none font-serif text-[8rem] font-semibold leading-none text-white/[0.06] sm:-top-10 sm:right-10 sm:text-[12rem]"
          aria-hidden="true"
        >
          {era.numeral}
        </span>

        <div
          className={`relative grid gap-8 p-7 sm:p-10 ${
            era.image ? 'md:grid-cols-[1.25fr_1fr] md:items-end' : ''
          }`}
        >
          <div>
            <p className="section-eyebrow">
              Chapter {era.numeral} · {years}
            </p>
            <h2
              id={`${era.slug}-title`}
              className="mt-3 font-serif text-4xl font-semibold leading-[1.08] text-white sm:text-5xl"
            >
              {era.title}
            </h2>
            <p className="mt-2 font-serif text-xl italic text-gold-400">{era.subtitle}</p>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-night-200">{era.theme}</p>
          </div>

          {era.image && (
            <figure className="overflow-hidden rounded-2xl ring-1 ring-white/15 md:max-w-xs md:justify-self-end">
              <img
                src={era.image.src}
                alt={era.image.alt}
                loading="lazy"
                className="h-56 w-full object-cover object-top"
              />
              {era.image.caption && (
                <figcaption className="bg-white/[0.04] px-4 py-2.5 text-xs text-night-300">
                  {era.image.caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </Reveal>

      {children}

      {/* Events */}
      <ol className={`relative mt-10 ${isLast ? 'pb-4' : ''}`}>
        <div
          className="absolute bottom-3 left-[6px] top-3 w-px bg-gradient-to-b from-saffron-400/40 via-white/10 to-transparent md:left-[10.5rem]"
          aria-hidden="true"
        />
        {era.events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </ol>

      {afterEvents}
    </section>
  )
}
