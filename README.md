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
    timeline.json     # the life of Maharaja: chapters, moments, sources  ← EDIT TO ADD EVENTS
    timeline.js       # resolves each event's source key, formats dates
    roadmap.json      # what is built / planned, and the contact email
  components/         # Navbar, Footer, AudioPlayer, Reveal, decorative marks
    timeline/         # EraRail, EraChips, EraSection, EventCard, LegacyStats, ListenPanel
  pages/              # Home, Songbook, SongPage, Timeline, Support, About (Glorification), NotFound
```

## The life timeline

`/timeline` tells the life of HH Bhakti Charu Swami Maharaja in six chapters. Everything is
data: edit **`src/data/timeline.json`** and the page follows. No database, no CMS.

```jsonc
{
  "sources": { "wiki": { "label": "Wikipedia", "url": "https://..." } },
  "eras": [{
    "slug": "the-search", "numeral": "II", "title": "The Search",
    "subtitle": "...", "startYear": 1970, "endYear": 1976, "theme": "...",
    "feature": "stats",          // optional: "stats" or "listen" panel
    "image": { "src": "./images/...jpg", "alt": "...", "caption": "..." },
    "events": [{
      "id": "germany",           // also the deep link: /#/timeline/germany
      "date": "1970",            // YYYY | YYYY-MM | YYYY-MM-DD
      "precision": "year",       // day | month | year | circa
      "dateLabel": "Over these years",   // optional: use instead of a date we cannot source
      "title": "...", "location": "...", "body": "...",
      "quote": { "text": "...", "source": "..." },   // optional
      "image": { "src": "...", "alt": "...", "caption": "..." },  // optional
      "source": "wiki"           // key into the `sources` map above
    }]
  }]
}
```

Deep links work for chapters *and* single moments: `/#/timeline/at-prabhupadas-side`,
`/#/timeline/sannyasa`.

**Editorial rule:** every event carries a `source`, and anything the public record does not
support does not go on the page. Where no source fixes a date, use `dateLabel` rather than
inventing a year. The content here was fact-checked against bhakticharuswami.com, the ISKCON
GBC page, ISKCON News, Back to Godhead, Wikipedia and ISKCON Desire Tree; corrections from
devotees who served alongside Maharaja are welcome.

## Support page

`/support` lists how people can help, a write-in form (it opens the visitor's own mail app —
there is no server and nothing is stored), and the roadmap. Edit **`src/data/roadmap.json`**
for the stages and the contact email.

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
