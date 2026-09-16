// The life timeline of HH Bhakti Charu Swami Maharaja.
//
// Content lives in timeline.json (plain JSON — no database, no CMS). Each event
// names a `source` key that is resolved here against the `sources` dictionary,
// so an editor writes `"source": "wiki"` once instead of repeating a URL.

import data from './timeline.json'

export const subject = data.subject
export const sourceList = data.sources
export const stats = data.stats

/**
 * Eras with their event `source` keys resolved to { label, url } objects.
 * An event may cite one source ("wiki") or several (["wiki", "ocean"]); either
 * way it comes out of here as an array, so the card renders them the same way.
 */
export const eras = data.eras.map((era) => ({
  ...era,
  events: era.events.map((event) => ({
    ...event,
    sources: [event.source]
      .flat()
      .filter(Boolean)
      .map((key) => data.sources[key])
      .filter(Boolean),
  })),
}))

/** Every event in book order, each tagged with the era it belongs to. */
export const allEvents = eras.flatMap((era) =>
  era.events.map((event) => ({ ...event, eraSlug: era.slug, eraTitle: era.title })),
)

export const TOTAL_EVENTS = allEvents.length
export const FIRST_YEAR = eras[0].startYear
export const LAST_YEAR = eras[eras.length - 1].endYear
export const YEAR_RANGE = `${FIRST_YEAR} — ${LAST_YEAR}`

/** A deep link (/timeline/:anchor) may name either an era or a single event. */
export function isKnownAnchor(anchor) {
  if (!anchor) return false
  return eras.some((e) => e.slug === anchor) || allEvents.some((e) => e.id === anchor)
}

export function eraOf(anchor) {
  if (eras.some((e) => e.slug === anchor)) return anchor
  return allEvents.find((e) => e.id === anchor)?.eraSlug || ''
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** "1945-09-17" + "day" → "17 September 1945"; "1974" + "circa" → "c. 1974". */
export function formatEventDate(date, precision = 'year') {
  const [y, m, d] = String(date).split('-')
  const month = m ? MONTHS[Number(m) - 1] : null

  if (precision === 'day' && month && d) return `${Number(d)} ${month} ${y}`
  if (precision === 'month' && month) return `${month} ${y}`
  if (precision === 'circa') return month ? `c. ${month} ${y}` : `c. ${y}`
  return y
}

/** The machine-readable value for <time dateTime>. */
export function isoDate(date) {
  return String(date)
}

export function yearOf(date) {
  return Number(String(date).slice(0, 4))
}

export function eraYears(era) {
  return era.startYear === era.endYear ? String(era.startYear) : `${era.startYear} — ${era.endYear}`
}

/** Compact label for the chips and rail. */
export function eraYearsShort(era) {
  return era.startYear === era.endYear ? String(era.startYear) : `${era.startYear}–${era.endYear}`
}
