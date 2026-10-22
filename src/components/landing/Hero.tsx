import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { PersonaField } from './PersonaField.tsx'
import { scrollToTarget } from '../../lib/smooth-scroll.ts'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const content = contentRef.current
    if (!hero || !content) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.to(content, {
        y: -56,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, hero)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_74%_42%,rgba(118,185,0,0.16),transparent_46%)]" />
        <PersonaField />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.92)_0%,rgba(7,8,7,0.62)_32%,rgba(7,8,7,0.08)_62%,rgba(7,8,7,0.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#070807] to-transparent" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-5 pt-28 pb-20"
      >
        <p className="max-w-xs font-mono text-xs tracking-[0.14em] text-balance text-accent uppercase sm:max-w-none sm:tracking-[0.18em]">
          For founders, students, and small teams
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.35rem] leading-[1.08] font-medium tracking-[-0.03em] text-balance text-ink sm:text-5xl lg:text-[3.35rem]">
          Launching blind is expensive.{' '}
          <br className="hidden lg:block" />
          Test your idea on a crowd of thousands, first.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Paste a pitch, a landing page, or a short description, and a crowd of different people
          will show you the objections, the confusion, and who would actually pay.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/demo"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#081000] shadow-[0_0_28px_rgba(118,185,0,0.28)] transition hover:bg-[#8ed000]"
          >
            Try the simulator
          </Link>
          <button
            type="button"
            onClick={() => scrollToTarget('#how-it-works')}
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-ink transition hover:border-white/40"
          >
            See how it works
          </button>
        </div>
      </div>
    </section>
  )
}
