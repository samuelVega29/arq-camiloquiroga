export default function SectionHeading({ index, label, title, intro, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="eyebrow flex items-center gap-3">
        <span className="h-px w-8 bg-copper" aria-hidden="true" />
        {index} / {label}
      </p>
      <h2 className="display-title mt-6 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {intro ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  )
}
