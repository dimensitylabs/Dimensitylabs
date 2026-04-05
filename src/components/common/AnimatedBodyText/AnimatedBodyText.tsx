'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/cn'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedBodyTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedBodyText({
  children,
  className,
  delay = 0,
}: AnimatedBodyTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.set(containerRef.current, { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      delay,
    })

    tl.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    })

    triggerRef.current = tl.scrollTrigger as ScrollTrigger

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill()
        triggerRef.current = null
      }
    }
  }, [delay])

  return (
    <p ref={containerRef} className={cn(className)}>
      {children}
    </p>
  )
}
