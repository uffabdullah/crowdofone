import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link to="/" className="font-display text-lg font-semibold text-ink">
            CrowdOfOne
          </Link>
          <p className="mt-1 max-w-md text-sm text-muted">
            A synthetic audience simulator for founders, students, and small teams.
          </p>
        </div>
        <p className="font-mono text-xs text-muted">2026</p>
      </div>
    </footer>
  )
}
