'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Row 1 content: Services
const row1Items = [
  'Web Design',
  '✦',
  'Mobile Apps',
  '✦',
  'AI Solutions',
  '✦',
  'Automation',
  '✦',
  'Branding',
  '✦',
  'Strategy',
  '✦',
]

// Row 2 content: Technologies (italic)
const row2Items = [
  'Next.js',
  '✦',
  'React Native',
  '✦',
  'Claude API',
  '✦',
  'n8n',
  '✦',
  'Framer Motion',
  '✦',
  'TypeScript',
  '✦',
]

export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Row 1: scrolls left (normal speed)
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          xPercent: -50,
          ease: 'none',
          duration: 30,
          repeat: -1,
        })
      }

      // Row 2: scrolls right (0.75x speed)
      if (row2Ref.current) {
        gsap.fromTo(
          row2Ref.current,
          { xPercent: -50 },
          {
            xPercent: 0,
            ease: 'none',
            duration: 40, // slower
            repeat: -1,
          }
        )
      }

      // Scroll velocity effect - speed up on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity()) / 1000
          const speedMultiplier = 1 + Math.min(velocity * 0.5, 2)

          if (row1Ref.current) {
            gsap.to(row1Ref.current, { timeScale: speedMultiplier, duration: 0.3 })
          }
          if (row2Ref.current) {
            gsap.to(row2Ref.current, { timeScale: speedMultiplier, duration: 0.3 })
          }
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="bg-smoky-black py-8 overflow-hidden"
      // Slow down on hover
      onMouseEnter={() => {
        if (row1Ref.current) gsap.to(row1Ref.current, { timeScale: 0.2, duration: 0.5 })
        if (row2Ref.current) gsap.to(row2Ref.current, { timeScale: 0.2, duration: 0.5 })
      }}
      onMouseLeave={() => {
        if (row1Ref.current) gsap.to(row1Ref.current, { timeScale: 1, duration: 0.5 })
        if (row2Ref.current) gsap.to(row2Ref.current, { timeScale: 1, duration: 0.5 })
      }}
    >
      {/* Row 1 - Services, normal speed, scrolls left */}
      <div className="mb-4">
        <div ref={row1Ref} className="flex whitespace-nowrap">
          {/* Duplicate content for seamless loop */}
          {[...row1Items, ...row1Items].map((item, i) => (
            <span
              key={i}
              className="font-cormorant text-[28px] text-floral-white mx-4"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 - Technologies, slower, italic, scrolls right */}
      <div>
        <div ref={row2Ref} className="flex whitespace-nowrap">
          {/* Duplicate content for seamless loop */}
          {[...row2Items, ...row2Items].map((item, i) => (
            <span
              key={i}
              className="font-syne text-[13px] uppercase tracking-[0.1em] text-bone/60 mx-4 italic"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
