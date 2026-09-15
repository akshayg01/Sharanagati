// Small decorative marks used throughout the site.

export function LotusMark({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="lotusg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffc06d" />
          <stop offset="1" stopColor="#db4d7d" />
        </linearGradient>
      </defs>
      <g fill="url(#lotusg)">
        <path d="M32 6c-3 8-3 16 0 24 3-8 3-16 0-24z" />
        <path
          d="M32 30c-6-6-13-9-21-9 3 9 10 15 21 18 11-3 18-9 21-18-8 0-15 3-21 9z"
          opacity=".85"
        />
        <path
          d="M32 30C24 26 15 25 8 27c5 8 14 12 24 12s19-4 24-12c-7-2-16-1-24 3z"
          opacity=".55"
        />
        <path
          d="M12 22c2 8 9 14 20 16 11-2 18-8 20-16-8 0-15 4-20 10-5-6-12-10-20-10z"
          opacity=".4"
        />
      </g>
    </svg>
  )
}

export function Divider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-saffron-400/60" />
      <LotusMark className="h-5 w-5 opacity-80" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-saffron-400/60" />
    </div>
  )
}
