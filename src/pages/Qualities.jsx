import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Divider, LotusMark } from '../components/Om.jsx'
import QualityCard from '../components/qualities/QualityCard.jsx'
import { useAuth } from '../context/Auth.jsx'
import { hasBackend } from '../lib/supabase.js'
import {
  loadGlorifications,
  loadLikeCounts,
  loadMyLikes,
  toggleLike,
} from '../lib/glorifications.js'
import qualitiesData from '../data/qualities.json'

const qualities = qualitiesData.qualities

export default function Qualities() {
  const { slug } = useParams()
  const { status, user, displayName, connect, signIn, signOut } = useAuth()

  // This is the one page that offers sign-in, so it is the page that loads the SDK.
  useEffect(() => {
    connect()
  }, [connect])

  const [offerings, setOfferings] = useState([])
  const [likeCounts, setLikeCounts] = useState({})
  const [myLikes, setMyLikes] = useState([])
  const landed = useRef(false)

  const refreshOfferings = useCallback(() => {
    loadGlorifications().then(setOfferings)
  }, [])

  useEffect(() => {
    refreshOfferings()
    loadLikeCounts().then(setLikeCounts)
  }, [refreshOfferings])

  useEffect(() => {
    if (!user?.id) {
      setMyLikes([])
      return
    }
    loadMyLikes(user.id).then(setMyLikes)
  }, [user?.id])

  // Deep link: /qualities/:slug. Arriving on the page jumps straight there;
  // moving between qualities afterwards glides.
  useEffect(() => {
    const first = !landed.current
    landed.current = true
    if (!slug || !qualities.some((q) => q.slug === slug)) return
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(slug)
        ?.scrollIntoView({ block: 'start', behavior: first ? 'instant' : 'smooth' })
    })
    return () => cancelAnimationFrame(frame)
  }, [slug])

  const onToggleLike = async (qualitySlug) => {
    const wasLiked = myLikes.includes(qualitySlug)
    // Optimistic: the heart should answer immediately.
    setMyLikes((prev) => (wasLiked ? prev.filter((s) => s !== qualitySlug) : [...prev, qualitySlug]))
    setLikeCounts((prev) => ({
      ...prev,
      [qualitySlug]: Math.max(0, (prev[qualitySlug] || 0) + (wasLiked ? -1 : 1)),
    }))

    const nowLiked = await toggleLike(user?.id, qualitySlug, wasLiked)
    if (nowLiked === wasLiked) {
      // The write failed — put it back.
      setMyLikes((prev) => (wasLiked ? [...prev, qualitySlug] : prev.filter((s) => s !== qualitySlug)))
      setLikeCounts((prev) => ({
        ...prev,
        [qualitySlug]: Math.max(0, (prev[qualitySlug] || 0) + (wasLiked ? 1 : -1)),
      }))
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <header className="text-center">
        <div className="mb-6 flex justify-center animate-float">
          <LotusMark className="h-14 w-14" />
        </div>
        <p className="section-eyebrow">Guṇānuvarṇanam</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">
          The qualities of <span className="gold-text">Maharaja</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-night-300">
          A Vaiṣṇava is glorified by describing his qualities. Here are the qualities devotees
          saw in His Holiness Bhakti Charu Swami Maharaja — each shown not by praise but by what
          he actually did. If you remember something of him, please add it.
        </p>
        <Divider className="mt-6" />
      </header>

      {/* Sign-in is optional and says so */}
      {hasBackend && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          {status === 'signed-in' ? (
            <>
              <span className="text-night-400">
                Signed in{displayName ? ` as ${displayName}` : ''}
              </span>
              <button
                type="button"
                onClick={signOut}
                className="rounded-full border border-white/10 px-4 py-1.5 text-night-300 transition-colors hover:border-saffron-400/40 hover:text-saffron-200"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <span className="text-night-400">
                You can offer a glorification without an account.
              </span>
              {status === 'signed-out' && (
                <button
                  type="button"
                  onClick={signIn}
                  className="rounded-full border border-white/10 px-4 py-1.5 text-night-300 transition-colors hover:border-saffron-400/40 hover:text-saffron-200"
                >
                  Sign in to appreciate qualities
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Jump to a quality */}
      <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Jump to a quality">
        {/* HashRouter owns the fragment, so these are routes, not in-page anchors. */}
        {qualities.map((quality) => (
          <Link
            key={quality.slug}
            to={`/qualities/${quality.slug}`}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              quality.slug === slug
                ? 'border-saffron-400/50 bg-saffron-500/15 text-saffron-200'
                : 'border-white/10 text-night-200 hover:border-saffron-400/40 hover:text-saffron-300'
            }`}
          >
            {quality.name}
          </Link>
        ))}
      </nav>

      <p className="mt-6 text-center text-sm text-night-400">
        Remember something of Maharaja?{' '}
        <Link
          to="/offering"
          className="font-medium text-saffron-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-saffron-200"
        >
          Add your offering
        </Link>
      </p>

      <div className="space-y-4">
        {qualities.map((quality, i) => (
          <QualityCard
            key={quality.slug}
            quality={quality}
            index={i}
            offerings={offerings.filter((o) => o.quality_slug === quality.slug)}
            likeCount={likeCounts[quality.slug] || 0}
            liked={myLikes.includes(quality.slug)}
            onToggleLike={() => onToggleLike(quality.slug)}
            onOffered={refreshOfferings}
          />
        ))}
      </div>

      <section className="mt-16 text-center">
        <Divider className="mb-8" />
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-night-400">
          Every incident above comes from a published remembrance, and each is linked to its
          source. Offerings from devotees are read before they are published. If you find
          anything here mistaken, please{' '}
          <Link to="/support" className="text-saffron-300 underline decoration-dotted underline-offset-2 hover:text-saffron-200">
            write in
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/offering" className="btn-primary">
            Offer your glorification
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </Link>
          <Link
            to="/timeline"
            className="rounded-full border border-white/15 px-6 py-3 font-medium text-night-100 transition-colors hover:border-saffron-400/40 hover:text-saffron-200"
          >
            His life, chapter by chapter
          </Link>
        </div>
      </section>
    </div>
  )
}
