import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CrowdIcon, InsightIcon, PasteIcon } from '../icons.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    title: 'Paste your idea',
    body: 'Drop in a pitch, the text from a landing page, or a plain description. There is no survey to design.',
    icon: PasteIcon,
  },
  {
    title: 'A diverse crowd reacts',
    body: 'Thousands of personas, with different ages, jobs, and budgets, read it at the same time. The GPU runs them in parallel.',
    icon: CrowdIcon,
  },
  {
    title: 'Get clear insights',
    body: 'You see the objections that keep coming back, the lines people cannot parse, and which groups would pay.',
    icon: InsightIcon,
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const marker = markerRef.current
    if (!section || !marker) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        marker,
        { left: '1.5rem' },
        {
          left: 'calc(66.666% + 2.833rem)',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            end: 'bottom 55%',
            scrub: 0.5,
          },
        },
      )
      gsap.from('li', {
        y: 40,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="How it works" title="From a paragraph to a crowd, in one sitting.">
          Three steps. No panel to recruit and no script to write.
        </SectionHeading>
        <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="absolute top-6 hidden h-px bg-white/35 md:block"
            style={{ left: '1.5rem', width: 'calc(66.666% + 1.333rem)' }}
          />
          <div
            ref={markerRef}
            aria-hidden="true"
            className="absolute top-[18px] left-6 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_16px_#76B900] md:block"
          />
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <li key={step.title} className="relative">
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#070807] font-mono text-sm text-accent">
                  0{index + 1}
                </div>
                <div className="mt-6 text-accent">
                  <Icon />
                </div>
                <h3 className="mt-3 font-display text-xl font-medium text-ink">{step.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
