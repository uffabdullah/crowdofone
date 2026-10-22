import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { formatCount, CROWD_SIZE, SPEED } from '../../content/stats.ts'

gsap.registerPlugin(ScrollTrigger)

export function Speed() {
  const sectionRef = useRef<HTMLElement>(null)
  const gpuRef = useRef<HTMLDivElement>(null)
  const sequentialRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const gpu = gpuRef.current
    const sequential = sequentialRef.current
    if (!section || !gpu || !sequential) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const bars = [gpu, sequential]
      if (reduce) {
        gsap.set(bars, { scaleX: 1 })
        return
      }
      gsap.fromTo(
        bars,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.15,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="speed" ref={sectionRef} className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Speed</p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-medium tracking-tight text-balance text-ink sm:text-5xl">
          <span className="font-mono text-accent">{formatCount(CROWD_SIZE)}</span> personas in{' '}
          {SPEED.gpuDuration} (GPU) vs. {SPEED.sequentialDuration} (sequential).
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
          Same crowd. The GPU runs them together. One at a time, the same pass takes {SPEED.sequentialDuration}.
        </p>

        <div className="mt-12 space-y-8" aria-hidden="true">
          <div>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="text-sm text-ink">GPU, in parallel</p>
              <p className="font-mono text-sm text-accent">{SPEED.gpuDuration}</p>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                ref={gpuRef}
                className="h-full origin-left rounded-full bg-accent shadow-[0_0_18px_rgba(118,185,0,0.45)]"
                style={{ width: `${SPEED.gpuBar}%` }}
              />
            </div>
          </div>
          <div>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <p className="text-sm text-ink">Sequential, one persona at a time</p>
              <p className="font-mono text-sm text-muted">{SPEED.sequentialDuration}</p>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <div
                ref={sequentialRef}
                className="h-full origin-left rounded-full bg-white/35"
                style={{ width: `${SPEED.sequentialBar}%` }}
              />
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          Time to finish the same {formatCount(CROWD_SIZE)} personas. Shorter is faster.
        </p>
      </div>
    </section>
  )
}
