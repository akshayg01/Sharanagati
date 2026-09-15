# Śaraṇāgati

A devotional website glorifying **His Holiness Bhakti Charu Swami Maharaja** through the
songs of **Śaraṇāgati** — the songbook of surrender composed by Śrīla Bhaktivinoda Ṭhākura
in 1893. All 50 songs are presented with full transliteration and English translation,
alongside Maharaja's recordings.

> *A humble offering of service (seva) at his lotus feet.*

## Tech stack

- **Vite** + **React 18** (React Router, `HashRouter` for easy static hosting)
- **Tailwind CSS** for the design system (saffron / lotus / night-blue devotional palette)
- Song content stored as JSON, bundled at build time

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
scripts/
  songs-manifest.js   # sections + the 50 song page URLs
  scrape-songs.js     # fetches & parses lyrics/translations → src/data/songs/*.json
src/
  data/
    songs/            # one JSON per song (generated) + _index.json
    songs.js          # assembles the book, groups by section, merges audio
    audio.js          # audio sources + official channels  ← EDIT TO ADD RECORDINGS
  components/         # Navbar, Footer, AudioPlayer, decorative marks
  pages/              # Home, Songbook, SongPage, About (Glorification), NotFound
```

## Adding Maharaja's recordings

The player supports **local MP3s**, **direct URLs**, **YouTube**, and **SoundCloud**.
Edit `src/data/audio.js` and add an entry per song, keyed by the song `slug`
(see `src/data/songs/_index.json` for slugs):

```js
export const AUDIO = {
  'introductory':  { type: 'youtube',    src: 'YOUTUBE_VIDEO_ID' },
  'dainya-1':      { type: 'audio',      src: '/audio/dainya-1.mp3' }, // file in public/audio/
  'atma-nivedana-1': { type: 'soundcloud', src: 'https://soundcloud.com/bhakticharuswami/...' },
}
```

Songs without an entry show a graceful "recording coming soon" card that links to
Maharaja's official channels. A featured compilation plays on the home page (`FEATURED`).

> **Note on audio:** Maharaja's recordings live on his official channels
> ([SoundCloud](https://soundcloud.com/bhakticharuswami/albums),
> Apple Music, audio.com, YouTube). This site links/embeds those official sources
> rather than redistributing files, so his work stays credited to its homes. Drop
> local MP3s into `public/audio/` only if you have the right to host them.

## Re-scraping the songs

```bash
node scripts/scrape-songs.js
```

Lyrics & translations are courtesy of the
[Bhaktivinoda Institute](https://bhaktivinodainstitute.org/writings/songs-poems/saranagati-surrendered-to-the-lords-shelter/).
The songs themselves are by Śrīla Bhaktivinoda Ṭhākura (1893, public domain).

## Deployment

Because the app uses `HashRouter` and a relative `base`, the `dist/` folder is a static
bundle that works on any host — Netlify, Vercel, GitHub Pages, or a plain web server.
For GitHub Pages project sites, set `base: '/Sharanagati/'` in `vite.config.js`.

---

*Hare Kṛṣṇa Hare Kṛṣṇa · Kṛṣṇa Kṛṣṇa Hare Hare · Hare Rāma Hare Rāma · Rāma Rāma Hare Hare*
