import { Link } from 'react-router-dom'
import { Divider, LotusMark } from '../components/Om.jsx'
import { OFFICIAL_CHANNELS } from '../data/audio.js'

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <div className="mb-6 flex justify-center animate-float">
        <LotusMark className="h-14 w-14" />
      </div>

      <header className="text-center">
        <p className="section-eyebrow">Glorification</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-white sm:text-5xl">
          His Holiness <span className="gold-text">Bhakti Charu Swami</span> Maharaja
        </h1>
        <p className="mt-3 text-night-300">1945 — 2020 · Disciple of His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda</p>
        <Divider className="mt-6" />
      </header>

      <section className="prose-invert mt-10 space-y-5 text-[15px] leading-relaxed text-night-200">
        <p>
          His Holiness Bhakti Charu Swami Maharaja was a beloved spiritual master and a
          senior disciple of Śrīla Prabhupāda, the Founder-Ācārya of the International
          Society for Krishna Consciousness. Surrendering his life to the mission of his
          guru, Maharaja became renowned worldwide for his deep humility, his sweet
          devotion, and the extraordinary beauty of his kīrtana and bhajana.
        </p>
        <p>
          Among his many services, Maharaja translated Śrīla Prabhupāda’s biography and
          numerous sacred texts into Bengali, produced the acclaimed television series on
          the life of Śrīla Prabhupāda, and established and nurtured temples and
          communities across the world, including the magnificent ISKCON temple in Ujjain,
          India. Through it all, he remained a shelter and an inspiration to countless
          devotees.
        </p>
        <p>
          His renditions of the songs of the great Vaiṣṇava ācāryas — and especially the{' '}
          <em>Śaraṇāgati</em> of Śrīla Bhaktivinoda Ṭhākura — carry a rare sweetness that
          melts the heart and draws the soul toward surrender. This website is a humble
          offering of service (seva) at his lotus feet, gathering these songs so that his
          glorification may continue and his voice may keep guiding sincere souls on the
          path of śaraṇāgati.
        </p>
        <p className="text-center font-serif text-lg italic text-saffron-100">
          nama oṁ viṣṇu-pādāya … We offer our humble obeisances unto His Holiness Bhakti
          Charu Swami Maharaja.
        </p>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href={OFFICIAL_CHANNELS.soundcloud} target="_blank" rel="noreferrer" className="btn-primary">
          Listen on SoundCloud
        </a>
        <a
          href={OFFICIAL_CHANNELS.appleMusic}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/15 px-6 py-3 font-medium text-night-100 transition-colors hover:border-saffron-400/40 hover:text-saffron-200"
        >
          Apple Music
        </a>
      </div>

      {/* About the book */}
      <section className="mt-16">
        <div className="text-center">
          <p className="section-eyebrow">The Songbook</p>
          <h2 className="mt-2 font-serif text-3xl text-white">About Śaraṇāgati</h2>
          <Divider className="mt-6" />
        </div>
        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-night-200">
          <p>
            <em>Śaraṇāgati</em> (“Surrendered to the Lord’s Shelter”) was composed by Śrīla
            Bhaktivinoda Ṭhākura in 1893. This treasured songbook contains fifty songs that
            reveal the six symptoms — the six limbs — of surrender unto the lotus feet of
            Śrī Kṛṣṇa:
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              ['Dainya', 'Humility'],
              ['Ātma-Nivedana', 'Dedication of the self'],
              ['Goptṛtve-Varaṇa', 'Accepting Kṛṣṇa as maintainer'],
              ['Avaśya Rakṣibe Kṛṣṇa', 'Faith in His protection'],
              ['Bhakti-Anukūla Svīkara', 'Accepting the favorable'],
              ['Bhakti-Pratikūla Varjana', 'Rejecting the unfavorable'],
            ].map(([name, meaning]) => (
              <li key={name} className="glass rounded-xl px-4 py-3">
                <span className="font-serif text-saffron-100">{name}</span>
                <span className="block text-sm text-night-400">{meaning}</span>
              </li>
            ))}
          </ul>
          <p>
            Beyond these principles, the book rises into the soul’s deep hankering for
            divine service (<em>Bhajana-Lālasā</em>), the longing for spiritual perfection
            (<em>Siddhi-Lālasā</em>), and the glories of the holy name (
            <em>Śrī Nāma-Māhātmya</em>).
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/songbook" className="btn-primary">
            Explore all 50 songs
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" /></svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
