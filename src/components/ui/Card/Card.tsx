import { type CardProps } from './Card.types'
import { cn } from '@/lib/cn'

const tierStyles: Record<string, string> = {
  default:
    'bg-[var(--color-surface)] border-half border-[var(--color-border)]',
  dark:
    'bg-smoky-black border-half border-[var(--color-border)] text-floral-white',
  tinted:
    'bg-bone border-transparent',
}

function Card({ tier = 'default', children, className }: CardProps) {
  return (
    <article
      className={cn(
        'rounded p-xl',
        'transition-colors duration-base',
        'hover:border-olive-drab',
        tierStyles[tier],
        className
      )}
    >
      {children}
    </article>
  )
}

export { Card }
