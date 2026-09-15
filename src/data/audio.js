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

// Direct streaming base — the ISKCON Desire Tree devotional audio archive
// (a free, public archive of Maharaja's bhajans). Files stream directly
// (HTTP range requests supported), so nothing needs to be re-hosted.
const IDT =
  'https://audio.iskcondesiretree.com/02_-_ISKCON_Swamis/ISKCON_Swamis_-_A_to_C/His_Holiness_Bhakti_Charu_Swami/Bhajans/Vaishnava_Bhajans/'

const idt = (file) => ({ type: 'audio', src: IDT + encodeURIComponent(file) })

// Per-song recordings sung by HH Bhakti Charu Swami Maharaja.
// Maharaja recorded a portion of the Śaraṇāgati songs; these 8 are confirmed
// and streaming from the ISKCON Desire Tree archive. Songs without an entry
// show a graceful "recording coming soon" card.
export const AUDIO = {
  'introductory': idt('BCS_Bhajans_-_Shri_Krishna_Chaitanya_Prabhu_Jive_Daya_Kori.mp3'),
  'dainya-4': idt('BCS_Bhajans_-_Amar_Jivana_Sada.mp3'),
  'atma-nivedana-3': idt('BCS_Bhajans_-_Manasa_Deho_Geha.mp3'),
  'goptrtve-varana-1': idt('BCS_Bhajans_-_Ki_Jane_Ki_Bale_Tomaro_Dhamite.mp3'),
  'avasya-raksibe-krsna-2': idt('BCS_Bhajans_-_Tumito_Maribe_Jare.mp3'),
  'bhakti-pratikula-1': idt('BCS_Bhajans_-_Kesava_Tua_Jagata_Vichitra.mp3'),
  'svikara-3': idt('BCS_Bhajans_-_Suddha_Bhakata_Carana_Renu.mp3'),
  'nama-mahatmya': idt('BCS_Bhajans_-_Krishna_Naam_Dhare_Kato_Bal.mp3'),
}

export function getAudio(slug) {
  return AUDIO[slug] || null
}
