'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/layout/Container/Container'
import { Button } from '@/components/ui/Button/Button'
import { useMagnetic } from '@/hooks/useMagnetic'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const bgNumberRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const triggersRef = useRef<ScrollTrigger[]>([])

  const primaryBtnRef = useMagnetic(0.4)
  const ghostBtnRef = useMagnetic(0.25)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // 1. Headline word reveal - each word wrapped, staggered 0.08s, 0.9s expo-out
      const words = headlineRef.current?.querySelectorAll('.word-inner')
      if (words) {
        gsap.set(words, { y: '100%' })
        gsap.to(words, {
          y: '0%',
          duration: 0.9,
          stagger: 0.08,
          ease: 'expo.out',
          delay: 0.2,
        })
      }

      // 2. Section label - slides in from left, 0.2s delay
      if (labelRef.current) {
        gsap.set(labelRef.current, { opacity: 0, x: -20 })
        gsap.to(labelRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.2,
        })
      }

      // 3. Subtext - fades in 0.3s after last word (0.2 + 0.9 + 0.3 = 1.4s)
      if (subtextRef.current) {
        gsap.set(subtextRef.current, { opacity: 0, y: 20 })
        gsap.to(subtextRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 1.1,
        })
      }

      // 4. Buttons - fade + scale after subtext
      if (buttonsRef.current) {
        gsap.set(buttonsRef.current, { opacity: 0, scale: 0.95 })
        gsap.to(buttonsRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          delay: 1.3,
        })
      }

      // 5. Background number - fades in
      if (bgNumberRef.current) {
        gsap.set(bgNumberRef.current, { opacity: 0 })
        gsap.to(bgNumberRef.current, {
          opacity: 0.15,
          duration: 1,
          ease: 'power2.out',
          delay: 0.5,
        })
      }

      // 6. Scroll indicator - line grows
      if (scrollIndicatorRef.current) {
        const line = scrollIndicatorRef.current.querySelector('.scroll-line')
        if (line) {
          gsap.set(line, { scaleY: 0, transformOrigin: 'top' })
          gsap.to(line, {
            scaleY: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 1.5,
          })
        }
      }

      // 7. Scroll-driven animations
      // Headline scale + fade on scroll
      if (headlineRef.current && subtextRef.current && bgNumberRef.current) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })

        scrollTl
          .to(headlineRef.current, {
            scale: 0.85,
            opacity: 0,
            ease: 'none',
          })
          .to(
            subtextRef.current,
            {
              opacity: 0,
              ease: 'none',
            },
            0
          )
          .to(
            bgNumberRef.current,
            {
              y: '-30%',
              ease: 'none',
            },
            0
          )

        if (scrollTl.scrollTrigger) {
          triggersRef.current.push(scrollTl.scrollTrigger)
        }
      }
    }, sectionRef)

    return () => {
      triggersRef.current.forEach((t) => t.kill())
      triggersRef.current = []
      ctx.revert()
    }
  }, [])

  // Split headline into words
  const headlineWords = ['We', 'build', 'digital', 'products', 'that']

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Number "01" */}
      <div
        ref={bgNumberRef}
        className="absolute right-[5%] top-[15%] font-cormorant font-light pointer-events-none select-none"
        style={{
          fontSize: '35vw',
          color: 'var(--bone)',
          opacity: 0.15,
          lineHeight: 1,
        }}
      >
        01
      </div>

      <Container className="relative z-10">
        <div className="max-w-[720px] flex flex-col gap-xl">
          {/* Section Label */}
          <div
            ref={labelRef}
            className="flex items-center gap-sm font-syne text-ui uppercase tracking-[0.18em] text-olive-drab"
          >
            <span className="w-[2px] h-[16px] bg-olive-drab" aria-hidden="true" />
            <span>Digital Product Studio</span>
          </div>

          {/* Headline with word reveal */}
          <h1
            ref={headlineRef}
            className="font-cormorant text-display text-[var(--color-text-primary)]"
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <span className="word-inner inline-block">{word}</span>
              </span>
            ))}{' '}
            <span className="inline-block overflow-hidden">
              <span className="word-inner inline-block italic text-olive-drab">
                perform
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="font-syne text-body text-[var(--color-text-secondary)] max-w-[540px]"
          >
            Websites, mobile apps, and AI-powered systems — crafted with precision
            for startups and growing businesses. Based in Mumbai, working globally.
          </p>

          {/* Buttons with magnetic effect */}
          <div
            ref={buttonsRef}
            className="flex flex-wrap items-center gap-md"
          >
            <Link href="/contact">
              <Button
                ref={primaryBtnRef as React.RefObject<HTMLButtonElement>}
                variant="primary"
                data-cursor="hover"
              >
                Start a Project
              </Button>
            </Link>
            <Link href="/works">
              <Button
                ref={ghostBtnRef as React.RefObject<HTMLButtonElement>}
                variant="ghost"
                data-cursor="hover"
              >
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-[48px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-sm"
      >
        <span className="font-syne text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-secondary)]">
          Scroll
        </span>
        <div
          className="scroll-line w-[1px] h-[48px] bg-olive-drab"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}

export { Hero }
