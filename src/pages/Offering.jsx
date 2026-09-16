import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Divider, LotusMark } from '../components/Om.jsx'
import Reveal from '../components/Reveal.jsx'
import GlorificationForm from '../components/qualities/GlorificationForm.jsx'
import { useAuth } from '../context/Auth.jsx'
import { hasBackend } from '../lib/supabase.js'
import { loadMyGlorifications } from '../lib/glorifications.js'
import qualitiesData from '../data/qualities.json'

const qualities = qualitiesData.qualities

const STATUS_LABEL = {
  new: { label: 'Awaiting review', className: 'border-saffron-400/30 bg-saffron-400/10 text-saffron-300' },
  published: { label: 'Published', className: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' },
  declined: { label: 'Not published', className: 'border-white/10 bg-white/[0.03] text-night-400' },
}

export default function Offering() {
  // /offering/:slug arrives from a quality, with that quality already chosen.
  const { slug } = useParams()
  const { status, user, displayName, connect, signIn, signOut } = useAuth()
  const [mine, setMine] = useState([])

  useEffect(() => {
    connect()
  }, [connect])

  const refreshMine = useCallback(() => {
    if (!user?.id) {
      setMine([])
      return
    }
    loadMyGlorifications(user.id).then(setMine)
  }, [user?.id])

  useEffect(() => {
    refreshMine()
  }, [refreshMine])

  const preselected = qualities.some((q) => q.slug === slug) ? slug : ''

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <header className="text-center">
        <div className="mb-6 flex justify-center animate-float">
          <LotusMark className="h-14 w-14" />
        </div>
        <p className="section-eyebrow">Guṇānuvarṇanam</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">
          Your <span className="gold-text">offering</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-night-300">
          A Vaiṣṇava is glorified by describing his qualities. If you met Maharaja, heard him
          sing, received his shelter, or remember something of him that others should know —
          please write it here. It will be added to his glorification.
        </p>
        <Divider className="mt-6" />
      </header>

      {!hasBackend ? (
        <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm leading-relaxed text-night-300">
          Offerings cannot be received right now. Please try again later, or write to us from
          the{' '}
          <Link to="/support" className="text-saffron-300 underline decoration-dotted underline-offset-2">
            Support
          </Link>{' '}
          page.
        </p>
      ) : (
        <>
          {/* What happens to it */}
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                n: '01',
                title: 'You write it',
                body: 'No account is needed. Your name is shown only if you give one; your email is never shown at all.',
              },
              {
                n: '02',
                title: 'It is read',
                body: 'Every offering is read before it appears, so that what is published about Maharaja stays true.',
              },
              {
                n: '03',
                title: 'It is published',
                body: 'Once published it appears under its quality on the Qualities page, for everyone who comes after.',
              },
            ].map((step) => (
              <div key={step.n} className="glass rounded-2xl p-5">
                <p className="font-serif text-3xl text-white/15">{step.n}</p>
                <h3 className="mt-2 font-serif text-lg text-saffron-100">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-night-400">{step.body}</p>
              </div>
            ))}
          </Reveal>

          {/* The form */}
          <section className="mt-10">
            <Reveal className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-saffron-500/10 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-serif text-2xl text-white">Write your glorification</h2>
                  {status === 'signed-in' ? (
                    <span className="text-xs text-night-400">
                      Signed in{displayName ? ` as ${displayName}` : ''} ·{' '}
                      <button type="button" onClick={signOut} className="hover:text-saffron-300">
                        sign out
                      </button>
                    </span>
                  ) : (
                    status === 'signed-out' && (
                      <button
                        type="button"
                        onClick={signIn}
                        className="text-xs text-night-400 transition-colors hover:text-saffron-300"
                      >
                        Sign in to keep track of your offerings
                      </button>
                    )
                  )}
                </div>

                <GlorificationForm defaultSlug={preselected} onDone={refreshMine} />
              </div>
            </Reveal>
          </section>

          {/* What this devotee has already offered */}
          {status === 'signed-in' && mine.length > 0 && (
            <section className="mt-12">
              <p className="section-eyebrow">Your offerings so far</p>
              <ul className="mt-4 space-y-3">
                {mine.map((entry) => {
                  const quality = qualities.find((q) => q.slug === entry.quality_slug)
                  const badge = STATUS_LABEL[entry.status] || STATUS_LABEL.new
                  return (
                    <li key={entry.id} className="glass rounded-2xl p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <p className="font-serif text-lg text-saffron-100">
                          {quality ? quality.name : entry.quality_slug}
                        </p>
                        <span
                          className={`shrink-0 rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-night-300">{entry.body}</p>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
        </>
      )}

      <section className="mt-14 text-center">
        <Divider className="mb-8" />
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-night-400">
          Not sure which quality yours belongs to? Read what other devotees have remembered
          first.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/qualities" className="btn-primary">
            The qualities of Maharaja
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </Link>
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
