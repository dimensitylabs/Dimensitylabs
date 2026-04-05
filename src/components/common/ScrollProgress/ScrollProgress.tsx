'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!progressRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Create scrubbable timeline for scroll progress
    triggerRef.current = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        if (progressRef.current) {
          const progress = self.progress
          gsap.set(progressRef.current, {
            scaleX: progress,
            opacity: progress >= 0.99 ? 0 : 1,
          })
        }
      },
    })

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill()
        triggerRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={progressRef}
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{
        backgroundColor: 'var(--olive-drab)',
        transform: 'scaleX(0)',
      }}
    />
  )
}
