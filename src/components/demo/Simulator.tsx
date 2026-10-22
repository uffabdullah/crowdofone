import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ChevronIcon } from '../icons.tsx'
import { ResultsDashboard } from './ResultsDashboard.tsx'
import { CROWD_SIZE, formatCount } from '../../content/stats.ts'
import { simulate } from '../../lib/simulate.ts'
import { scrollToTarget } from '../../lib/smooth-scroll.ts'
import { AUDIENCES, isAudienceId, type AudienceId, type SimulateResult } from '../../lib/types.ts'

const CELLS = 100

function isAbort(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

export function Simulator() {
  const [text, setText] = useState('')
  const [audience, setAudience] = useState<AudienceId>('college')
  const [error, setError] = useState<string | null>(null)
  const [phase, setPhase] = useState<'form' | 'running' | 'done'>('form')
  const [responded, setResponded] = useState(0)
  const [result, setResult] = useState<SimulateResult | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const runRef = useRef(0)
  const statusRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  useEffect(() => {
    if (phase === 'running' && statusRef.current) scrollToTarget(statusRef.current)
    if (phase === 'done' && resultsRef.current) scrollToTarget(resultsRef.current)
  }, [phase])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const pitch = text.trim()
    if (!pitch) {
      setError('Paste a pitch or description first. An empty box does not give the crowd anything to react to.')
      return
    }

    setError(null)
    setResult(null)
    setResponded(0)
    setPhase('running')
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const runId = runRef.current + 1
    runRef.current = runId

    try {
      const next = await simulate(
        { text: pitch, audience },
        {
          signal: controller.signal,
          onProgress: (count) => {
            if (runRef.current === runId) setResponded(count)
          },
        },
      )
      if (runRef.current !== runId) return
      setResult(next)
      setPhase('done')
    } catch (caught) {
      if (isAbort(caught) || runRef.current !== runId) return
      setPhase('form')
      setError('The crowd did not finish. Try again in a moment.')
    }
  }

  const litCount = Math.round((responded / CROWD_SIZE) * CELLS)

  return (
    <div className="mt-10">
      <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
        <div>
          <label htmlFor="pitch" className="text-sm font-medium text-ink">
            Paste your pitch, landing page copy, or app description
          </label>
          <textarea
            id="pitch"
            value={text}
            rows={8}
            disabled={phase === 'running'}
            placeholder="Northwind is a shared grocery list for off-campus houses. It tracks who bought the milk and settles up every Sunday."
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'pitch-error' : 'pitch-note'}
            onChange={(event) => {
              setText(event.target.value)
              if (error) setError(null)
            }}
            className="mt-3 min-h-48 w-full resize-y rounded-2xl border border-white/10 bg-[#101210] px-4 py-4 text-base leading-relaxed text-ink outline-none placeholder:text-white/30 focus:border-accent"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="audience" className="text-sm font-medium text-ink">
            Who should react
          </label>
          <div className="relative mt-3 sm:max-w-sm">
            <select
              id="audience"
              value={audience}
              disabled={phase === 'running'}
              onChange={(event) => {
                if (isAudienceId(event.target.value)) setAudience(event.target.value)
              }}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-[#101210] px-4 py-3 pr-12 text-base text-ink outline-none focus:border-accent disabled:opacity-60"
            >
              {AUDIENCES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted">
              <ChevronIcon />
            </span>
          </div>
        </div>

        {error ? (
          <p id="pitch-error" role="alert" className="mt-4 text-sm text-[#ffb4b4]">
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={phase === 'running'}
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#081000] shadow-[0_0_24px_rgba(118,185,0,0.22)] transition hover:bg-[#8ed000] disabled:cursor-progress disabled:opacity-70"
          >
            {phase === 'running' ? 'Simulating...' : 'Simulate crowd'}
          </button>
          <p id="pitch-note" className="max-w-md text-xs leading-relaxed text-muted">
            Preview mode uses a sample crowd shaped by your text and the audience you pick. It is not a live GPU run.
          </p>
        </div>

        {result && audience !== result.audience && phase === 'done' ? (
          <p className="mt-4 text-sm text-muted">Audience changed. Simulate again to refresh the readout.</p>
        ) : null}
      </form>

      {phase === 'running' ? (
        <div
          ref={statusRef}
          id="simulation-status"
          role="status"
          aria-live="polite"
          className="scroll-mt-28 mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-5 pb-10 sm:p-8 sm:pb-12"
        >
          <h2 className="font-display text-2xl font-medium text-ink">The crowd is reading</h2>
          <p className="mt-4 font-mono text-lg text-ink tabular-nums sm:text-2xl">
            {formatCount(responded)} / {formatCount(CROWD_SIZE)} personas responded
          </p>
          <div
            className="mt-6 grid max-w-3xl grid-cols-10 gap-x-2 gap-y-3 sm:grid-cols-[repeat(20,minmax(0,1fr))]"
            aria-hidden="true"
          >
            {Array.from({ length: CELLS }, (_, index) => {
              const on = index < litCount
              return (
                <span key={index} className="flex items-center justify-center">
                  <span
                    className={`h-3 w-3 rounded-full transition-colors duration-150 ${
                      on ? 'bg-accent shadow-[0_0_12px_rgba(118,185,0,0.85)]' : 'bg-white/30'
                    }`}
                  />
                </span>
              )
            })}
          </div>
        </div>
      ) : null}

      {phase === 'done' && result ? (
        <div ref={resultsRef} id="results" className="scroll-mt-28">
          <ResultsDashboard
            key={`${result.audience}-${result.excerpt}-${result.interestScore}`}
            result={result}
          />
        </div>
      ) : null}
    </div>
  )
}
