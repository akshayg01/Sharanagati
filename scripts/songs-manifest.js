// Manifest of Śaraṇāgati — sections + song page URLs (Bhaktivinoda Institute).
// Used by scrape-songs.js to fetch and parse full lyrics + translations.

export const sections = [
  {
    slug: 'introductory',
    name: 'Introductory Song',
    sanskrit: '',
    meaning: 'Invocation',
    blurb:
      'Śrī Caitanya Mahāprabhu descends to teach the fallen souls the path of śaraṇāgati — surrender at the lotus feet of Śrī Kṛṣṇa.',
  },
  {
    slug: 'dainya',
    name: 'Dainya',
    sanskrit: 'दैन्य',
    meaning: 'Humility',
    blurb:
      'The first limb of surrender: lamenting one’s fallen condition and forgetfulness of the Lord across a lifetime.',
  },
  {
    slug: 'atma-nivedana',
    name: 'Ātma-Nivedana',
    sanskrit: 'आत्म-निवेदन',
    meaning: 'Dedication of the Self',
    blurb:
      'Offering one’s body, mind, home, and very self entirely at the feet of the Lord.',
  },
  {
    slug: 'goptrtve-varana',
    name: 'Goptṛtve-Varaṇa',
    sanskrit: 'गोप्तृत्वे-वरण',
    meaning: 'Accepting Kṛṣṇa as Sole Maintainer',
    blurb:
      'Embracing Kṛṣṇa as the only guardian and maintainer, abandoning all other shelters.',
  },
  {
    slug: 'avasya-raksibe-krsna',
    name: 'Avaśya Rakṣibe Kṛṣṇa',
    sanskrit: 'अवश्य रक्षिबे कृष्ण',
    meaning: 'Faith in Kṛṣṇa as Protector',
    blurb:
      'The firm conviction: “Kṛṣṇa will surely protect me.” Full trust in the Lord’s shelter.',
  },
  {
    slug: 'bhakti-pratikula-bhava-varjanangikara',
    name: 'Bhakti-Pratikūla-Bhāva Varjanāṅgīkāra',
    sanskrit: 'भक्ति-प्रतिकूल-भाव वर्जन',
    meaning: 'Rejecting the Unfavorable',
    blurb:
      'Renouncing all that is unfavorable to pure devotional service unto Śrī Kṛṣṇa.',
  },
  {
    slug: 'svikara',
    name: 'Svīkara',
    sanskrit: 'स्वीकार',
    meaning: 'Accepting the Favorable',
    blurb:
      'Embracing everything favorable to bhakti — the association of devotees and service in the holy dhāma.',
  },
  {
    slug: 'bhajana-lalasa',
    name: 'Bhajana-Lālasā',
    sanskrit: 'भजन-लालसा',
    meaning: 'Hankering for Service',
    blurb:
      'The soul’s deep hankering and prayer for pure devotional service at the feet of the Vaiṣṇavas and the Divine Couple.',
  },
  {
    slug: 'siddhi-lalasa',
    name: 'Siddhi-Lālasā',
    sanskrit: 'सिद्धि-लालसा',
    meaning: 'Hankering for Perfection',
    blurb:
      'Yearning for the perfection of eternal service in the transcendental abode of Śrī Śrī Rādhā-Kṛṣṇa.',
  },
  {
    slug: 'vijnapti-nama-mahatmya',
    name: 'Vijñapti & Śrī Nāma-Māhātmya',
    sanskrit: 'विज्ञप्ति · श्री नाम-माहात्म्य',
    meaning: 'Prayer & Glories of the Holy Name',
    blurb:
      'A final humble petition, and the glorification of the all-powerful holy name of Kṛṣṇa.',
  },
]

