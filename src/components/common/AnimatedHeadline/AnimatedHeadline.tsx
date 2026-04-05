'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/cn'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedHeadlineProps {
  children: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  delay?: number
}

export function AnimatedHeadline({
  children,
  as: Component = 'h2',
  className,
  delay = 0,
}: AnimatedHeadlineProps) {
  const containerRef = useRef<HTMLElement>(null)
  const triggersRef = useRef<ScrollTrigger[]>([])

  // Split text into words
  const words = children.split(' ')

  useEffect(() => {
    if (!containerRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lines = containerRef.current.querySelectorAll('.word-wrap')

    // Set initial state
    gsap.set(lines, { y: '110%' })

    // Create animation with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay,
    })

    tl.to(lines, {
      y: '0%',
      duration: 0.85,
      stagger: 0.07,
      ease: 'expo.out',
    })

    if (tl.scrollTrigger) {
      triggersRef.current.push(tl.scrollTrigger)
    }

    return () => {
      triggersRef.current.forEach((trigger) => trigger.kill())
      triggersRef.current = []
    }
  }, [children, delay])

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={cn('overflow-hidden', className)}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span className="word-wrap inline-block">{word}</span>
        </span>
      ))}
    </Component>
  )
}
