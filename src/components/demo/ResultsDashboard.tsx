import { useState } from 'react'
import { useEffect } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCount } from '../../content/stats.ts'
import { Tilt } from '../ui/Tilt.tsx'
import type { SimulateResult } from '../../lib/types.ts'

const tooltipStyle = {
  background: '#121512',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  color: '#f4f6f1',
  fontSize: 13,
}

const tick = { fill: '#c5cec0', fontSize: 12, fontFamily: 'JetBrains Mono, ui-monospace, monospace' }

function useNarrow() {
  const query = '(max-width: 639px)'
  const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setNarrow(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return narrow
}

const stanceLabel = {
  interested: 'Interested',
  unsure: 'Unsure',
  skeptical: 'Skeptical',
} as const

const stanceDot = {
  interested: 'bg-accent',
  unsure: 'bg-white/55',
  skeptical: 'bg-white/25',
} as const

function SummaryCard({
  value,
  label,
  caption,
  accent = false,
}: {
  value: string
  label: string
  caption: string
  accent?: boolean
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-3 font-mono text-4xl ${accent ? 'text-accent' : 'text-ink'}`}>{value}</p>
      <p className="mt-2 text-sm text-muted">{caption}</p>
    </article>
  )
}

export function ResultsDashboard({ result }: { result: SimulateResult }) {
  const narrow = useNarrow()
  const peak = Math.max(...result.segments.map((segment) => segment.interest))

  return (
    <div className="mt-12">
      <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">{result.audienceLabel}</p>
      <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {formatCount(result.crowdSize)} personas
      </h2>
      <p className="mt-2 text-sm text-muted">Reading &ldquo;{result.excerpt}&rdquo;</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <SummaryCard
          accent
          value={String(result.interestScore)}
          label="Interest"
          caption="Wanted to hear more, out of 100"
        />
        <SummaryCard
          value={`${result.wouldPayPercent}%`}
          label="Would pay"
          caption="Said they would pay something"
        />
        <SummaryCard
          value={`${result.confusedPercent}%`}
          label="Confused"
          caption="Could not explain the product back"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:col-span-3">
          <h3 className="font-display text-xl font-medium text-ink">Top objections</h3>
          <p className="mt-1 text-sm text-muted">How many personas raised each one first.</p>
          <div className="mt-4 h-72 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              {narrow ? (
                <BarChart data={result.objections} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis dataKey="label" tick={tick} axisLine={false} tickLine={false} interval={0} />
                  <YAxis tick={tick} axisLine={false} tickLine={false} width={40} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                    contentStyle={tooltipStyle}
                    formatter={(value) => [formatCount(Number(value)), 'Personas']}
                  />
                  <Bar dataKey="count" name="Personas" fill="#76B900" radius={[6, 6, 0, 0]} maxBarSize={36} />
                </BarChart>
              ) : (
                <BarChart
                  data={result.objections}
                  layout="vertical"
                  margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={tick}
                    axisLine={false}
                    tickLine={false}
                    width={108}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                    contentStyle={tooltipStyle}
                    formatter={(value) => [formatCount(Number(value)), 'Personas']}
                  />
                  <Bar dataKey="count" name="Personas" fill="#76B900" radius={[0, 6, 6, 0]} barSize={16} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-3">
            {result.objections.map((item) => (
              <li key={item.label} className="flex gap-3 text-sm">
                <span className="w-24 shrink-0 font-mono text-xs text-accent">{item.label}</span>
                <span className="text-muted">{item.detail}</span>
                <span className="ml-auto shrink-0 font-mono text-xs text-ink/70">
                  {formatCount(item.count)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:col-span-2">
          <h3 className="font-display text-xl font-medium text-ink">Confusion points</h3>
          <p className="mt-1 text-sm text-muted">Where a persona could not follow the pitch.</p>
          <ul className="mt-5 space-y-5">
            {result.confusionPoints.map((point) => (
              <li key={point.title}>
                <h4 className="text-sm font-medium text-ink">{point.title}</h4>
                <blockquote className="mt-2 border-l border-accent/60 pl-3 text-sm leading-relaxed text-muted">
                  {point.quote}
                </blockquote>
                <p className="mt-2 font-mono text-xs text-ink/60">{point.persona}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <h3 className="font-display text-xl font-medium text-ink">{result.segmentTitle}</h3>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Interest means they wanted to hear more. It is not the same as saying they would pay.
        </p>
        <div className="mt-4 h-64 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={result.segments} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="label" tick={tick} axisLine={false} tickLine={false} interval={0} />
              <YAxis domain={[0, 100]} tick={tick} axisLine={false} tickLine={false} width={36} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                contentStyle={tooltipStyle}
                formatter={(value) => [String(value), 'Interest']}
              />
              <Bar dataKey="interest" name="Interest" radius={[6, 6, 0, 0]} maxBarSize={56}>
                {result.segments.map((segment) => (
                  <Cell
                    key={segment.label}
                    fill={segment.interest === peak ? '#76B900' : 'rgba(118,185,0,0.38)'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="font-display text-xl font-medium text-ink">Sample reactions</h3>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Six simulated personas from this crowd. These are not quotes from real customers.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.reactions.map((persona) => (
            <Tilt key={persona.name} className="h-full [perspective:900px]">
            <article
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-display text-lg font-medium text-ink">{persona.name}</h4>
                  <p className="mt-1 text-sm text-muted">
                    {persona.age} · {persona.background}
                  </p>
                </div>
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-muted uppercase">
                  <span className={`h-2 w-2 rounded-full ${stanceDot[persona.stance]}`} />
                  {stanceLabel[persona.stance]}
                </p>
              </div>
              <p className="mt-4 border-l border-white/15 pl-3 text-sm leading-relaxed text-ink/85">
                {persona.reaction}
              </p>
            </article>
            </Tilt>
          ))}
        </div>
      </section>
    </div>
  )
}
