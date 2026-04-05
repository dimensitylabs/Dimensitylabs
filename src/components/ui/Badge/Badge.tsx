import { type BadgeProps } from './Badge.types'
import { cn } from '@/lib/cn'

const variantStyles: Record<string, string> = {
  'filled-black': 'bg-smoky-black text-floral-white',
  'filled-olive': 'bg-olive-drab text-floral-white',
  'filled-bone': 'bg-bone text-smoky-black',
  outline: 'bg-transparent border-half border-[var(--color-border)] text-[var(--color-text-primary)]',
  'ghost-light': 'bg-[rgba(255,251,244,0.85)] text-smoky-black',
}

function Badge({ variant = 'filled-bone', pill = false, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        'font-syne text-[10px] uppercase tracking-[0.12em]',
        'px-[12px] py-[5px]',
        pill ? 'rounded-pill' : 'rounded',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export { Badge }
