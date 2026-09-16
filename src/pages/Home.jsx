import { Link } from 'react-router-dom'
import { Divider, LotusMark } from '../components/Om.jsx'
import AudioPlayer from '../components/AudioPlayer.jsx'
import Reveal from '../components/Reveal.jsx'
import { sectionsWithSongs, TOTAL_SONGS } from '../data/songs.js'
import { FEATURED } from '../data/audio.js'
import qualitiesData from '../data/qualities.json'

// Qualities are static content, so the home page shows them without touching the backend —
// that keeps the Supabase bundle off every page but /qualities and /offering.
const allQualities = qualitiesData.qualities
const featuredQualities = allQualities.slice(0, 6)
const totalIncidents = allQualities.reduce((n, q) => n + q.incidents.length, 0)

export default function Home() {
  // Introductory song + the six limbs of surrender (exclude the later sections).
  const intro = sectionsWithSongs.find((s) => s.slug === 'introductory')
  const limbs = sectionsWithSongs.filter((s) => s.index >= 2 && s.index <= 7)

  return (
    <div>
      {/* Hero — the songbook, and the voice that carries it */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-4 h-72 w-72 -translate-x-1/2 rounded-full bg-saffron-500/20 blur-3xl" />
          <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-lotus-600/20 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_auto] lg:gap-16">
          {/* Words */}
          <div className="text-center lg:text-left">
            <div className="mb-6 flex justify-center animate-float lg:justify-start">
              <LotusMark className="h-14 w-14" />
            </div>
            <p className="section-eyebrow animate-fade-in-up">Surrendered to the Lord’s Shelter</p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight animate-fade-in-up sm:text-7xl">
              <span className="gold-text animate-shimmer">Śaraṇāgati</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-night-200 animate-fade-in-up lg:mx-0">
              The immortal songs of surrender by Śrīla Bhaktivinoda Ṭhākura — glorified
              through the divine recordings of{' '}
              <span className="text-saffron-200">His Holiness Bhakti Charu Swami Maharaja</span>,
              whose voice has drawn countless hearts toward the shelter of Śrī Kṛṣṇa.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up lg:justify-start">
              <Link to="/songbook" className="btn-primary">
                Enter the Songbook
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" /></svg>
              </Link>
              <Link
                to="/qualities"
                className="rounded-full border border-white/15 px-6 py-3 font-medium text-night-100 transition-colors hover:border-saffron-400/40 hover:text-saffron-200"
              >
                His qualities
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-night-400 animate-fade-in-up lg:justify-start">
              <span><span className="font-serif text-2xl text-saffron-200">{TOTAL_SONGS}</span> songs</span>
              <span className="h-4 w-px bg-white/10" />
              <span><span className="font-serif text-2xl text-saffron-200">6</span> limbs of surrender</span>
              <span className="h-4 w-px bg-white/10" />
              <span><span className="font-serif text-2xl text-saffron-200">1893</span></span>
            </div>
          </div>

          {/* Maharaja */}
          <figure className="relative mx-auto w-full max-w-sm animate-fade-in-up lg:mx-0">
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-b from-saffron-500/30 via-lotus-600/20 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-2xl shadow-night-950/60">
              <img
                src="./images/maharaja-guru.jpg"
                alt="His Holiness Bhakti Charu Swami Maharaja offering prayers"
                className="h-[22rem] w-full object-cover object-top sm:h-[26rem]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-night-950 via-night-950/85 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 text-center">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-saffron-300/90">
                  His Holiness
                </p>
                <p className="mt-1.5 font-serif text-2xl leading-tight text-white">
                  Bhakti Charu Swami
                </p>
                <p className="text-sm text-night-300">Maharaja · 1945 — 2020</p>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>
      {/* The life of Maharaja */}
      <section className="mx-auto max-w-6xl px-5 pt-12 pb-4">
        <Reveal>
          <Link
            to="/timeline"
            className="glass glass-hover group relative block overflow-hidden rounded-3xl md:flex md:items-stretch"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-saffron-500/10 blur-3xl" />

            {/* A banner on phones, a panel beside the words on wider screens */}
            <div className="relative h-56 w-full overflow-hidden sm:h-64 md:h-auto md:w-60 md:flex-none lg:w-72">
              <img
                src="./images/maharaja-writing.jpg"
                alt="His Holiness Bhakti Charu Swami Maharaja at work translating"
                loading="lazy"
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/25 to-transparent md:hidden"
                aria-hidden="true"
              />
            </div>

            <div className="relative min-w-0 flex-1 p-7 sm:p-9 md:flex md:flex-col md:justify-center">
              <p className="section-eyebrow">1945 — 2020</p>
              <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                The life of <span className="gold-text">Bhakti Charu Swami</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-night-300">
                From a village in Bengal to a chemistry degree in Germany, from the Himālayas to
                the lotus feet of Śrīla Prabhupāda — six chapters of a life given wholly to
                surrender. The voice behind these songs had a story.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-saffron-300">
                Walk through the timeline
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>
      {/* His qualities */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="section-eyebrow">Guṇānuvarṇanam</p>
          <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
            The qualities of <span className="gold-text">Maharaja</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-night-400">
            A Vaiṣṇava is glorified by describing his qualities — each one shown not by praise
            but by what he actually did, with every incident traced to a published source.
          </p>
          <Divider className="mt-6" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredQualities.map((quality, i) => (
            <Reveal key={quality.slug} delay={i * 60}>
              <Link
                to={`/qualities/${quality.slug}`}
                className="glass glass-hover group flex h-full flex-col rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-serif text-3xl text-white/15 transition-colors group-hover:text-saffron-400/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {quality.sanskrit && (
                    <span className="font-deva text-lg text-saffron-300/60">{quality.sanskrit}</span>
                  )}
                </div>
                <h3 className="mt-2 font-serif text-xl leading-tight text-white group-hover:text-saffron-100">
                  {quality.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-night-400">{quality.tagline}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-night-500">
                  {quality.incidents.length}{' '}
                  {quality.incidents.length === 1 ? 'incident' : 'incidents'}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/qualities"
            className="inline-flex items-center gap-2 text-sm font-medium text-saffron-300 transition-colors hover:text-saffron-200"
          >
            All {allQualities.length} qualities, with {totalIncidents} remembered incidents
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </Link>
        </div>
      </section>

      {/* The six limbs / sections */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="section-eyebrow">The Path of Surrender</p>
          <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
            The Six Limbs of Śaraṇāgati
          </h2>
          <Divider className="mt-6" />
        </div>

        {/* Introductory — full width */}
        {intro && (
          <Link
            to={`/songbook#${intro.slug}`}
            className="glass glass-hover group mb-4 flex flex-col items-start gap-3 rounded-2xl p-6 sm:flex-row sm:items-center sm:gap-6"
          >
            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-saffron-500/10 text-saffron-300/80 transition-colors group-hover:bg-saffron-500/20">
              <LotusMark className="h-7 w-7" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="section-eyebrow">Invocation</p>
              <h3 className="mt-1 font-serif text-2xl text-white">{intro.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-night-300">{intro.blurb}</p>
            </div>
            <svg className="hidden h-5 w-5 flex-none text-night-500 transition-colors group-hover:text-saffron-300 sm:block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}

        {/* The six limbs — two per row */}
        <div className="grid gap-4 sm:grid-cols-2">
          {limbs.map((section, i) => (
            <Link
              key={section.slug}
              to={`/songbook#${section.slug}`}
              className="glass glass-hover group rounded-2xl p-6"
            >
              <div className="flex items-start justify-between">
                <span className="font-serif text-4xl text-white/15 transition-colors group-hover:text-saffron-400/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.sanskrit && (
                  <span className="font-deva text-2xl text-saffron-300/70">{section.sanskrit}</span>
                )}
              </div>
              <h3 className="mt-3 font-serif text-xl text-white">{section.name}</h3>
              <p className="text-sm font-medium text-saffron-300/80">{section.meaning}</p>
              <p className="mt-2 text-sm leading-relaxed text-night-300">{section.blurb}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-night-500">
                {section.songs.length} {section.songs.length === 1 ? 'song' : 'songs'}
              </p>
            </Link>
          ))}
        </div>
      </section>
      {/* His voice */}
      <section className="mx-auto max-w-5xl px-5 pb-6">
        <Reveal className="glass relative overflow-hidden rounded-3xl p-7 sm:p-10">
          <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-saffron-500/10 blur-3xl" />
          <span
            className="pointer-events-none absolute -top-8 right-6 select-none font-serif text-[8rem] leading-none text-white/[0.04]"
            aria-hidden="true"
          >
            ॐ
          </span>

          <div className="relative grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div>
              <p className="section-eyebrow">Hear him</p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-white sm:text-4xl">
                The voice of <span className="gold-text">Śaraṇāgati</span>
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-night-200">
                Śrīla Prabhupāda’s dear disciple, translator of his books into Bengali and a
                shelter for devotees across the world — Maharaja sang these prayers with a
                sweetness that melts the heart and turns it toward surrender. Begin here.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/timeline"
                  className="inline-flex items-center gap-2 text-sm font-medium text-saffron-300 transition-colors hover:text-saffron-200"
                >
                  His life, chapter by chapter
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <AudioPlayer audio={FEATURED} title={FEATURED.title} />
              {FEATURED.note && (
                <p className="mt-3 text-center text-xs text-night-400 md:text-left">{FEATURED.note}</p>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Your offering */}
      <section className="mx-auto max-w-5xl px-5 pb-8 pt-14">
        <Reveal className="relative overflow-hidden rounded-3xl border border-saffron-400/20 bg-gradient-to-br from-saffron-500/[0.09] via-lotus-600/[0.06] to-transparent p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-lotus-600/10 blur-3xl" />

          <div className="relative">
            <div className="flex justify-center animate-float">
              <LotusMark className="h-10 w-10" />
            </div>
            <p className="section-eyebrow mt-5">Your turn</p>
            <h2 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
              Did you know <span className="gold-text">Maharaja</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-night-200">
              If you met him, heard him sing, received his shelter, or remember something of
              him that others should know — please write it down. Every offering is read, and
              then added to his glorification for everyone who comes after.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-night-400">
              No account needed. Your name is shown only if you give one; your email is never
              shown at all.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/offering" className="btn-primary">
                Offer your glorification
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </Link>
              <Link
                to="/qualities"
                className="rounded-full border border-white/15 px-6 py-3 font-medium text-night-100 transition-colors hover:border-saffron-400/40 hover:text-saffron-200"
              >
                Read what devotees remember
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