// order = global order across the whole book
export const songs = [
  { slug: 'introductory', section: 'introductory', url: 'https://bhaktivinodainstitute.org/sri-krsna-caitanya-prabhu-jive-doya-kori/' },

  { slug: 'dainya-1', section: 'dainya', url: 'https://bhaktivinodainstitute.org/dainya-song-one/' },
  { slug: 'dainya-2', section: 'dainya', url: 'https://bhaktivinodainstitute.org/dainya-song-two/' },
  { slug: 'dainya-3', section: 'dainya', url: 'https://bhaktivinodainstitute.org/dainya-song-three/' },
  { slug: 'dainya-4', section: 'dainya', url: 'https://bhaktivinodainstitute.org/dainya-song-four/' },
  { slug: 'dainya-5', section: 'dainya', url: 'https://bhaktivinodainstitute.org/dainya-song-five/' },
  { slug: 'dainya-6', section: 'dainya', url: 'https://bhaktivinodainstitute.org/dainya-song-six/' },
  { slug: 'dainya-7', section: 'dainya', url: 'https://bhaktivinodainstitute.org/dainya-song-seven/' },

  { slug: 'atma-nivedana-1', section: 'atma-nivedana', url: 'https://bhaktivinodainstitute.org/atma-nivedana-song-one/' },
  { slug: 'atma-nivedana-2', section: 'atma-nivedana', url: 'https://bhaktivinodainstitute.org/atma-nivedana-song-two/' },
  { slug: 'atma-nivedana-3', section: 'atma-nivedana', url: 'https://bhaktivinodainstitute.org/atma-nivedana-song-three/' },
  { slug: 'atma-nivedana-4', section: 'atma-nivedana', url: 'https://bhaktivinodainstitute.org/atma-nivedana-song-four/' },
  { slug: 'atma-nivedana-5', section: 'atma-nivedana', url: 'https://bhaktivinodainstitute.org/atma-nivedana-song-five/' },
  { slug: 'atma-nivedana-6', section: 'atma-nivedana', url: 'https://bhaktivinodainstitute.org/atma-nivedana-song-six/' },
  { slug: 'atma-nivedana-7', section: 'atma-nivedana', url: 'https://bhaktivinodainstitute.org/atma-nivedana-song-seven/' },
  { slug: 'atma-nivedana-8', section: 'atma-nivedana', url: 'https://bhaktivinodainstitute.org/atma-nivedana-song-eight/' },

  { slug: 'goptrtve-varana-1', section: 'goptrtve-varana', url: 'https://bhaktivinodainstitute.org/goptrtve-varana-song-one/' },
  { slug: 'goptrtve-varana-2', section: 'goptrtve-varana', url: 'https://bhaktivinodainstitute.org/goptrtve-varana-song-two/' },
  { slug: 'goptrtve-varana-3', section: 'goptrtve-varana', url: 'https://bhaktivinodainstitute.org/goptrtve-varana-song-three/' },
  { slug: 'goptrtve-varana-4', section: 'goptrtve-varana', url: 'https://bhaktivinodainstitute.org/goptrtve-varana-song-four/' },

  { slug: 'avasya-raksibe-krsna-1', section: 'avasya-raksibe-krsna', url: 'https://bhaktivinodainstitute.org/avasya-raksibe-krsna-song-one/' },
  { slug: 'avasya-raksibe-krsna-2', section: 'avasya-raksibe-krsna', url: 'https://bhaktivinodainstitute.org/avasya-raksibe-krsna-song-two/' },
  { slug: 'avasya-raksibe-krsna-3', section: 'avasya-raksibe-krsna', url: 'https://bhaktivinodainstitute.org/avasya-raksibe-krsna-song-three/' },
  { slug: 'avasya-raksibe-krsna-4', section: 'avasya-raksibe-krsna', url: 'https://bhaktivinodainstitute.org/avasya-raksibe-krsna-song-four/' },

  { slug: 'bhakti-pratikula-1', section: 'bhakti-pratikula-bhava-varjanangikara', url: 'https://bhaktivinodainstitute.org/bhakti-pratikula-bhava-varjanangikara-song-one/' },
  { slug: 'bhakti-pratikula-2', section: 'bhakti-pratikula-bhava-varjanangikara', url: 'https://bhaktivinodainstitute.org/bhakti-pratikula-bhava-varjana%e1%b9%85gikara-song-two/' },
  { slug: 'bhakti-pratikula-3', section: 'bhakti-pratikula-bhava-varjanangikara', url: 'https://bhaktivinodainstitute.org/bhakti-pratikula-bhava-varjana%e1%b9%85gikara-song-three/' },
  // Source page's meta description is duplicated from song 3; use the true opening line.
  { slug: 'bhakti-pratikula-4', section: 'bhakti-pratikula-bhava-varjanangikara', url: 'https://bhaktivinodainstitute.org/bhakti-pratikula-bhava-varjana%e1%b9%85gikara-song-four/', titleOverride: 'āmi to’ swānanda-sukhada-bāsī' },

  { slug: 'svikara-1', section: 'svikara', url: 'https://bhaktivinodainstitute.org/svikara-song-one/' },
  { slug: 'svikara-2', section: 'svikara', url: 'https://bhaktivinodainstitute.org/svikara-song-two/' },
  { slug: 'svikara-3', section: 'svikara', url: 'https://bhaktivinodainstitute.org/svikara-song-three/' },
  { slug: 'svikara-4', section: 'svikara', url: 'https://bhaktivinodainstitute.org/svikara-song-four/' },

  { slug: 'bhajana-lalasa-1', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-one/' },
  { slug: 'bhajana-lalasa-2', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-two/' },
  { slug: 'bhajana-lalasa-3', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-three/' },
  { slug: 'bhajana-lalasa-4', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-four/' },
  { slug: 'bhajana-lalasa-5', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-five/' },
  { slug: 'bhajana-lalasa-6', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-six/' },
  { slug: 'bhajana-lalasa-7', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-seven/' },
  { slug: 'bhajana-lalasa-8', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-eight/' },
  { slug: 'bhajana-lalasa-9', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-nine/' },
  { slug: 'bhajana-lalasa-10', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-ten/' },
  { slug: 'bhajana-lalasa-11', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-eleven/' },
  { slug: 'bhajana-lalasa-12', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-twelve/' },
  { slug: 'bhajana-lalasa-13', section: 'bhajana-lalasa', url: 'https://bhaktivinodainstitute.org/bhajana-lalasa-song-thirteen/' },

  { slug: 'siddhi-lalasa-1', section: 'siddhi-lalasa', url: 'https://bhaktivinodainstitute.org/siddhi-lalasa-song-one/' },
  { slug: 'siddhi-lalasa-2', section: 'siddhi-lalasa', url: 'https://bhaktivinodainstitute.org/siddhi-lalasa-song-two/' },
  { slug: 'siddhi-lalasa-3', section: 'siddhi-lalasa', url: 'https://bhaktivinodainstitute.org/siddhi-lalasa-song-three/' },

  { slug: 'vijnapti', section: 'vijnapti-nama-mahatmya', url: 'https://bhaktivinodainstitute.org/vijnapti/' },
  { slug: 'nama-mahatmya', section: 'vijnapti-nama-mahatmya', url: 'https://bhaktivinodainstitute.org/sri-nama-mahatmya/' },
]
