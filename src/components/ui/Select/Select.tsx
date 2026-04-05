import { forwardRef } from 'react'
import { type SelectProps } from './Select.types'
import { cn } from '@/lib/cn'

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, placeholder, error, className, id, ...props }, ref) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={cn('flex flex-col gap-[7px]', className)}>
        <label
          htmlFor={selectId}
          className="font-syne text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]"
        >
          {label}
        </label>
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'h-[42px] px-md',
            'bg-transparent rounded-md',
            'font-syne text-body text-[var(--color-text-primary)]',
            'border-half',
            'transition-colors duration-base',
            'focus:outline-none appearance-none',
            'cursor-pointer',
            error
              ? 'border-[#8B3A3A]'
              : 'border-[#b8b2a5] focus:border-olive-drab'
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="font-syne text-[12px] text-[#8B3A3A]">{error}</span>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
