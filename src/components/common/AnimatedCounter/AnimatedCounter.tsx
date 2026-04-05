'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

interface AnimatedCounterProps {
  value: string
  label: string
  className?: string
}

function AnimatedCounter({ value, label, className }: AnimatedCounterProps) {
  const [viewRef, isInView] = useInView<HTMLDivElement>({ once: true })
  const [displayValue, setDisplayValue] = useState('0')
  const [blur, setBlur] = useState(4)
  const [suffixScale, setSuffixScale] = useState(0.5)
  const guardRef = useRef(false)

  useEffect(() => {
    if (!isInView || guardRef.current) return
    guardRef.current = true

    const numericMatch = value.match(/^(\d+)(.*)$/)

    if (!numericMatch) {
      setDisplayValue(value)
      setBlur(0)
      setSuffixScale(1)
      return
    }

    const targetNumber = parseInt(numericMatch[1], 10)
    const suffix = numericMatch[2]
    const duration = 1500
    const steps = 60
    const stepTime = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += 1
      const progress = current / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.round(eased * targetNumber)
      setDisplayValue(`${currentValue}${suffix}`)
      
      // Blur reduces as count progresses
      setBlur(4 - (progress * 4))
      
      // Suffix pops at the end
      if (progress > 0.8) {
        const suffixProgress = (progress - 0.8) / 0.2
        if (suffixProgress < 0.5) {
          setSuffixScale(0.5 + suffixProgress * 1.4) // 0.5 -> 1.2
        } else {
          setSuffixScale(1.2 - (suffixProgress - 0.5) * 0.4) // 1.2 -> 1
        }
      }

      if (current >= steps) {
        clearInterval(timer)
        setDisplayValue(value)
        setBlur(0)
        setSuffixScale(1)
      }
    }, stepTime)

    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  // Split display value into number and suffix
  const match = displayValue.match(/^(\d+)(.*)$/)
  const numberPart = match ? match[1] : displayValue
  const suffixPart = match ? match[2] : ''

  return (
    <div ref={viewRef} className={cn('flex flex-col items-center text-center', className)}>
      <span 
        className="font-cormorant font-light italic text-h1 text-[var(--color-text-primary)] transition-all duration-100"
        style={{ filter: `blur(${blur}px)` }}
      >
        {numberPart}
        {suffixPart && (
          <span 
            className="inline-block transition-transform duration-100"
            style={{ transform: `scale(${suffixScale})` }}
          >
            {suffixPart}
          </span>
        )}
      </span>
      <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-secondary)] mt-sm">
        {label}
      </span>
    </div>
  )
}

export { AnimatedCounter }
