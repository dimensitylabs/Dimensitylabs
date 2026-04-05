import { type ReactNode } from 'react'

export type CardTier = 'default' | 'dark' | 'tinted'

export interface CardProps {
  tier?: CardTier
  children: ReactNode
  className?: string
}
