import { useState } from 'react'
import Reveal from '../Reveal.jsx'
import { LotusMark } from '../Om.jsx'
import GlorificationForm from './GlorificationForm.jsx'
import { useAuth } from '../../context/Auth.jsx'

/** One quality: what it is, the incidents that show it, and what devotees have offered. */
export default function QualityCard({
  quality,
  index,
  offerings,
  likeCount,
  liked,
  onToggleLike,
  onOffered,
}) {
  const { status, signIn } = useAuth()
  const [formOpen, setFormOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const shown = showAll ? offerings : offerings.slice(0, 2)

  return (
    <Reveal
      as="section"
      id={quality.slug}
      className="scroll-mt-32 pt-12 lg:scroll-mt-24"
      aria-labelledby={`${quality.slug}-title`}
    >
      <div className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-saffron-500/10 blur-3xl" />
        <span
          className="pointer-events-none absolute -top-6 right-6 select-none font-serif text-[7rem] font-semibold leading-none text-white/[0.05] sm:text-[9rem]"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative">
          {/* Heading */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              {quality.sanskrit && (
                <p className="font-deva text-lg text-saffron-300/70">{quality.sanskrit}</p>
              )}
              <h2
                id={`${quality.slug}-title`}
                className="mt-1 font-serif text-3xl leading-tight text-white sm:text-4xl"
              >
                {quality.name}
              </h2>
              {quality.tagline && (
                <p className="mt-2 font-serif text-lg italic text-gold-400">{quality.tagline}</p>
              )}
            </div>

            <LikeButton
              count={likeCount}
              liked={liked}
              canLike={status === 'signed-in'}
              onClick={() => (status === 'signed-in' ? onToggleLike() : signIn())}
              signedOut={status === 'signed-out'}
            />
          </div>

          {/* What the quality is */}
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-night-200">
            {quality.description.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>

          {/* The incidents that show it */}
          {quality.incidents?.length > 0 && (
            <div className="mt-7">
              <p className="section-eyebrow">As it was seen</p>
              <ul className="mt-4 space-y-4">
                {quality.incidents.map((incident) => (
                  <li
                    key={incident.text.slice(0, 40)}
                    className="rounded-2xl border-l-2 border-saffron-400/60 bg-white/[0.03] py-4 pl-5 pr-4"
                  >
                    <p className="text-[15px] leading-relaxed text-night-100">{incident.text}</p>
                    <p className="mt-2 text-xs text-night-500">
                      {incident.url ? (
                        <a
                          href={incident.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-dotted underline-offset-2 hover:text-saffron-300"
                        >
                          {incident.source}
                        </a>
                      ) : (
                        incident.source
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* A verse */}
          {quality.verse && (
            <blockquote className="mt-7 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent p-5 text-center">
              <LotusMark className="mx-auto h-5 w-5 opacity-70" />
              <p className="mt-3 font-serif text-lg italic leading-relaxed text-saffron-50">
                “{quality.verse.text}”
              </p>
              <footer className="mt-2 text-xs text-night-400">
                {quality.verse.url ? (
                  <a
                    href={quality.verse.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-dotted underline-offset-2 hover:text-saffron-300"
                  >
                    {quality.verse.source}
                  </a>
                ) : (
                  quality.verse.source
                )}
              </footer>
            </blockquote>
          )}

          {/* What devotees have offered */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="section-eyebrow">
                {offerings.length > 0
                  ? `${offerings.length} ${offerings.length === 1 ? 'offering' : 'offerings'} from devotees`
                  : 'Offerings from devotees'}
              </p>
              <button
                type="button"
                onClick={() => setFormOpen((v) => !v)}
                className="text-sm font-medium text-saffron-300 transition-colors hover:text-saffron-200"
              >
                {formOpen ? 'Close' : 'Offer your glorification'}
              </button>
            </div>

            {offerings.length > 0 ? (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {shown.map((offering) => (
                  <li key={offering.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm leading-relaxed text-night-200">{offering.body}</p>
                    <p className="mt-3 text-xs text-night-500">
                      — {offering.author_name || 'a devotee'}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-night-400">
                None yet. If you remember something of Maharaja that shows this quality, yours
                would be the first.
              </p>
            )}

            {offerings.length > 2 && (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="mt-4 text-sm text-night-400 transition-colors hover:text-saffron-300"
              >
                {showAll ? 'Show fewer' : `Read all ${offerings.length}`}
              </button>
            )}

            {formOpen && <GlorificationForm quality={quality} onDone={onOffered} />}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function LikeButton({ count, liked, canLike, onClick, signedOut }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={canLike ? (liked ? 'Remove your offering of appreciation' : 'Appreciate this quality') : 'Sign in to appreciate this quality'}
      className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
        liked
          ? 'border-lotus-400/50 bg-lotus-500/15 text-lotus-200'
          : 'border-white/10 text-night-300 hover:border-saffron-400/40 hover:text-saffron-200'
      }`}
      aria-pressed={liked}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.25S3.75 15 3.75 9.375a4.125 4.125 0 0 1 7.5-2.37l.75 1.02.75-1.02a4.125 4.125 0 0 1 7.5 2.37C20.25 15 12 20.25 12 20.25z"
        />
      </svg>
      <span className="tabular-nums">{count || 0}</span>
      <span className="sr-only">
        {signedOut ? 'Sign in to appreciate this quality' : 'appreciations'}
      </span>
    </button>
  )
}
