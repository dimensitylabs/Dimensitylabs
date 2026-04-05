import Link from 'next/link'
import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
  showTagline?: boolean
}

function Logo({ className, showTagline = true }: LogoProps) {
  return (
    <Link href="/" className={cn('flex flex-col', className)}>
      <span className="font-cormorant font-light text-[20px] leading-none text-[var(--color-text-primary)]">
        Dimensity<span className="italic text-[var(--color-text-secondary)]">labs</span>
      </span>
      {showTagline && (
        <span className="font-syne text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
          Digital Product Studio
        </span>
      )}
    </Link>
  )
}

export { Logo }
