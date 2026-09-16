// Scroll-reveal primitives built on IntersectionObserver — no animation library,
// and fully disabled for readers who prefer reduced motion (see .reveal in index.css).

import { useEffect, useRef, useState } from 'react'

/** Returns [ref, hasEnteredView]. Fires once, then stops observing. */
export function useInView({ rootMargin = '0px 0px -10% 0px', threshold = 0.05 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    observer.observe(el)

    // Safety net: whatever happens to the observer (a deep link that jumps the
    // page, a browser that throttles callbacks), the words must never stay hidden.
    const failsafe = setTimeout(() => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) setInView(true)
    }, 1200)

    return () => {
      clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [rootMargin, threshold])

  return [ref, inView]
}

/**
 * Fades and lifts its children into view.
 *   <Reveal as="li" delay={80}>…</Reveal>
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** A number that counts up the first time it is scrolled into view. */
export function Counter({ value, suffix = '', duration = 1600, className = '' }) {
  const [ref, inView] = useInView({ rootMargin: '0px 0px -15% 0px' })
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!inView) return

    const reduced =
      typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setShown(value)
      return
    }

    let frame = 0
    let start = null
    const step = (now) => {
      if (start === null) start = now
      const t = Math.min((now - start) / duration, 1)
      // easeOutExpo — fast out of the gate, a long settle.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setShown(Math.round(value * eased))
      if (t < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)

    // However the animation goes, the number must end on the real figure.
    const settle = setTimeout(() => setShown(value), duration + 400)

    return () => {
      clearTimeout(settle)
      cancelAnimationFrame(frame)
    }
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {shown.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
