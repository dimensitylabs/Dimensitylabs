import { type ReactNode } from 'react'

export type BadgeVariant =
  | 'filled-black'
  | 'filled-olive'
  | 'filled-bone'
  | 'outline'
  | 'ghost-light'

export interface BadgeProps {
  variant?: BadgeVariant
  pill?: boolean
  children: ReactNode
  className?: string
}
