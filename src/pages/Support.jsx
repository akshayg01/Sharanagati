import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Divider, LotusMark } from '../components/Om.jsx'
import Reveal from '../components/Reveal.jsx'
import roadmap from '../data/roadmap.json'
import { OFFICIAL_CHANNELS } from '../data/audio.js'

const STATUS = {
  done: { label: 'Done', pill: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300', dot: 'bg-emerald-400' },
  in_progress: { label: 'In progress', pill: 'border-saffron-400/30 bg-saffron-400/10 text-saffron-300', dot: 'bg-saffron-400' },
  planned: { label: 'Planned', pill: 'border-night-300/20 bg-white/5 text-night-300', dot: 'bg-night-300' },
  idea: { label: 'Idea', pill: 'border-white/10 bg-white/[0.03] text-night-400', dot: 'bg-night-500' },
}

const HELP_WAYS = [
  {
    title: 'A recording we are missing',
    body: 'Forty-one of the fifty songs still have no recording here. If you know where Maharaja sang one of them, that is the most valuable thing you can send.',
  },
  {
    title: 'A correction',
    body: 'The timeline and the translations are compiled from public sources. If you served alongside Maharaja and something here is wrong, please tell us — it will be fixed.',
  },
  {
    title: 'A remembrance',
    body: 'A memory of hearing him sing, or of his association. Offerings from devotees are welcome and may be added to the glorification.',
  },
  {
    title: 'Simply share it',
    body: 'Send the songbook to a devotee who has not heard these recordings. That is the whole purpose of the site.',
  },
]

export default function Support() {
  const { email } = roadmap.contact
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  // No database and no server: the form hands the note to the writer's own mail client.
  const mailto = `mailto:${email}?subject=${encodeURIComponent(
    subject ? `Śaraṇāgati — ${subject}` : 'Śaraṇāgati — feedback',
  )}&body=${encodeURIComponent(message)}`

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <header className="text-center">
        <div className="mb-6 flex justify-center animate-float">
          <LotusMark className="h-12 w-12" />
        </div>
        <p className="section-eyebrow">Built as an offering</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">
          Support this <span className="gold-text">seva</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-night-300">
          This website is a small offering at the lotus feet of His Holiness Bhakti Charu Swami
          Maharaja. It is built and maintained by one devotee, in whatever hours there are. Here
          is what exists, what is being worked on, and how you can help it grow.
        </p>
        <Divider className="mt-6" />
      </header>

      {/* Why this seva */}
      <section className="mt-10">
        <Reveal className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-10">
          <span className="pointer-events-none absolute -left-2 -top-6 select-none font-serif text-[7rem] leading-none text-saffron-400/15">
            “
          </span>
          <p className="section-eyebrow">Why this seva</p>
          <p className="relative mx-auto mt-4 max-w-2xl font-serif text-xl italic leading-relaxed text-saffron-50 sm:text-2xl">
            Even now, while building this humble website, simply hearing Maharaja’s voice in
            these recordings gives me goosebumps. If his songs stir your heart the way they
            stir mine — then this offering is for you.
          </p>
          <div className="mt-5 flex justify-center">
            <LotusMark className="h-7 w-7 opacity-80" />
          </div>
          <p className="mt-3 text-sm text-night-400">
            Offered in loving service at the lotus feet of Śrī Guru and the Vaiṣṇavas.
          </p>
        </Reveal>
      </section>

      {/* Ways to help */}
      <section className="mt-12">
        <div className="text-center">
          <p className="section-eyebrow">Four kinds of help</p>
          <h2 className="mt-2 font-serif text-3xl text-white">How you can help</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {HELP_WAYS.map((way, i) => (
            <Reveal key={way.title} delay={i * 70} className="glass rounded-2xl p-6">
              <h3 className="font-serif text-lg text-saffron-100">{way.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-night-300">{way.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Write in */}
      <section id="feedback" className="mt-14 scroll-mt-24">
        <Reveal className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-lotus-600/10 blur-3xl" />

          <div className="relative">
            <p className="section-eyebrow">Your turn</p>
            <h2 className="mt-2 font-serif text-2xl text-white sm:text-3xl">Write in</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-night-300">
              Corrections, recordings, remembrances, or a feature you wish this site had — write
              a line below and it will open in your own mail app, addressed to{' '}
              <a
                href={`mailto:${email}`}
                className="text-saffron-300 underline decoration-dotted underline-offset-2 hover:text-saffron-200"
              >
                {email}
              </a>
              . Nothing is stored on this website; there is no database and no tracking.
            </p>

            <div className="mt-6 grid gap-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-night-400">
                  About
                </span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="a missing recording, a correction, an idea…"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-night-100 placeholder:text-night-500 focus:border-saffron-400/50 focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-night-400">
                  Your note
                </span>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hare Kṛṣṇa…"
                  className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] leading-relaxed text-night-100 placeholder:text-night-500 focus:border-saffron-400/50 focus:outline-none"
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <a href={mailto} className="btn-primary">
                  Open in my mail app
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </a>
                <span className="text-xs text-night-500">
                  Prefer to write directly? {email}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Roadmap */}
      <section className="mt-16">
        <div className="text-center">
          <p className="section-eyebrow">Built in the open</p>
          <h2 className="mt-2 font-serif text-3xl text-white">What is built, and what is next</h2>
          <Divider className="mt-6" />
        </div>

        <ol className="mt-10 space-y-5">
          {roadmap.phases.map((phase) => {
            const status = STATUS[phase.status] || STATUS.idea
            return (
              <Reveal as="li" key={phase.slug} className="glass rounded-3xl p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="section-eyebrow">Stage {phase.number}</p>
                    <h3 className="mt-1.5 font-serif text-2xl text-white">{phase.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-night-300">
                      {phase.summary}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider ${status.pill}`}
                  >
                    {status.label}
                  </span>
                </div>

                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {phase.items.map((item) => {
                    const itemStatus = STATUS[item.status] || STATUS.idea
                    return (
                      <li
                        key={item.title}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <span
                          className={`mt-1.5 h-2 w-2 flex-none rounded-full ${itemStatus.dot}`}
                          aria-hidden="true"
                        />
                        <div className="min-w-0">
                          <p className="text-[15px] font-medium text-night-100">
                            {item.title}
                            <span className="ml-2 text-[0.7rem] font-normal uppercase tracking-wider text-night-500">
                              {itemStatus.label}
                            </span>
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-night-400">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </Reveal>
            )
          })}
        </ol>
      </section>

      {/* Where his recordings live */}
      <section className="mt-14 text-center">
        <Divider className="mb-8" />
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-night-400">
          Maharaja’s recordings belong to his official channels, and this site links to them
          rather than replacing them. Please support those homes directly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={OFFICIAL_CHANNELS.soundcloud} target="_blank" rel="noreferrer" className="btn-primary">
            SoundCloud
          </a>
          <a
            href={OFFICIAL_CHANNELS.appleMusic}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-6 py-3 font-medium text-night-100 transition-colors hover:border-saffron-400/40 hover:text-saffron-200"
          >
            Apple Music
          </a>
          <Link
            to="/timeline"
            className="rounded-full border border-white/15 px-6 py-3 font-medium text-night-100 transition-colors hover:border-saffron-400/40 hover:text-saffron-200"
          >
            His life
          </Link>
        </div>
      </section>
    </div>
  )
}
