'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { AnimatedSectionLabel } from '@/components/common/AnimatedSectionLabel/AnimatedSectionLabel'
import { AnimatedHeadline } from '@/components/common/AnimatedHeadline/AnimatedHeadline'
import { processPhases } from '@/data/process'
import { cn } from '@/lib/cn'

gsap.registerPlugin(ScrollTrigger)

function ProcessOverview() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement[]>([])
  const numbersRef = useRef<HTMLSpanElement[]>([])
  const bgNumbersRef = useRef<HTMLDivElement[]>([])
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      stepsRef.current.forEach((step, i) => {
        if (!step) return

        const number = numbersRef.current[i]

        // Pin each step briefly
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 0.5,
            pin: false,
            onEnter: () => {
              // Animate number "count up" effect
              if (number) {
                gsap.fromTo(
                  number,
                  { scale: 0.8, opacity: 0.3 },
                  { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
                )
                // Fill color to Olive Drab
                gsap.to(number, {
                  color: 'var(--olive-drab)',
                  duration: 0.8,
                  ease: 'power2.out',
                })
              }
            },
          },
        })

        if (pinTl.scrollTrigger) {
          triggersRef.current.push(pinTl.scrollTrigger)
        }

        // Enormous background numbers animation (200px, Bone 8% opacity, blurred)
        bgNumbersRef.current.forEach((bgNum, i) => {
          if (!bgNum) return

          gsap.set(bgNum, {
            opacity: 0,
            scale: 0.8,
            filter: 'blur(20px)',
          })

          const bgTl = gsap.timeline({
            scrollTrigger: {
              trigger: stepsRef.current[i],
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.5,
            },
          })

          bgTl.to(bgNum, {
            opacity: 0.08,
            scale: 1,
            filter: 'blur(10px)',
            ease: 'none',
          })

          if (bgTl.scrollTrigger) {
            triggersRef.current.push(bgTl.scrollTrigger)
          }
        })
        gsap.set(step, { opacity: 0.3, y: 30 })
        const stepTl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 0.5,
          },
        })

        stepTl.to(step, {
          opacity: 1,
          y: 0,
          ease: 'none',
        })

        if (stepTl.scrollTrigger) {
          triggersRef.current.push(stepTl.scrollTrigger)
        }

        // Dim previous step when scrolling past
        gsap.to(step, {
          scrollTrigger: {
            trigger: step,
            start: 'bottom 30%',
            end: 'bottom top',
            scrub: true,
            onEnter: () => {
              gsap.to(step, { opacity: 0.3, duration: 0.3 })
              if (number) {
                gsap.to(number, { color: 'var(--color-text-muted)', duration: 0.3 })
              }
            },
            onLeaveBack: () => {
              gsap.to(step, { opacity: 1, duration: 0.3 })
              if (number) {
                gsap.to(number, { color: 'var(--olive-drab)', duration: 0.3 })
              }
            },
          },
        })
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
          <div className="flex flex-col gap-md max-w-[640px]">
            <AnimatedSectionLabel accent>How We Work</AnimatedSectionLabel>
            <AnimatedHeadline as="h2">A process built on clarity</AnimatedHeadline>
            <p className="font-syne text-body text-[var(--color-text-secondary)]">
              Every project follows a structured four-phase process. No surprises, no scope creep — just disciplined execution from discovery to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2xl">
            {processPhases.map((phase, index) => (
              <div
                key={phase.number}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el
                }}
                className={cn(
                  'relative flex items-start gap-lg p-xl rounded-lg border-half border-[var(--color-border)]',
                  'transition-all duration-300 overflow-hidden'
                )}
              >
                {/* Enormous background number (200px, Bone 8% opacity, blurred) */}
                <div
                  ref={(el) => {
                    if (el) bgNumbersRef.current[index] = el
                  }}
                  className="absolute -right-4 -top-8 font-cormorant font-light text-[200px] leading-none pointer-events-none select-none"
                  style={{
                    color: 'var(--bone)',
                    opacity: 0,
                    lineHeight: 1,
                    filter: 'blur(20px)',
                  }}
                  aria-hidden="true"
                >
                  {phase.number}
                </div>

                {/* Large Number */}
                <span
                  ref={(el) => {
                    if (el) numbersRef.current[index] = el
                  }}
                  className="relative z-10 font-cormorant font-light text-[64px] leading-none text-(--color-text-muted)"
                >
                  {phase.number}
                </span>

                {/* Content */}
                <div className="flex flex-col gap-sm pt-2">
                  <h3 className="font-cormorant text-h3 text-[var(--color-text-primary)]">
                    {phase.title}
                  </h3>
                  <p className="font-syne text-body text-[var(--color-text-secondary)]">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { ProcessOverview }
