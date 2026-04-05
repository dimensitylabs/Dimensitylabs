'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import { navLinks } from './Navbar.types'

function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-xl">
      {navLinks.map((link) => {
        const isActive = pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
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
  )
}

export { NavLinks }
