import { Simulator } from '../components/demo/Simulator.tsx'

export default function DemoPage() {
  return (
    <main id="content" className="px-5 pt-28 pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Demo</p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight text-balance text-ink sm:text-5xl">
          Run a crowd on your idea
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Paste what you would show a stranger. Choose who should react. In a few seconds you get
          the kind of readout CrowdOfOne is built to produce: objections, confusion, and who would pay.
        </p>
        <Simulator />
      </div>
    </main>
  )
}
