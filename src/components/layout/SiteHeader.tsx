import { Link, useLocation } from 'react-router-dom'
import { scrollToTop } from '../../lib/smooth-scroll.ts'

export function SiteHeader() {
  const { pathname } = useLocation()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070807]/80 backdrop-blur-md">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#081000]"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
          onClick={() => {
            if (pathname === '/') scrollToTop()
          }}
        >
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_#76B900]" />
          CrowdOfOne
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6" aria-label="Primary">
          <Link
            to="/#how-it-works"
            className="hidden text-sm text-muted transition-colors hover:text-ink min-[480px]:inline"
          >
            How it works
          </Link>
          <Link
            to="/#features"
            className="hidden text-sm text-muted transition-colors hover:text-ink sm:inline"
          >
            Features
          </Link>
          <Link
            to="/demo"
            className="rounded-full bg-accent px-3 py-2 text-sm font-semibold text-[#081000] shadow-[0_0_24px_rgba(118,185,0,0.22)] transition hover:bg-[#8ed000] sm:px-4"
          >
            <span className="sm:hidden">Try it</span>
            <span className="hidden sm:inline">Try the simulator</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
