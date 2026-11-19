export default function Reveal({ children, className = '', delay = 0, rangeEnd = 45 }) {
  const start = Math.min(delay / 8, 20)
  const end = Math.max(start + 15, rangeEnd)

  return (
    <div
      className={`reveal ${className}`}
      style={{ '--reveal-range': `entry ${start}% entry ${end}%` }}
    >
      {children}
    </div>
  )
}
