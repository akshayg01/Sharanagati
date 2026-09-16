import { useState } from 'react'
import { useAuth } from '../../context/Auth.jsx'
import { BODY_MAX, BODY_MIN, submitGlorification } from '../../lib/glorifications.js'
import qualitiesData from '../../data/qualities.json'

const qualities = qualitiesData.qualities

/**
 * A devotee offers a glorification. No account is needed; signing in only fills the name
 * in and lets the devotee see the offering while it awaits review.
 *
 * Given a `quality`, the offering is filed under it (the inline form on the Qualities
 * page). Given none, the devotee chooses one (the Your Offering page).
 */
export default function GlorificationForm({ quality = null, defaultSlug = '', onDone }) {
  const { user, displayName } = useAuth()
  const [slug, setSlug] = useState(quality?.slug || defaultSlug || '')
  const [name, setName] = useState(displayName || '')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [state, setState] = useState({ status: 'idle', message: '' })

  const picking = !quality
  const chosen = quality || qualities.find((q) => q.slug === slug) || null

  const tooShort = body.trim().length > 0 && body.trim().length < BODY_MIN
  const tooLong = body.trim().length > BODY_MAX
  const canSend = Boolean(slug) && body.trim().length >= BODY_MIN && !tooLong && state.status !== 'sending'

  const send = async (e) => {
    e.preventDefault()
    if (!canSend) return
    setState({ status: 'sending', message: '' })

    const result = await submitGlorification({
      qualitySlug: slug,
      authorName: name,
      body,
      contactEmail: email,
      userId: user?.id,
    })

    if (result.ok) {
      setState({ status: 'sent', message: '' })
      setBody('')
      onDone?.()
    } else {
      setState({ status: 'error', message: result.message })
    }
  }

  if (state.status === 'sent') {
    return (
      <div className="mt-5 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-6 text-center">
        <p className="font-serif text-xl text-emerald-200">Your offering has been received.</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-night-300">
          It will appear under{' '}
          {chosen ? <span className="text-night-100">{chosen.name}</span> : 'its quality'} once it
          has been read and published. Thank you for glorifying Maharaja.
        </p>
        <button
          type="button"
          onClick={() => setState({ status: 'idle', message: '' })}
          className="mt-4 text-sm font-medium text-saffron-300 hover:text-saffron-200"
        >
          Offer another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={send} className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      {quality ? (
        <>
          <p className="section-eyebrow">Your offering</p>
          <h4 className="mt-1.5 font-serif text-xl text-white">
            Glorify Maharaja’s {quality.name.toLowerCase()}
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-night-400">
            A remembrance, an incident you witnessed, or a realisation. Offerings are read
            before they appear on the page.
          </p>
        </>
      ) : (
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-night-400">
            Which quality does it glorify?
          </span>
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="w-full rounded-xl border border-white/10 bg-night-900 px-4 py-3 text-[15px] text-night-100 focus:border-saffron-400/50 focus:outline-none"
          >
            <option value="">Choose a quality…</option>
            {qualities.map((q) => (
              <option key={q.slug} value={q.slug}>
                {q.name}
              </option>
            ))}
          </select>
          {chosen && (
            <span className="mt-1.5 block text-xs italic text-night-500">{chosen.tagline}</span>
          )}
        </label>
      )}

      <label className={`block ${picking ? 'mt-4' : 'mt-5'}`}>
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-night-400">
          Your offering
        </span>
        <textarea
          rows={picking ? 7 : 5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          placeholder="Hare Kṛṣṇa. I remember…"
          className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] leading-relaxed text-night-100 placeholder:text-night-500 focus:border-saffron-400/50 focus:outline-none"
        />
        <span className={`mt-1.5 block text-xs ${tooLong ? 'text-lotus-300' : 'text-night-500'}`}>
          {body.trim().length} / {BODY_MAX}
          {tooShort && ` · at least ${BODY_MIN} characters`}
        </span>
      </label>

      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-night-400">
            Your name <span className="font-normal normal-case tracking-normal">(optional)</span>
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="shown with your offering"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[15px] text-night-100 placeholder:text-night-500 focus:border-saffron-400/50 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-night-400">
            Email <span className="font-normal normal-case tracking-normal">(optional, never shown)</span>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="only if you would like a reply"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[15px] text-night-100 placeholder:text-night-500 focus:border-saffron-400/50 focus:outline-none"
          />
        </label>
      </div>

      {state.status === 'error' && (
        <p className="mt-4 rounded-xl border border-lotus-400/25 bg-lotus-500/10 px-4 py-3 text-sm text-lotus-200">
          {state.message}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={!canSend} className="btn-primary disabled:opacity-40">
          {state.status === 'sending' ? 'Offering…' : 'Offer this glorification'}
        </button>
        <span className="text-xs text-night-500">
          No account needed. Your email is never shown publicly.
        </span>
      </div>
    </form>
  )
}
