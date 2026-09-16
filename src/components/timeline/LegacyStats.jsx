import Reveal, { Counter } from '../Reveal.jsx'
import { stats } from '../../data/timeline.js'

/** Four counters that sum up a life of service. Numbers rise as they enter view. */
export default function LegacyStats() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <Reveal
          key={stat.label}
          delay={i * 90}
          className="glass rounded-2xl p-6 text-center sm:text-left"
        >
          <p className="font-serif text-5xl font-semibold leading-none tabular-nums gold-text">
            <Counter value={stat.value} suffix={stat.suffix} />
          </p>
          <p className="mt-3 text-sm leading-relaxed text-night-300">{stat.label}</p>
        </Reveal>
      ))}
    </div>
  )
}
