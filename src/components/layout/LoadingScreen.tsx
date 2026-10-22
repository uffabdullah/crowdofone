import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { getLenis } from '../../lib/smooth-scroll.ts'

/** Branded hold so the crowd has a moment to appear. Within the 3–5 second range. */
const LOAD_MS = 4000
const DOTS = 40

export function RouteLoading() {
  const { pathname } = useLocation()
  return <LoadingHold key={pathname} />
}

function LoadingHold() {
  const [show, setShow] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const next = Math.min(1, (now - started) / LOAD_MS)
      setProgress(next)
      if (next < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    const timer = window.setTimeout(() => setShow(false), LOAD_MS)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!show) return
    getLenis()?.stop()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
      getLenis()?.start()
    }
  }, [show])

  const lit = Math.round(progress * DOTS)

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading CrowdOfOne"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#070807] px-6"
        >
          <div className="flex w-full max-w-md flex-col items-center text-center">
            <p className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_#76B900]" />
              CrowdOfOne
            </p>
            <p className="mt-6 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Getting the crowd ready
            </p>
            <p className="mt-3 text-sm text-muted">A few seconds, then the page.</p>
            <div className="mt-8 grid grid-cols-10 gap-2" aria-hidden="true">
              {Array.from({ length: DOTS }, (_, index) => (
                <span
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-150 ${
                    index < lit
                      ? 'bg-accent shadow-[0_0_10px_rgba(118,185,0,0.8)]'
                      : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
