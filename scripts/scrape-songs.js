// Fetches every Śaraṇāgati song page and writes one JSON per song into
// src/data/songs/. Parses transliteration + English translation verse by verse.
//
// Run:  node scripts/scrape-songs.js
//
// Content source: Bhaktivinoda Institute (bhaktivinodainstitute.org).
// The songs themselves are by Śrīla Bhaktivinoda Ṭhākura (1893, public domain).

import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { sections, songs } from './songs-manifest.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'src', 'data', 'songs')

const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': "'",
  '&#39;': "'",
  '&nbsp;': ' ',
  '&hellip;': '…',
  '&rsquo;': '’',
  '&lsquo;': '‘',
  '&rdquo;': '”',
  '&ldquo;': '“',
  '&mdash;': '—',
  '&ndash;': '–',
}

function decode(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&[a-z]+;|&#\d+;/gi, (m) => ENTITIES[m] ?? m)
}

function cleanText(html) {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  )
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter((l) => l.length)
    .join('\n')
    .trim()
}

// Extract the article body between the entry-title and the share/footer nav.
function extractBody(html) {
  // Fusion (Avada) theme wraps post content in <div class="post-content"> ... </div>
  let start = html.indexOf('class="post-content"')
  if (start === -1) start = html.indexOf('<article')
  let end = html.indexOf('SHARE THIS', start)
  if (end === -1) end = html.indexOf('fusion-sharing', start)
  if (end === -1) end = html.indexOf('<footer', start)
  return html.slice(start, end === -1 ? undefined : end)
}

function parseSong(html) {
  const body = extractBody(html)
  const paras = [...body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => m[1])

  const verses = []
  let current = null

  for (const raw of paras) {
    const hasEm = /<em\b/i.test(raw)
    const text = cleanText(raw)
    if (!text) continue

    const translitMatch = text.match(/^\(([\d–\-,\s]+)\)/)
    const translationMatch = text.match(/^(\d[\d–\-,\s]*)\)\s*/)

    if (hasEm && translitMatch) {
      // New verse: strip the leading "(N)" line
      const label = translitMatch[1].trim().replace(/\s+/g, '')
      const lines = text
        .split('\n')
        .filter((l) => !/^\([\d–\-,\s]+\)$/.test(l))
      current = { label, translit: lines, translation: '' }
      verses.push(current)
    } else if (!hasEm && translationMatch && current) {
      const t = text.replace(/^(\d[\d–\-,\s]*)\)\s*/, '').trim()
      current.translation = current.translation
        ? current.translation + '\n' + t
        : t
    } else if (!hasEm && current && !current.translation && text.length > 40) {
      // Fallback: unnumbered translation paragraph right after a verse
      current.translation = text
    }
  }

  return verses
}

function extractMetaDescription(html) {
  const m = html.match(/<meta name="description" content="([^"]*)"/i)
  return m ? decode(m[1]) : ''
}

// Meta description formats:
//   "<Label> (<first line>) of Śaraṇāgati ..."
//   "<Label>: <first line> from Śaraṇāgati ..."
function parseMeta(meta, fallback, incipit) {
  let label = (meta.match(/^(.*?)\s*[(:]/) || [])[1]?.trim() || fallback
  label = label.replace(/\s+of\s+Śaraṇāgati$/i, '').trim()
  // Colon format (intro song): "Label: <first line> from Śaraṇāgati"
  let firstLine = (meta.match(/:\s*(.+?)\s+from\s+Śaraṇāgati/i) || [])[1]
  if (!firstLine) {
    // Parenthetical format: "Label (<first line>) of Śaraṇāgati" —
    // skip the book subtitle gloss "(‘Surrender’)".
    const paren = (meta.match(/\(([^)]+)\)/) || [])[1] || ''
    if (paren && !/surrender/i.test(paren)) firstLine = paren
  }
  firstLine = (firstLine || '').trim().replace(/[',]$/, '')
  if (!firstLine) firstLine = incipit
  return { label, firstLine }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const index = []
  let order = 0

  for (const song of songs) {
    order += 1
    process.stdout.write(`[${order}/${songs.length}] ${song.slug} … `)
    let verses = []
    let meta = ''
    try {
      const res = await fetch(song.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Sharanagati devotional archive)' },
      })
      const html = await res.text()
      verses = parseSong(html)
      meta = extractMetaDescription(html)
    } catch (e) {
      console.log('FAILED', e.message)
      continue
    }

    const incipit = verses[0]?.translit?.[0]?.replace(/,\s*$/, '') || song.slug
    const { label, firstLine } = parseMeta(meta, song.slug, incipit)
    const title = song.titleOverride || firstLine || incipit
    const record = {
      slug: song.slug,
      section: song.section,
      order,
      label, // e.g. "Bhajana-Lālasā Song One"
      title, // canonical opening line, used as the song title
      incipit,
      metaDescription: meta,
      verseCount: verses.length,
      verses,
      source: {
        name: 'Bhaktivinoda Institute',
        url: song.url,
      },
      // Audio is filled in separately (see src/data/audio.js).
    }
    await writeFile(
      join(OUT_DIR, `${String(order).padStart(2, '0')}-${song.slug}.json`),
      JSON.stringify(record, null, 2),
      'utf8'
    )
    index.push({ slug: song.slug, section: song.section, order, verses: verses.length })
    console.log(`${verses.length} verses`)
  }

  await writeFile(
    join(OUT_DIR, '_index.json'),
    JSON.stringify({ sections, songs: index }, null, 2),
    'utf8'
  )
  console.log(`\nDone. ${index.length} songs written to ${OUT_DIR}`)
  const empty = index.filter((s) => s.verses === 0)
  if (empty.length) console.log('WARNING empty:', empty.map((s) => s.slug).join(', '))
}

main()
