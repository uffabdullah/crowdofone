import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal.tsx'

export function FinalCta() {
  return (
    <section className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="rounded-3xl border border-accent/25 bg-[radial-gradient(ellipse_at_top,rgba(118,185,0,0.16),transparent_58%)] px-6 py-16 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-medium tracking-tight text-balance text-ink sm:text-5xl">
              Put the pitch in front of a crowd before you put money behind it.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Paste what you already have. See the objections, the confusion, and who would pay.
            </p>
            <Link
              to="/demo"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#081000] shadow-[0_0_28px_rgba(118,185,0,0.28)] transition hover:bg-[#8ed000]"
            >
              Try the simulator
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
