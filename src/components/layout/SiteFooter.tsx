import { Link } from 'react-router-dom'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/nvmitszipler',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/uffabdullah',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdullahasgerali',
  },
]

function Heart() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="heart-glow h-4 w-4 text-accent"
    >
      <path
        fill="currentColor"
        d="M12 20.5s-6.6-4.2-9.1-7.9C1.1 10.1 1.4 6.6 3.9 5.1 5.7 4 8 4.4 9.4 6.1 10.8 4.4 13.1 4 14.9 5.1c2.5 1.5 2.8 5 .1 7.5-2.5 3.7-9 7.9-9 7.9z"
      />
    </svg>
  )
}

function SocialIcon({ name }: { name: string }) {
  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    )
  }
  if (name === 'GitHub') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
        <path d="M12 2.2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86v2.76c0 .26.18.58.69.48A10 10 0 0 0 12 2.2z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M4.7 3.3A2.2 2.2 0 0 0 2.5 5.5v13a2.2 2.2 0 0 0 2.2 2.2h13a2.2 2.2 0 0 0 2.2-2.2v-13a2.2 2.2 0 0 0-2.2-2.2h-13zM8.2 18.2H5.7V9.6h2.5v8.6zM6.95 8.5a1.45 1.45 0 1 1 0-2.9 1.45 1.45 0 0 1 0 2.9zM18.3 18.2h-2.5v-4.2c0-1-.02-2.3-1.4-2.3-1.4 0-1.62 1.1-1.62 2.22v4.28H10.3V9.6h2.4v1.18h.03c.33-.63 1.15-1.3 2.37-1.3 2.54 0 3.01 1.67 3.01 3.84v4.88z" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <Link to="/" className="font-display text-lg font-semibold text-ink">
            CrowdOfOne
          </Link>
          <p className="mt-1 max-w-md text-sm text-muted">
            A synthetic audience simulator for founders, students, and small teams.
          </p>
          <p className="mt-4 flex flex-wrap items-center text-sm text-ink">
            <span>Made with love</span>
            <span className="ml-1.5 inline-flex">
              <Heart />
            </span>
            <span>
              , by <span className="font-medium">Abdullah Asger Ali</span>
            </span>
          </p>
          <nav aria-label="Social" className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-accent"
              >
                <SocialIcon name={item.label} />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="font-mono text-xs text-muted">2026</p>
      </div>
    </footer>
  )
}
