import { Reveal } from '../ui/Reveal.tsx'

export function Limits() {
  return (
    <section id="limits" className="px-5 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="rounded-3xl border border-white/10 border-l-accent bg-white/[0.03] p-8 sm:p-12 md:border-l-2">
            <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Honest limits</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl">
              It finds blind spots early. It does not replace talking to real people.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              CrowdOfOne is a fast read on a pitch across a wide crowd. It will miss local context,
              a change in someone&apos;s voice, and the one person who would have said the sentence
              that changes the product. Use it before you spend. Then go talk to real users.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
