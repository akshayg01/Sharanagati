// Adds Devanagari (Hindi script) and Bengali script renderings of each song's
// transliteration lines, generated from the IAST romanization via sanscript.
// Adds per-verse `deva` and `bengali` arrays, and song-level title variants.
//
// Run:  node scripts/add-scripts.js

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import pkg from '@indic-transliteration/sanscript'

const Sanscript = pkg.default || pkg
const __dirname = dirname(fileURLToPath(import.meta.url))
const SONGS_DIR = join(__dirname, '..', 'src', 'data', 'songs')

// Normalise the Gaudiya IAST romanization so sanscript maps every sound:
//  - ṁ (dot above) is the anusvara; sanscript's IAST uses ṃ (dot below)
//  - the Vaiṣṇava romanization uses "w" for व/ব (sanscript IAST has only v)
const pre = (s) =>
  s
    .replace(/ṁ/g, 'ṃ')
    .replace(/Ṁ/g, 'Ṃ')
    .replace(/w/g, 'v')
    .replace(/W/g, 'V')

const toDeva = (s) => Sanscript.t(pre(s), 'iast', 'devanagari')
const toBengali = (s) => Sanscript.t(pre(s), 'iast', 'bengali')

const files = readdirSync(SONGS_DIR).filter((f) => /^\d/.test(f))
let count = 0

for (const f of files) {
  const path = join(SONGS_DIR, f)
  const song = JSON.parse(readFileSync(path, 'utf8'))

  song.titleDeva = toDeva(song.title)
  song.titleBengali = toBengali(song.title)

  song.verses = song.verses.map((v) => ({
    ...v,
    deva: v.translit.map(toDeva),
    bengali: v.translit.map(toBengali),
  }))

  writeFileSync(path, JSON.stringify(song, null, 2), 'utf8')
  count++
}

console.log(`Added Devanagari + Bengali to ${count} songs.`)
