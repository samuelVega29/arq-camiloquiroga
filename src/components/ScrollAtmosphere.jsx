import { useEffect, useRef } from 'react'

export default function ScrollAtmosphere({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.setProperty('--scroll', '0.5')
      return
    }

    let frame = 0
    let visible = false

    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const progress = Math.min(
        1,
        Math.max(0, (viewport - rect.top) / (rect.height + viewport)),
      )
      node.style.setProperty('--scroll', progress.toFixed(3))
    }

    const requestUpdate = () => {
      if (!visible || frame) return
      frame = window.requestAnimationFrame(update)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) {
          requestUpdate()
        } else {
          if (frame) window.cancelAnimationFrame(frame)
          frame = 0
          node.style.setProperty('--scroll', '0.5')
        }
      },
      { rootMargin: '10% 0px' },
    )

    observer.observe(node)
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <div ref={ref} className="atmosphere relative overflow-clip">
      <div className="atmosphere-glow" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
