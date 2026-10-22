import type { ReactNode } from 'react'

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5"
    >
      {children}
    </svg>
  )
}

export function PasteIcon() {
  return (
    <Glyph>
      <path d="M8 4.5h5.2L18 9.2V19a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z" />
      <path d="M13 4.5V9h4.5" />
    </Glyph>
  )
}

export function CrowdIcon() {
  return (
    <Glyph>
      <circle cx="8" cy="9" r="1.5" />
      <circle cx="12" cy="8" r="1.5" />
      <circle cx="16" cy="9" r="1.5" />
      <path d="M5.2 16.8c.7-1.7 1.8-2.5 2.8-2.5s2.1.8 2.7 2.5" />
      <path d="M9.2 16.8c.6-1.9 1.7-2.7 2.8-2.7s2.2.8 2.8 2.7" />
      <path d="M13.3 16.8c.6-1.7 1.6-2.5 2.6-2.5 1 0 1.9.8 2.6 2.5" />
    </Glyph>
  )
}

export function InsightIcon() {
  return (
    <Glyph>
      <path d="M9 7h10" />
      <path d="M9 12h10" />
      <path d="M9 17h6" />
      <path d="M4.5 7.2 5.7 8.4 7.6 6.2" />
      <path d="M4.5 12.2 5.7 13.4 7.6 11.2" />
      <path d="M4.5 17.2 5.7 18.4 7.6 16.2" />
    </Glyph>
  )
}

export function ChipIcon() {
  return (
    <Glyph>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M9 3.5V7M12 3.5V7M15 3.5V7" />
      <path d="M9 17v3.5M12 17v3.5M15 17v3.5" />
      <path d="M3.5 9H7M3.5 12H7M3.5 15H7" />
      <path d="M17 9h3.5M17 12h3.5M17 15h3.5" />
    </Glyph>
  )
}

export function ClusterIcon() {
  return (
    <Glyph>
      <circle cx="9" cy="10" r="2.6" />
      <circle cx="15" cy="10" r="2.6" />
      <circle cx="12" cy="14.5" r="2.6" />
    </Glyph>
  )
}

export function PayIcon() {
  return (
    <Glyph>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M3.5 10h17" />
      <path d="M15.2 14h2" />
    </Glyph>
  )
}

export function ChevronIcon() {
  return (
    <Glyph>
      <path d="m6 9 6 6 6-6" />
    </Glyph>
  )
}
