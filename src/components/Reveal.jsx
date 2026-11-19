import { useEffect, useRef, useState } from 'react'

const supportsScrollTimeline =
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('(animation-timeline: view()) and (animation-range: entry)')

export default function Reveal({ children, className = '', delay = 0, rangeEnd = 45 }) {
  const elementRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)

  const start = Math.min(delay / 8, 20)
  const end = Math.max(start + 15, rangeEnd)

  useEffect(() => {
    if (supportsScrollTimeline) return

    const element = elementRef.current
    if (!element) return

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setIsRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={['reveal', isRevealed && 'is-revealed', className].filter(Boolean).join(' ')}
      style={{
        '--reveal-range': `entry ${start}% entry ${end}%`,
        ...(supportsScrollTimeline ? {} : { animationDelay: `${delay}ms` }),
      }}
    >
      {children}
    </div>
  )
}
