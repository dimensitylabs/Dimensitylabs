import { cn } from '@/lib/cn'
import { type ReactNode, forwardRef } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn('py-[clamp(64px,8vw,96px)]', className)}
      >
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export { Section }
