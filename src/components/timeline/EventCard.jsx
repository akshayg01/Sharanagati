import { Link } from 'react-router-dom'
import Reveal from '../Reveal.jsx'
import { formatEventDate } from '../../data/timeline.js'

/** One moment in the life: a dot on the rail, a date column, and a glass card. */
export default function EventCard({ event, index }) {
  // Some moments span years and no source fixes them to one; those carry their own
  // label ("Through two decades") instead of asserting a date the record lacks.
  const dated = !event.dateLabel
  const dateLabel = event.dateLabel || formatEventDate(event.date, event.precision)

  return (
    <Reveal
      as="li"
      id={event.id}
      delay={Math.min(index * 60, 180)}
      className="relative scroll-mt-40 pb-10 pl-8 md:grid md:grid-cols-[9rem_1fr] md:gap-8 md:pl-0 lg:scroll-mt-32"
    >
      {/* Marker on the rail */}
      <span
        className="absolute left-0 top-[0.55rem] h-3.5 w-3.5 rounded-full border-2 border-saffron-400 bg-night-950 shadow-[0_0_0_4px_rgba(255,125,11,0.10)] md:left-[10.05rem]"
        aria-hidden="true"
      />

      {/* Date column */}
      <div className="md:pr-8 md:text-right">
        {dated ? (
          <time
            dateTime={event.date}
            className="block font-serif text-[0.95rem] font-semibold tracking-wide text-saffron-300"
          >
            {dateLabel}
          </time>
        ) : (
          <span className="block font-serif text-[0.95rem] font-semibold tracking-wide text-saffron-300/90">
            {dateLabel}
          </span>
        )}
        {event.location && (
          <span className="mt-1 block text-xs leading-snug text-night-400">{event.location}</span>
        )}
      </div>

      {/* Card */}
      <article className="glass glass-hover mt-3 rounded-2xl p-6 md:ml-8 md:mt-0">
        <div className={`grid gap-6 ${event.image ? 'lg:grid-cols-[1fr_15rem] lg:items-start' : ''}`}>
          <div className="min-w-0">
            <h3 className="font-serif text-2xl leading-tight text-white">
              <Link to={`/timeline/${event.id}`} className="transition-colors hover:text-saffron-200">
                {event.title}
              </Link>
            </h3>

            <p className="mt-3 text-[15px] leading-relaxed text-night-200">{event.body}</p>

            {event.quote && (
              <blockquote className="relative mt-5 rounded-xl border-l-2 border-saffron-400/70 bg-white/[0.03] py-3 pl-5 pr-4">
                <p className="font-serif text-lg italic leading-snug text-saffron-50">
                  “{event.quote.text}”
                </p>
                <footer className="mt-2 text-xs leading-relaxed text-night-400">
                  {event.quote.source}
                </footer>
              </blockquote>
            )}

            {event.source && (
              <p className="mt-5 text-xs text-night-500">
                Source:{' '}
                {event.source.url ? (
                  <a
                    href={event.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-dotted underline-offset-2 transition-colors hover:text-saffron-300"
                  >
                    {event.source.label}
                  </a>
                ) : (
                  event.source.label
                )}
              </p>
            )}
          </div>

          {event.image && (
            <figure className="overflow-hidden rounded-xl ring-1 ring-white/10">
              <img
                src={event.image.src}
                alt={event.image.alt}
                loading="lazy"
                className="h-44 w-full object-cover object-top lg:h-40"
              />
              {event.image.caption && (
                <figcaption className="bg-white/[0.03] px-3 py-2 text-xs leading-snug text-night-400">
                  {event.image.caption}
                </figcaption>
              )}
            </figure>
          )}
        </div>
      </article>
    </Reveal>
  )
}
