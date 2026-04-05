import { forwardRef } from 'react'
import { type InputProps } from './Input.types'
import { cn } from '@/lib/cn'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={cn('flex flex-col gap-[7px]', className)}>
        <label
          htmlFor={inputId}
          className="font-syne text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'h-[42px] px-md',
            'bg-transparent rounded-md',
            'font-syne text-body text-[var(--color-text-primary)]',
            'border-half',
            'placeholder:text-[var(--color-text-secondary)] placeholder:opacity-40',
            'transition-colors duration-base',
            'focus:outline-none',
            error
              ? 'border-[#8B3A3A]'
              : success
                ? 'border-[#3A6B4A]'
                : 'border-[#b8b2a5] focus:border-olive-drab'
          )}
          {...props}
        />
        {error && (
          <span className="font-syne text-[12px] text-[#8B3A3A]">{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
