'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/cn'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedSectionLabelProps {
  children: string
  accent?: boolean
  className?: string
}

export function AnimatedSectionLabel({
  children,
  accent = false,
  className,
}: AnimatedSectionLabelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const textEl = containerRef.current.querySelector('.label-text')
    const borderEl = containerRef.current.querySelector('.accent-border')

    gsap.set(textEl, { opacity: 0, x: -20 })
    if (borderEl) gsap.set(borderEl, { scaleY: 0, transformOrigin: 'top' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(textEl, {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
    })

    if (borderEl) {
      tl.to(
        borderEl,
        {
          scaleY: 1,
          duration: 0.4,
          ease: 'power2.out',
        },
        0
      )
    }

    triggerRef.current = tl.scrollTrigger as ScrollTrigger

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill()
        triggerRef.current = null
      }
    }
  }, [children])

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex items-center gap-sm font-syne text-ui uppercase tracking-[0.18em]',
        accent ? 'text-olive-drab' : 'text-[var(--color-text-secondary)]',
        className
      )}
    >
      {accent && (
        <span
          className="accent-border w-[2px] h-[16px] bg-olive-drab"
          aria-hidden="true"
        />
      )}
      <span className="label-text">{children}</span>
    </div>
  )
}
