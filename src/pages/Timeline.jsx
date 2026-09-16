import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EraChips from '../components/timeline/EraChips.jsx'
import EraRail from '../components/timeline/EraRail.jsx'
import EraSection from '../components/timeline/EraSection.jsx'
import LegacyStats from '../components/timeline/LegacyStats.jsx'
import ListenPanel from '../components/timeline/ListenPanel.jsx'
import { Divider, LotusMark } from '../components/Om.jsx'
import Reveal from '../components/Reveal.jsx'
import { OFFICIAL_CHANNELS } from '../data/audio.js'
import {
  eraOf,
  eras,
  isKnownAnchor,
  sourceList,
  subject,
  TOTAL_EVENTS,
  YEAR_RANGE,
} from '../data/timeline.js'

export default function Timeline() {
  // /timeline/:anchor — the anchor may be a chapter slug or a single event id.
  const { anchor } = useParams()
  const containerRef = useRef(null)
  const [activeSlug, setActiveSlug] = useState(eras[0].slug)
  const [progress, setProgress] = useState(0)
  const landed = useRef(false)

  // Deep links scroll to the chapter or moment they name. Arriving on the page
  // jumps straight there; moving between chapters afterwards glides.
  useEffect(() => {
    const first = !landed.current
    landed.current = true
    if (!isKnownAnchor(anchor)) return
    setActiveSlug(eraOf(anchor))
    const frame = requestAnimationFrame(() => {
      document
        .getElementById(anchor)
        // 'instant' beats the `scroll-behavior: smooth` set on <html> in index.css.
        ?.scrollIntoView({ block: 'start', behavior: first ? 'instant' : 'smooth' })
    })
    return () => cancelAnimationFrame(frame)
  }, [anchor])

  // Which chapter is being read, for the rail and the chips.
  useEffect(() => {
    const sections = eras
      .map((era) => document.getElementById(era.slug))
      .filter(Boolean)
    if (typeof IntersectionObserver === 'undefined' || sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSlug(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // The filling line on the desktop rail.
  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const travelled = window.innerHeight * 0.5 - rect.top
      const ratio = rect.height > 0 ? travelled / rect.height : 0
      setProgress(Math.min(1, Math.max(0, ratio)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div>
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-saffron-500/15 blur-3xl" />
          <div className="absolute right-8 top-32 h-56 w-56 rounded-full bg-lotus-600/15 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-5xl gap-10 px-5 pb-12 pt-16 sm:pt-20 md:grid-cols-[1fr_auto] md:items-center">
          <div className="text-center md:text-left">
            <p className="section-eyebrow animate-fade-in-up">{YEAR_RANGE}</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight animate-fade-in-up sm:text-6xl">
              <span className="block text-night-100">The life of</span>
              <span className="gold-text">{subject.name}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-night-200 animate-fade-in-up md:mx-0">
              {subject.lede}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-6 text-sm text-night-400 animate-fade-in-up md:justify-start">
              <span>
                <span className="font-serif text-2xl text-saffron-200">{eras.length}</span> chapters
              </span>
              <span className="h-4 w-px bg-white/10" />
              <span>
                <span className="font-serif text-2xl text-saffron-200">{TOTAL_EVENTS}</span> moments
              </span>
              <span className="h-4 w-px bg-white/10" />
              <span>
                <span className="font-serif text-2xl text-saffron-200">43</span> years of service
              </span>
            </div>
          </div>

          <div className="relative mx-auto animate-fade-in-up md:mx-0">
            <div className="absolute -inset-5 rounded-full bg-gradient-to-b from-saffron-500/25 to-lotus-600/20 blur-2xl" />
            <img
              src={subject.portrait}
              alt={`${subject.honorific} ${subject.name} ${subject.suffix}`}
              className="relative h-64 w-52 rounded-2xl object-cover object-top shadow-2xl ring-1 ring-white/15 sm:h-72 sm:w-60"
            />
            <div className="mt-5 flex justify-center animate-float">
              <LotusMark className="h-8 w-8" />
            </div>
          </div>
        </div>

        <Divider className="pb-2" />
      </header>

      {/* Glorification — who he was, before the chapters of what he did */}
      <section className="mx-auto max-w-3xl px-5 pb-12 pt-4">
        <Reveal className="space-y-5 text-[15px] leading-relaxed text-night-200">
          <p>
            His Holiness Bhakti Charu Swami Maharaja was a beloved spiritual master and a
            senior disciple of Śrīla Prabhupāda, the Founder-Ācārya of the International
            Society for Krishna Consciousness. Surrendering his life to the mission of his
            guru, he became renowned worldwide for his deep humility, his sweet devotion, and
            the extraordinary beauty of his kīrtana and bhajana.
          </p>
          <p>
            He established and nurtured temples and communities across the world, fed
            schoolchildren by the tens of thousands, and remained a shelter and an inspiration
            to countless devotees. Through all of it he held one thing at the centre: that
            whatever he had, he had received from Śrīla Prabhupāda.
          </p>
          <p>
            His renditions of the songs of the great Vaiṣṇava ācāryas — and especially the{' '}
            <em>Śaraṇāgati</em> of Śrīla Bhaktivinoda Ṭhākura — carry a rare sweetness that
            melts the heart and draws the soul toward surrender. This website is a humble
            offering of service at his lotus feet, gathering those songs so that his
            glorification may continue.
          </p>
          <p className="pt-2 text-center font-serif text-lg italic text-saffron-100">
            nama oṁ viṣṇu-pādāya … We offer our humble obeisances unto His Holiness Bhakti
            Charu Swami Maharaja.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/qualities" className="btn-primary">
            His qualities — and add yours
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
            Listen on SoundCloud
          </a>
        </div>

        <p className="mt-10 text-center text-xs font-semibold uppercase tracking-[0.25em] text-saffron-300/70">
          His life, in six chapters
        </p>
      </section>

      <EraChips eras={eras} activeSlug={activeSlug} />

      <div
        ref={containerRef}
        className="mx-auto max-w-6xl px-5 lg:grid lg:grid-cols-[13rem_1fr] lg:gap-12"
      >
        <EraRail eras={eras} activeSlug={activeSlug} progress={progress} />

        <div className="min-w-0">
          {eras.map((era, i) => (
            <EraSection
              key={era.slug}
              era={era}
              isLast={i === eras.length - 1}
              // The songs he left behind belong after the departure, not before it.
              afterEvents={era.feature === 'listen' ? <ListenPanel /> : null}
            >
              {era.feature === 'stats' && <LegacyStats />}
            </EraSection>
          ))}
        </div>
      </div>

      {/* Closing */}
      <section className="mx-auto max-w-3xl px-5 pb-6 pt-10 text-center">
        <Divider className="mb-8" />
        <Reveal>
          <p className="font-serif text-xl italic leading-relaxed text-saffron-50 sm:text-2xl">
            “He reasons ill who tells that Vaiṣṇavas die, when thou art living still in sound.”
          </p>
          <p className="mt-3 text-sm text-night-400">
            — Śrīla Bhaktivinoda Ṭhākura, <em>He Reasons Ill Who Tells That Vaiṣṇavas Die</em>
          </p>
          <p className="mt-6 text-sm text-night-400">
            Offered in loving service at the lotus feet of {subject.honorific} {subject.name}{' '}
            {subject.suffix}.
          </p>
        </Reveal>

        <p className="mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-night-500">
          This chronology is compiled from publicly available biographies —{' '}
          {Object.values(sourceList).map((source, i, all) => (
            <span key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:text-saffron-300"
              >
                {source.label}
              </a>
              {i < all.length - 1 ? ', ' : ''}
            </span>
          ))}
          . Dates marked “c.” are approximate. Corrections from devotees who served alongside
          Maharaja are most welcome.
        </p>
      </section>
    </div>
  )
}
