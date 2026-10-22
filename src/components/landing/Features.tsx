import { ChipIcon, ClusterIcon, CrowdIcon, PayIcon } from '../icons.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'
import { Tilt } from '../ui/Tilt.tsx'

const features = [
  {
    title: 'Diverse persona generation',
    body: 'The crowd is not twelve copies of one user. Personas differ in age, income, job, and how familiar they already are with your category.',
    icon: CrowdIcon,
  },
  {
    title: 'Parallel GPU simulation',
    body: 'Agents run at the same time instead of in a queue. A crowd of thousands finishes in about a minute, not an afternoon.',
    icon: ChipIcon,
  },
  {
    title: 'Objection and confusion clustering',
    body: 'Similar complaints are grouped. You see the pattern — price, trust, an unclear job — instead of a pile of one-off comments.',
    icon: ClusterIcon,
  },
  {
    title: 'Willingness-to-pay by segment',
    body: 'Interest and payment are not the same thing. The readout splits who likes the idea from who would take out a card, by group.',
    icon: PayIcon,
  },
]

export function Features() {
  return (
    <section id="features" className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="What you get" title="A readout you can act on before you spend.">
          Four things to use before you book a single interview.
        </SectionHeading>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.title} delay={index * 0.06} className="h-full [perspective:900px]">
                <Tilt className="h-full">
                <article className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20 sm:p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium text-ink">{feature.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">{feature.body}</p>
                </article>
                </Tilt>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
