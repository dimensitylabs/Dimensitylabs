import { cn } from '@/lib/cn'

interface DividerProps {
  variant?: 'standard' | 'dark' | 'accent'
  className?: string
}

const variantStyles: Record<string, string> = {
  standard: 'border-[var(--color-divider)]',
  dark: 'border-[rgba(216,207,188,0.15)]',
  accent: 'border-l-2 border-olive-drab h-full',
}

function Divider({ variant = 'standard', className }: DividerProps) {
  if (variant === 'accent') {
    return (
      <div
        className={cn('border-l-2 border-olive-drab', className)}
        role="separator"
      />
    )
  }

  return (
    <hr
      className={cn(
        'border-t-half w-full',
        variantStyles[variant],
        className
      )}
      role="separator"
    />
  )
}

export { Divider }
