import { useEffect, useRef, useState } from 'react'

const supportsScrollTimeline =
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('(animation-timeline: view()) and (animation-range: entry)')

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Reveal({
  children,
  className = '',
  delay = 0,
  rangeEnd = 45,
  scrollLinked = false,
}) {
  const elementRef = useRef(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [progress, setProgress] = useState(scrollLinked && !prefersReducedMotion ? 0 : 1)

  const useObserver = scrollLinked || !supportsScrollTimeline || prefersReducedMotion
  const useScrollProgress = scrollLinked && !prefersReducedMotion
  const start = Math.min(delay / 8, 20)
  const end = Math.max(start + 15, rangeEnd)

  useEffect(() => {
    if (!useObserver) return

    const element = elementRef.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      if (useScrollProgress) setProgress(1)
      else setIsRevealed(true)
      return
    }

    if (useScrollProgress) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setProgress(Math.min(1, entry.intersectionRatio / 0.45))
        },
        { threshold: Array.from({ length: 101 }, (_, index) => index / 100) },
      )

      observer.observe(element)
      return () => observer.disconnect()
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
  }, [useObserver, useScrollProgress])

  return (
    <div
      ref={elementRef}
      className={[
        'reveal',
        useObserver && 'reveal-observer',
        useScrollProgress && 'reveal-scroll',
        isRevealed && 'is-revealed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--reveal-range': `entry ${start}% entry ${end}%`,
        ...(useScrollProgress ? { '--reveal-progress': progress } : {}),
        ...(useObserver && !useScrollProgress ? { animationDelay: `${delay}ms` } : {}),
      }}
    >
      {children}
    </div>
  )
}
