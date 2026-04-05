import { forwardRef } from 'react'
import { type ButtonProps } from './Button.types'
import { cn } from '@/lib/cn'

const variantStyles: Record<string, string> = {
  primary:
    'bg-[var(--color-accent)] text-[var(--color-accent-text)] border-transparent',
  secondary:
    'bg-bone text-smoky-black border-transparent',
  ghost:
    'bg-transparent border-half border-smoky-black text-smoky-black',
  'ghost-dark':
    'bg-transparent border-half border-[rgba(216,207,188,0.4)] text-bone',
  'text-link':
    'bg-transparent border-transparent text-[var(--color-text-secondary)] hover:underline',
}

const sizeStyles: Record<string, string> = {
  sm: 'px-[20px] py-[9px] text-[10px]',
  default: 'px-[28px] py-[13px] text-[11px]',
  lg: 'px-[40px] py-[17px] text-[12px]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'default',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center',
          'font-syne uppercase tracking-[0.14em]',
          'rounded min-h-[44px]',
          'transition-transform duration-fast',
          'hover:scale-[1.02]',
          'focus-visible:outline-2 focus-visible:outline-[var(--olive-drab)] focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
