import Link from 'next/link'
import { cn } from '@/lib/cn'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-sm', className)}>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-sm">
          {index > 0 && (
            <span className="font-syne text-[10px] text-[var(--color-text-muted)]">/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="font-syne text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-slow"
            >
              {item.label}
            </Link>
          ) : (
            <span
              aria-current="page"
              className="font-syne text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-primary)]"
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}

export { Breadcrumb }
