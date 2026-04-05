import { type ButtonHTMLAttributes, type ReactNode } from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'ghost-dark'
  | 'text-link'

export type ButtonSize = 'sm' | 'default' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  children: ReactNode
  className?: string
}
