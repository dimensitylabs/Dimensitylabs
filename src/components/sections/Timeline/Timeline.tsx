'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { AnimatedSectionLabel } from '@/components/common/AnimatedSectionLabel/AnimatedSectionLabel'
import { AnimatedHeadline } from '@/components/common/AnimatedHeadline/AnimatedHeadline'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  {
    year: '2021',
    title: 'Founded',
    description: 'Started as a freelance collective building websites for local businesses.',
  },
  {
    year: '2022',
    title: 'First Mobile App',
    description: 'Launched our first React Native app for a healthcare startup.',
  },
  {
    year: '2023',
    title: 'AI Integration',
    description: 'Began integrating Claude API and automation into client projects.',
  },
  {
    year: '2024',
    title: 'Global Reach',
    description: 'Expanded to international clients across 5 countries.',
  },
]

function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const dotsRef = useRef<HTMLSpanElement[]>([])
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // SVG line draw animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength()
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        })

        const drawTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        })

        drawTl.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
        })

        if (drawTl.scrollTrigger) {
          triggersRef.current.push(drawTl.scrollTrigger)
        }
      }

      // Dots scale from 0 → 1 when line reaches them (scrubbed)
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return

        gsap.set(dot, { scale: 0, opacity: 0 })

        const dotTl = gsap.timeline({
          scrollTrigger: {
            trigger: dot,
            start: 'top 70%',
            end: 'top 50%',
            scrub: 1,
          },
        })

        dotTl.to(dot, {
          scale: 1,
          opacity: 1,
          ease: 'none',
        })

        if (dotTl.scrollTrigger) {
          triggersRef.current.push(dotTl.scrollTrigger)
        }
      })

      // Cards fade in immediately after dot appears
      cardsRef.current.forEach((card, i) => {
        if (!card) return

        gsap.set(card, { opacity: 0, y: 20 })

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 65%',
            end: 'top 45%',
            scrub: 1,
          },
        })

        cardTl.to(card, {
          opacity: 1,
          y: 0,
          ease: 'none',
        })

        if (cardTl.scrollTrigger) {
          triggersRef.current.push(cardTl.scrollTrigger)
        }
      })
    }, sectionRef)

    return () => {
      triggersRef.current.forEach((t) => t.kill())
      triggersRef.current = []
      ctx.revert()
    }
  }, [])

  return (
    <Section ref={sectionRef}>
      <Container>
        <div className="flex flex-col gap-2xl">
          {/* Header */}
          <div className="flex flex-col gap-md max-w-[540px]">
            <AnimatedSectionLabel accent>Our Journey</AnimatedSectionLabel>
            <AnimatedHeadline as="h2">How we got here</AnimatedHeadline>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* SVG Connecting Line */}
            <svg
              className="absolute left-[50%] top-0 bottom-0 w-[2px] h-full -translate-x-1/2 hidden lg:block"
              preserveAspectRatio="none"
            >
              <path
                ref={pathRef}
                d="M1 0 L1 1000"
                stroke="var(--olive-drab)"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Milestones */}
            <div className="flex flex-col gap-xl lg:gap-2xl">
              {milestones.map((milestone, i) => (
                <div
                  key={milestone.year}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el
                  }}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-md lg:gap-xl items-center ${
                    i % 2 === 0 ? '' : 'lg:direction-rtl'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex flex-col gap-sm ${i % 2 === 0 ? 'lg:pr-xl' : 'lg:pl-xl lg:order-2'}`}>
                    <span className="font-cormorant font-light italic text-h2 text-olive-drab">
                      {milestone.year}
                    </span>
                    <h3 className="font-cormorant text-h3 text-[var(--color-text-primary)]">
                      {milestone.title}
                    </h3>
                    <p className="font-syne text-body text-[var(--color-text-secondary)]">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Dot on timeline */}
                  <div className={`hidden lg:flex justify-center ${i % 2 === 0 ? '' : 'lg:order-1'}`}>
                    <span
                      ref={(el) => {
                        if (el) dotsRef.current[i] = el
                      }}
                      className="w-4 h-4 rounded-full bg-olive-drab border-4 border-(--color-bg) z-10"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { Timeline }
