import { useEffect, useRef, useState } from 'react'
import { OFFICIAL_CHANNELS } from '../data/audio.js'

function fmt(t) {
  if (!t || Number.isNaN(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

// Custom player for a direct/local MP3 source.
function NativePlayer({ src, title }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [cur, setCur] = useState(0)
  const [dur, setDur] = useState(0)

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setCur(a.currentTime)
    const onMeta = () => setDur(a.duration)
    const onEnd = () => setPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play()
      setPlaying(true)
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  const seek = (e) => {
    const a = audioRef.current
    if (!a || !dur) return
    a.currentTime = (Number(e.target.value) / 100) * dur
  }

  const pct = dur ? (cur / dur) * 100 : 0

  return (
    <div className="glass rounded-2xl p-4">
      <audio ref={audioRef} src={src} preload="metadata" />
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-to-br from-saffron-400 to-lotus-600 text-white shadow-lg shadow-lotus-600/30 transition-transform hover:scale-105 active:scale-95"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
          ) : (
            <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <div className="min-w-0 flex-1">
          <p className="mb-1.5 truncate text-sm text-night-200">{title}</p>
          <input
            type="range"
            min="0"
            max="100"
            value={pct}
            onChange={seek}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-saffron-400"
            style={{
              background: `linear-gradient(to right, #ff9a33 ${pct}%, rgba(255,255,255,0.1) ${pct}%)`,
            }}
          />
          <div className="mt-1 flex justify-between text-xs tabular-nums text-night-400">
            <span>{fmt(cur)}</span>
            <span>{fmt(dur)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function YouTubePlayer({ src, start = 0, title }) {
  const q = start ? `?start=${start}` : ''
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="aspect-video">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${src}${q}`}
          title={title || 'Recording by Bhakti Charu Swami Maharaja'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

function SoundCloudPlayer({ src }) {
  const embed = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    src
  )}&color=%23ff7d0b&auto_play=false&hide_related=true&show_comments=false&show_reposts=false&visual=false`
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <iframe
        className="w-full"
        height="120"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        title="SoundCloud recording"
        src={embed}
      />
    </div>
  )
}

function ComingSoon() {
  return (
    <div className="glass rounded-2xl p-5 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/5">
        <svg className="h-5 w-5 text-saffron-300" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l11-2v13M9 19a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>
      <p className="text-sm text-night-200">
        Maharaja’s recording of this song will be added here.
      </p>
      <p className="mt-1 text-xs text-night-400">
        Listen to his bhajans meanwhile on his official channels:
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <a href={OFFICIAL_CHANNELS.soundcloud} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-night-200 transition-colors hover:border-saffron-400/40 hover:text-saffron-300">SoundCloud</a>
        <a href={OFFICIAL_CHANNELS.appleMusic} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-night-200 transition-colors hover:border-saffron-400/40 hover:text-saffron-300">Apple Music</a>
        <a href={OFFICIAL_CHANNELS.youtube} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-night-200 transition-colors hover:border-saffron-400/40 hover:text-saffron-300">YouTube</a>
      </div>
    </div>
  )
}

export default function AudioPlayer({ audio, title }) {
  if (!audio) return <ComingSoon />
  if (audio.type === 'youtube')
    return <YouTubePlayer src={audio.src} start={audio.start} title={audio.title || title} />
  if (audio.type === 'soundcloud') return <SoundCloudPlayer src={audio.src} />
  return <NativePlayer src={audio.src} title={audio.title || title} />
}
