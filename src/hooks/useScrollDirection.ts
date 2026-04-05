'use client'

import { useState, useEffect } from 'react'

export type ScrollDirection = 'up' | 'down'

export function useScrollDirection(threshold = 10) {
  const [direction, setDirection] = useState<ScrollDirection>('up')
  const [prevScroll, setPrevScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (Math.abs(currentScroll - prevScroll) < threshold) return

      if (currentScroll > prevScroll && currentScroll > 64) {
        setDirection('down')
      } else {
        setDirection('up')
      }

      setPrevScroll(currentScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScroll, threshold])

  return direction
}
