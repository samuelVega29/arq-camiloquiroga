export default function Reveal({ children, className = '', delay = 0 }) {
  const start = Math.min(delay / 8, 20)

  return (
    <div
      className={`reveal ${className}`}
      style={{ '--reveal-range': `entry ${start}% entry ${start + 45}%` }}
    >
      {children}
    </div>
  )
}
