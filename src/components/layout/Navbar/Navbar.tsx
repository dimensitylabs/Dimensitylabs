'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { NavLinks } from './NavLinks'
import { MobileMenu } from './MobileMenu'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollDirection = useScrollDirection()
  const isMobile = useMediaQuery('(max-width: 767px)')

  const hidden = isMobile && scrollDirection === 'down' && !menuOpen

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40',
          'h-[56px] md:h-[64px]',
          'bg-[var(--color-bg)]',
          'border-b border-half border-[var(--color-border)]',
          'transition-transform duration-slow ease-in-out',
          hidden && '-translate-y-full'
        )}
      >
        <div className="mx-auto w-full max-w-container px-md md:px-lg h-full flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex flex-col">
            <span className="font-cormorant font-light text-[20px] leading-none text-[var(--color-text-primary)]">
              Dimensity<span className="italic text-[var(--color-text-secondary)]">labs</span>
            </span>
            <span className="font-syne text-[9px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
              Digital Product Studio
            </span>
          </Link>

          {/* Desktop Nav */}
          <NavLinks />

          {/* Right side: CTA + Hamburger */}
          <div className="flex items-center gap-md">
            <Link
              href="/contact"
              className={cn(
                'hidden md:inline-flex items-center justify-center',
                'font-syne text-[11px] uppercase tracking-[0.14em]',
                'px-[28px] py-[13px] rounded min-h-[44px]',
                'bg-[var(--color-accent)] text-[var(--color-accent-text)]',
                'transition-transform duration-fast hover:scale-[1.02]'
              )}
            >
              Start a Project
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="md:hidden p-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                className="text-[var(--color-text-primary)]"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="16" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Spacer to offset fixed header */}
      <div className="h-[56px] md:h-[64px]" />
    </>
  )
}

export { Navbar }
