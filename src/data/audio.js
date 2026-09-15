// Audio recordings of Śaraṇāgati by HH Bhakti Charu Swami Maharaja.
//
// HOW TO ADD AUDIO
// ----------------
// Fill an entry per song, keyed by the song `slug` (see src/data/songs/_index.json).
// Three supported source types:
//
//   { type: 'audio',      src: '/audio/dainya-1.mp3' }   // local file in /public/audio
//   { type: 'audio',      src: 'https://.../track.mp3' }  // any direct MP3 URL
//   { type: 'youtube',    src: 'VIDEO_ID', start: 0 }     // YouTube (embedded)
//   { type: 'soundcloud', src: 'https://soundcloud.com/bhakticharuswami/...' }
//
// To use local files: drop MP3s into  public/audio/  and point `src` at them.
// Anything not listed here shows a graceful "recording coming soon" state that
// links to Maharaja's official channels (see OFFICIAL_CHANNELS below).

export const OFFICIAL_CHANNELS = {
  soundcloud: 'https://soundcloud.com/bhakticharuswami/albums',
  appleMusic: 'https://music.apple.com/us/artist/bhakti-charu-swami/1658390763',
  audioArchive:
    'https://audio.com/serving-srila-prabhupada/collections/hh-bhakti-charu-swami-maharaj',
  youtube: 'https://www.youtube.com/results?search_query=Bhakti+Charu+Swami+Saranagati',
}

// A known compilation of Śaraṇāgati bhajans sung by Maharaja — used as the
// "featured" player until per-song recordings are mapped in below.
export const FEATURED = {
  type: 'youtube',
  src: 'v4BnNj4HReg',
  title: 'Śaraṇāgati Bhajans — HH Bhakti Charu Swami Maharaja',
  note: '8 Śaraṇāgati Vaiṣṇava songs sung by Maharaja.',
}

// Local MP3s live in public/audio/<slug>.mp3 and are served from the site itself.
const local = (slug) => ({ type: 'audio', src: `./audio/${slug}.mp3` })

// Per-song recordings sung by HH Bhakti Charu Swami Maharaja, downloaded locally.
// Sources: 8 from the ISKCON Desire Tree archive (Vaishnava Bhajans) + Dainya 1
// ("Bhuliyā Tomāre" Special Kirtan) from YouTube. See AUDIO-SOURCES.md.
// Songs without an entry show a graceful "recording coming soon" card.
export const AUDIO = {
  'introductory': local('introductory'),
  'dainya-1': local('dainya-1'),
  'dainya-4': local('dainya-4'),
  'atma-nivedana-3': local('atma-nivedana-3'),
  'goptrtve-varana-1': local('goptrtve-varana-1'),
  'avasya-raksibe-krsna-2': local('avasya-raksibe-krsna-2'),
  'bhakti-pratikula-1': local('bhakti-pratikula-1'),
  'svikara-3': local('svikara-3'),
  'nama-mahatmya': local('nama-mahatmya'),
}

export function getAudio(slug) {
  return AUDIO[slug] || null
}
