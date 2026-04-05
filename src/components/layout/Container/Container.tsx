import { cn } from '@/lib/cn'
import { type ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-container px-md md:px-lg', className)}>
      {children}
    </div>
  )
}

export { Container }
