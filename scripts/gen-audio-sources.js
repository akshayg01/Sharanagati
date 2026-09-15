// Generates AUDIO-SOURCES.md — a per-song listing of where to find/download
// recordings of the Śaraṇāgati songs, so MP3s can be collected and later
// wired into src/data/audio.js.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SONGS_DIR = join(__dirname, '..', 'src', 'data', 'songs')
const OUT = join(__dirname, '..', 'AUDIO-SOURCES.md')

const files = readdirSync(SONGS_DIR)
  .filter((f) => /^\d/.test(f))
  .sort()
const songs = files.map((f) => JSON.parse(readFileSync(join(SONGS_DIR, f), 'utf8')))

const stripDiacritics = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .replace(/ṁ/gi, 'm')

const yt = (q) =>
  'https://www.youtube.com/results?search_query=' + encodeURIComponent(q)

// ISKCON Desire Tree — confirmed direct MP3 downloads (Bhakti Charu Swami).
const IDT =
  'https://audio.iskcondesiretree.com/02_-_ISKCON_Swamis/ISKCON_Swamis_-_A_to_C/His_Holiness_Bhakti_Charu_Swami/Bhajans/Vaishnava_Bhajans/'
const CONFIRMED_MP3 = {
  introductory: 'BCS_Bhajans_-_Shri_Krishna_Chaitanya_Prabhu_Jive_Daya_Kori.mp3',
  'dainya-4': 'BCS_Bhajans_-_Amar_Jivana_Sada.mp3',
  'atma-nivedana-3': 'BCS_Bhajans_-_Manasa_Deho_Geha.mp3',
  'goptrtve-varana-1': 'BCS_Bhajans_-_Ki_Jane_Ki_Bale_Tomaro_Dhamite.mp3',
  'avasya-raksibe-krsna-2': 'BCS_Bhajans_-_Tumito_Maribe_Jare.mp3',
  'bhakti-pratikula-1': 'BCS_Bhajans_-_Kesava_Tua_Jagata_Vichitra.mp3',
  'svikara-3': 'BCS_Bhajans_-_Suddha_Bhakata_Carana_Renu.mp3',
  'nama-mahatmya': 'BCS_Bhajans_-_Krishna_Naam_Dhare_Kato_Bal.mp3',
}

// Individual YouTube recordings identified for a specific song.
const KNOWN_YT = {
  'dainya-1': {
    url: 'https://www.youtube.com/watch?v=9tPThMQbR-8',
    note: 'Bhuliyā Tomāre — Special Kirtan (Bhakti Charu Swami)',
  },
}

let md = `# Śaraṇāgati — Audio Sources

A working list of where to find recordings of each of the 50 songs, so MP3s can be
collected and later added to the site (see \`src/data/audio.js\`, or drop files into
\`public/audio/\`).

> **Priority: recordings sung by HH Bhakti Charu Swami Maharaja.** This site is for his
> glorification, so his own voice comes first. Every per-song search below targets
> *Bhakti Charu Swami* specifically. The full 50-song set by other devotees (listed
> under collections) is only a **last resort** for songs he did not record.

**Legend**
- 🟢 **Direct MP3** — click and download immediately.
- 🎥 **Video found** — a specific recording identified (download the audio with a
  YouTube downloader such as [yt-dlp](https://github.com/yt-dlp/yt-dlp), e.g.
  \`yt-dlp -x --audio-format mp3 "<url>"\`).
- 🔎 **Search** — a ready-made search to find a recording (please verify it is the
  correct song before using).

---

## Best full collections (cover many/all songs)

| Source | What it is | Link |
|---|---|---|
| **ISKCON Desire Tree** | Bhakti Charu Swami bhajans — **8 Śaraṇāgati songs as direct MP3s** | [folder](${IDT.replace(/\/$/, '')}) |
| **Bhaktivinoda Institute — Songs of Saranagati** | All 50 songs — **other devotees, NOT Maharaja** (last-resort fallback only) | https://bhaktivinodainstitute.org/audio/songs-of-saranagati/ |
| **YouTube — 8 Saranagati songs (BCS)** | Compilation of 8 songs by Maharaja | https://www.youtube.com/watch?v=v4BnNj4HReg |
| **YouTube — Saranagati 2nd Part (BCS)** | Further Saranagati bhajans by Maharaja | https://www.youtube.com/watch?v=dpj6DXUcAcQ |
| **YouTube — Saranagati Introduction (BCS)** | Introductory bhajan | https://www.youtube.com/watch?v=EfsWxwo6yH0 |
| **YouTube — Saranagati Bhajan (BCS)** | Saranagati kirtan | https://www.youtube.com/watch?v=j6OZJpSFu-U |
| **YouTube — HH Bhakti Charu Swami (playlist)** | Maharaja's bhajans playlist | https://www.youtube.com/playlist?list=PLu539sEgBs-D2bFXVu-d8HOs5Kt88uIs_ |

> Tip: the ISKCON Desire Tree MP3s below are already wired into the site and playing.
> For the rest, the fastest path is usually the Bhaktivinoda Institute full set, or
> \`yt-dlp\` on a YouTube video, then hand me the MP3s.

---

## Per-song list

`

let currentSection = null
for (const s of songs) {
  if (s.section !== currentSection) {
    currentSection = s.section
    md += `\n### ${s.label.replace(/ Song .*/, '') || s.section}\n\n`
    md += `| # | Song | Status | Link |\n|---|---|---|---|\n`
  }

  let status, link
  if (CONFIRMED_MP3[s.slug]) {
    const url = IDT + encodeURIComponent(CONFIRMED_MP3[s.slug])
    status = '🟢 Direct MP3 (BCS)'
    link = `[download](${url})`
  } else if (KNOWN_YT[s.slug]) {
    status = '🎥 Video (BCS)'
    link = `[${KNOWN_YT[s.slug].note}](${KNOWN_YT[s.slug].url})`
  } else {
    status = '🔎 Search (BCS)'
    const q = 'Bhakti Charu Swami ' + stripDiacritics(s.title)
    const g = 'https://www.google.com/search?q=' + encodeURIComponent(q + ' bhajan')
    link = `[YouTube](${yt(q)}) · [Google](${g})`
  }

  md += `| ${s.order} | ${s.title} | ${status} | ${link} |\n`
}

md += `
---

## When you have MP3s

Hand me the files (or their names mapped to songs) and I will wire them in. Either:

1. Drop them into \`public/audio/\` and I will point each song at \`/audio/<file>.mp3\`, **or**
2. Give me direct URLs / YouTube links and I will add them to \`src/data/audio.js\`.

Song slugs (for mapping) are in \`src/data/songs/_index.json\`.

*Generated by \`scripts/gen-audio-sources.js\`.*
`

writeFileSync(OUT, md, 'utf8')
console.log('Wrote', OUT)
console.log(
  'Confirmed MP3:',
  Object.keys(CONFIRMED_MP3).length,
  '· Known videos:',
  Object.keys(KNOWN_YT).length,
  '· Total songs:',
  songs.length
)
