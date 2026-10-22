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
          <nav aria-label="Social" className="mt-4 grid gap-4 sm:grid-cols-3">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block max-w-full transition-colors hover:text-accent"
              >
                <span className="text-sm text-ink">{item.label}</span>
                <span className="mt-1 block break-all font-mono text-xs text-muted">{item.href}</span>
              </a>
            ))}
          </nav>
        </div>
        <p className="font-mono text-xs text-muted">2026</p>
      </div>
    </footer>
  )
}
