import { forwardRef } from 'react'
import { type TextareaProps } from './Textarea.types'
import { cn } from '@/lib/cn'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, success, className, id, ...props }, ref) => {
    const textareaId = id ?? label.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className={cn('flex flex-col gap-[7px]', className)}>
        <label
          htmlFor={textareaId}
          className="font-syne text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'px-md py-[12px]',
            'bg-transparent rounded-md',
            'font-syne text-body text-[var(--color-text-primary)]',
            'border-half',
            'placeholder:text-[var(--color-text-secondary)] placeholder:opacity-40',
            'transition-colors duration-base',
            'focus:outline-none resize-y',
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

Textarea.displayName = 'Textarea'

export { Textarea }
