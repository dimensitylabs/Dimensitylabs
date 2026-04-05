import { cn } from '@/lib/cn'
import { type ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  accent?: boolean
  className?: string
}

function SectionLabel({ children, accent = false, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-md', className)}>
      {accent && (
        <span className="block w-[2px] h-[16px] bg-olive-drab" />
      )}
      <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
        {children}
      </span>
    </div>
  )
}

export { SectionLabel }
