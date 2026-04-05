import { cn } from '@/lib/cn'
import { type ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  className?: string
}

function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        'font-syne text-[10px] uppercase tracking-[0.12em]',
        'px-[12px] py-[5px]',
        'rounded-pill',
        'bg-bone text-smoky-black',
        className
      )}
    >
      {children}
    </span>
  )
}

export { Tag }
