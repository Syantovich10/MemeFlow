import Link from "next/link"

export function BrandLogo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="ShortFinder home">
      <svg viewBox="0 0 28 32" className="size-6" aria-hidden="true">
        <defs>
          <linearGradient id="brand-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d77cff" />
            <stop offset="0.5" stopColor="#9855ff" />
            <stop offset="1" stopColor="#ff4a9b" />
          </linearGradient>
        </defs>
        <path
          d="M5 4.8c0-2 2.2-3.2 3.9-2.2l14.8 9.2c1.7 1.1 1.7 3.5 0 4.6L8.9 25.7C7.2 26.8 5 25.5 5 23.5V4.8Z"
          fill="none"
          stroke="url(#brand-gradient)"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[17px] font-bold tracking-[-0.02em]">
        Short<span className="text-primary">Finder</span>
      </span>
    </Link>
  )
}
