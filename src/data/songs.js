// Assembles the full Śaraṇāgati songbook from the scraped per-song JSON files
// and the section metadata, and merges in audio sources.

import indexData from './songs/_index.json'
import { AUDIO } from './audio.js'

// Eagerly import every song JSON (Vite bundles these at build time).
const modules = import.meta.glob('./songs/*.json', { eager: true })

const songMap = {}
for (const path in modules) {
  if (path.endsWith('_index.json')) continue
  const data = modules[path].default || modules[path]
  songMap[data.slug] = { ...data, audio: AUDIO[data.slug] || null }
}

export const sections = indexData.sections

// Full song list in book order.
export const songs = [...Object.values(songMap)].sort((a, b) => a.order - b.order)

// Songs grouped under their section, in order — for the songbook overview.
export const sectionsWithSongs = sections.map((section, i) => ({
  ...section,
  index: i + 1,
  songs: songs.filter((s) => s.section === section.slug),
}))

export function getSong(slug) {
  return songMap[slug] || null
}

export function getSection(slug) {
  return sections.find((s) => s.slug === slug) || null
}

// Previous / next navigation across the whole book.
export function getNeighbors(slug) {
  const i = songs.findIndex((s) => s.slug === slug)
  return {
    prev: i > 0 ? songs[i - 1] : null,
    next: i >= 0 && i < songs.length - 1 ? songs[i + 1] : null,
  }
}

export const TOTAL_SONGS = songs.length
