import type { ReactNode } from 'react'

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs tracking-[0.14em] text-balance text-accent uppercase sm:tracking-[0.18em]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{children}</p>
      ) : null}
    </div>
  )
}
