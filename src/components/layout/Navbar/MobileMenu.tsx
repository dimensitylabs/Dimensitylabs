'use client'

import { useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import { navLinks } from './Navbar.types'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 md:hidden',
        'bg-[var(--color-bg)]',
        'flex flex-col items-center justify-center',
        'transition-transform duration-slow ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
      aria-hidden={!isOpen}
    >
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-md right-md p-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <nav className="flex flex-col items-center gap-lg">
        {navLinks.map((link) => {
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'font-syne text-[10px] uppercase tracking-[0.18em]',
                'transition-opacity duration-slow',
                isActive
                  ? 'opacity-100 text-[var(--color-text-primary)]'
                  : 'opacity-60 text-[var(--color-text-secondary)] hover:opacity-100'
              )}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export { MobileMenu }
