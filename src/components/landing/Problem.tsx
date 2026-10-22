import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

const cards = [
  {
    title: 'No budget for focus groups',
    body: 'A moderated session with ten people can cost more than a month of runway. Most early teams skip research and hope the launch explains itself.',
  },
  {
    title: 'Slow feedback',
    body: 'Recruiting, scheduling, and incentives take weeks. The pattern shows up after the page is live and the ad budget is already spent.',
  },
  {
    title: 'Biased feedback from friends',
    body: 'Friends want you to succeed. They say “interesting” when they mean they would not pay, and they rarely offer the sentence that would have saved the launch.',
  },
]

export function Problem() {
  return (
    <section id="problem" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="The usual options"
          title="The feedback you can get today is late, kind, or too expensive."
        >
          Founders, students, and small teams still need a hard read on a pitch before they spend.
        </SectionHeading>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-accent/35">
                <p className="font-mono text-sm text-accent">0{index + 1}</p>
                <h3 className="mt-5 font-display text-xl font-medium text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
