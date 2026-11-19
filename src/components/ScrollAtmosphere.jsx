import { useEffect, useRef } from 'react'

export default function ScrollAtmosphere({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.style.setProperty('--scroll', '0.35')
      return
    }

    let frame = 0

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
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <div ref={ref} className="atmosphere relative overflow-hidden">
      <div className="atmosphere-glow atmosphere-glow-a" aria-hidden="true" />
      <div className="atmosphere-glow atmosphere-glow-b" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
