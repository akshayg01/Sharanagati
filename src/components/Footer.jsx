import { Link } from 'react-router-dom'
import { Divider } from './Om.jsx'
import { OFFICIAL_CHANNELS } from '../data/audio.js'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-night-950/60">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <Divider className="mb-8" />
        <p className="mx-auto max-w-2xl text-center font-serif text-lg italic text-night-200">
          “Weeping and weeping, he tells them, ‘I am certainly the lowest of men!
          Oh please make me the worthiest by teaching me the ways of śaraṇāgati!’”
        </p>
        <p className="mt-2 text-center text-sm text-night-400">
          — Śrīla Bhaktivinoda Ṭhākura, Introductory Song
        </p>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 text-sm text-night-400 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/songbook" className="hover:text-saffron-300">Songbook</Link>
            <Link to="/timeline" className="hover:text-saffron-300">His Life</Link>
            <Link to="/qualities" className="hover:text-saffron-300">Qualities</Link>
            <Link to="/offering" className="hover:text-saffron-300">Your Offering</Link>
            <Link to="/support" className="hover:text-saffron-300">Support</Link>
            <a href={OFFICIAL_CHANNELS.soundcloud} target="_blank" rel="noreferrer" className="hover:text-saffron-300">SoundCloud</a>
            <a href={OFFICIAL_CHANNELS.appleMusic} target="_blank" rel="noreferrer" className="hover:text-saffron-300">Apple Music</a>
          </div>
          <p className="text-center md:text-right">
            Lyrics &amp; translations:{' '}
            <a
              href="https://bhaktivinodainstitute.org/writings/songs-poems/saranagati-surrendered-to-the-lords-shelter/"
              target="_blank"
              rel="noreferrer"
              className="text-night-300 underline decoration-dotted hover:text-saffron-300"
            >
              Bhaktivinoda Institute
            </a>
          </p>
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-night-500">
          A humble offering of service (seva) unto the lotus feet of
          <span className="text-night-300"> His Holiness Bhakti Charu Swami Maharaja</span>,
          for his glorification. Songs of Śrīla Bhaktivinoda Ṭhākura (1893).
          <br />
          Hare Kṛṣṇa Hare Kṛṣṇa · Kṛṣṇa Kṛṣṇa Hare Hare · Hare Rāma Hare Rāma · Rāma Rāma Hare Hare
        </p>
      </div>
    </footer>
  )
}
