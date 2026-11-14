import type { SVGProps } from "react"

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

const SPARKLE = "M12 0C12.8 7 17 11.2 24 12 17 12.8 12.8 17 12 24 11.2 17 7 12.8 0 12 7 11.2 11.2 7 12 0Z"

/** Brilho de 4 pontas em degradê (logo / decoração). */
export function Sparkle({ id, from = "#C9B8FF", to = "#6A2BE8", className }: { id: string; from?: string; to?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={SPARKLE} fill={`url(#${id})`} />
    </svg>
  )
}

export function SparkleSolid({ className, fill = "#F4F000", stroke = "#16122B" }: { className?: string; fill?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={SPARKLE} fill={fill} stroke={stroke} strokeWidth=".8" />
    </svg>
  )
}

export function HeartY2K({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 22" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF6A8" />
          <stop offset=".35" stopColor="#FF9BE0" />
          <stop offset=".7" stopColor="#9FD4FF" />
          <stop offset="1" stopColor="#A88BFF" />
        </linearGradient>
      </defs>
      <path d="M12 21.5C5 16.6 1 12.7 1 7.6 1 4 3.8 1.3 7.2 1.3c2 0 3.8 1 4.8 2.6 1-1.6 2.8-2.6 4.8-2.6 3.4 0 6.2 2.7 6.2 6.3 0 5.1-4 9-11 13.9z" fill={`url(#${id})`} stroke="#FFFFFF" strokeWidth=".7" />
      <ellipse cx="7" cy="6.2" rx="2.4" ry="1.3" fill="#FFFFFF" opacity=".85" transform="rotate(-30 7 6.2)" />
    </svg>
  )
}

export function FolderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 16" aria-hidden="true" className={className}>
      <path d="M1 3h7l2 2h9v10H1z" fill="#F4F000" stroke="#16122B" strokeWidth="1.1" />
      <path d="M1 7h18" stroke="#16122B" strokeWidth=".9" />
    </svg>
  )
}

export function ColorStar({ hex, className }: { hex: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6l-6.4 3.5L7 14l-5.3-5 7.2-.9z" fill={hex} stroke="#16122B" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}
