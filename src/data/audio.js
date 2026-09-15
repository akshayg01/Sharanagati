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

// Per-song recordings. Add entries as you confirm/collect them.
// Example:
//   'dainya-1': { type: 'audio', src: '/audio/dainya-1.mp3' },
export const AUDIO = {
  // 'introductory': { type: 'youtube', src: 'XXXXXXXXXXX' },
}

export function getAudio(slug) {
  return AUDIO[slug] || null
}
