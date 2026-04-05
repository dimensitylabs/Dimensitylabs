'use client'

import { useRef, useEffect } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { Breadcrumb } from '@/components/common/Breadcrumb/Breadcrumb'
import { Badge } from '@/components/ui/Badge/Badge'
import { Tag } from '@/components/ui/Tag/Tag'
import { Button } from '@/components/ui/Button/Button'
import { useMagnetic } from '@/hooks/useMagnetic'
import { works } from '@/data/works'

gsap.registerPlugin(ScrollTrigger)

export function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const work = works.find((w) => w.slug === params.slug)
  if (!work) return { title: 'Not Found' }
  return {
    title: work.title,
    description: work.overview,
  }
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const work = works.find((w) => w.slug === params.slug)
  const ctaBtnRef = useMagnetic(0.4)

  const heroRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)
  const triggersRef = useRef<ScrollTrigger[]>([])

  useEffect(() => {
    if (!work) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Hero entrance animations
      const words = titleRef.current?.querySelectorAll('.word-inner')

      if (words) {
        gsap.set(words, { y: '100%' })
        gsap.to(words, {
          y: '0%',
          duration: 0.85,
          stagger: 0.07,
          ease: 'expo.out',
          delay: 0.3,
        })
      }

      if (yearRef.current) {
        gsap.set(yearRef.current, { opacity: 0 })
        gsap.to(yearRef.current, { opacity: 0.1, duration: 1, delay: 0.5, ease: 'power2.out' })
      }

      // Parallax on scroll
      if (coverRef.current && titleRef.current && yearRef.current) {
        const parallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        })

        parallaxTl
          .to(coverRef.current, { y: '-20%', ease: 'none' }, 0)
          .to(titleRef.current, { y: '-10%', ease: 'none' }, 0)
          .to(yearRef.current, { y: '10%', ease: 'none' }, 0)

        if (parallaxTl.scrollTrigger) {
          triggersRef.current.push(parallaxTl.scrollTrigger)
        }
      }
    }, heroRef)

    return () => {
      triggersRef.current.forEach((t) => t.kill())
      triggersRef.current = []
      ctx.revert()
    }
  }, [work])

  if (!work) {
    notFound()
  }

  // Split title into words
  const titleWords = work.title.split(' ')

  return (
    <>
      {/* Hero Section with parallax */}
      <div ref={heroRef} className="relative min-h-[70vh] overflow-hidden">
        {/* Cover background with parallax */}
        <div
          ref={coverRef}
          className="absolute inset-0"
          style={{ backgroundColor: work.coverColor }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, var(--color-bg) 100%)',
            }}
          />
        </div>

        {/* Large year number background */}
        <div
          ref={yearRef}
          className="absolute right-[10%] top-[20%] font-cormorant font-light pointer-events-none select-none"
          style={{
            fontSize: '25vw',
            color: 'var(--color-text-primary)',
            opacity: 0.1,
            lineHeight: 1,
          }}
        >
          {work.year}
        </div>

        <Container className="relative z-10 pt-[120px]">
          <div ref={titleRef} className="flex flex-col gap-xl max-w-[720px]">
            <Breadcrumb
              items={[
                { label: 'Works', href: '/works' },
                { label: work.title },
              ]}
            />

            <div className="flex flex-col gap-md">
              <span className="flex items-center gap-sm font-syne text-ui uppercase tracking-[0.18em] text-olive-drab">
                <span className="w-[2px] h-[16px] bg-olive-drab" aria-hidden="true" />
                <span>{work.category}</span>
              </span>

              <h1 className="font-cormorant text-h1 text-[var(--color-text-primary)]">
                {titleWords.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                    <span className="word-inner inline-block">{word}</span>
                  </span>
                ))}
              </h1>

              <Badge variant="ghost-light" className="w-fit">
                {work.type}
              </Badge>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-2xl">
            {/* Main */}
            <div className="flex flex-col gap-xl">
              <div className="flex flex-col gap-md">
                <h2 className="font-cormorant text-h3 text-[var(--color-text-primary)]">
                  Overview
                </h2>
                <p className="font-syne text-body text-[var(--color-text-secondary)]">
                  {work.description ?? work.challenge}
                </p>
              </div>

              <div className="flex flex-col gap-md">
                <h2 className="font-cormorant text-h3 text-[var(--color-text-primary)]">
                  Key Outcomes
                </h2>
                <ul className="flex flex-col gap-sm">
                  {(work.outcomes ?? [work.outcome]).map((outcome: string) => (
                    <li
                      key={outcome}
                      className="font-syne text-body text-[var(--color-text-secondary)] flex items-start gap-sm"
                    >
                      <span className="text-olive-drab mt-[8px] text-[6px]">●</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-lg">
              <div className="flex flex-col gap-sm">
                <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-sm">
                  {(work.tech ?? work.techStack ?? []).map((t: string) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-sm">
                <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Year
                </span>
                <span className="font-syne text-body text-[var(--color-text-primary)]">
                  {work.year}
                </span>
              </div>

              <div className="flex flex-col gap-sm">
                <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Type
                </span>
                <span className="font-syne text-body text-[var(--color-text-primary)]">
                  {work.type}
                </span>
              </div>

              <div className="flex flex-col gap-sm">
                <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                  Services
                </span>
                <div className="flex flex-wrap gap-sm">
                  {work.services.map((s) => (
                    <Link
                      key={s}
                      href={`/services/${s.toLowerCase().replace(/\s+/g, '-')}`}
                      className="font-syne text-[12px] underline underline-offset-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-slow"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-md mt-3xl py-3xl border-t border-half border-[var(--color-border)]">
            <h3 className="font-cormorant text-h3 text-[var(--color-text-primary)] text-center">
              Have a similar project in mind?
            </h3>
            <Link href="/contact">
              <Button
                ref={ctaBtnRef as React.RefObject<HTMLButtonElement>}
                variant="primary"
                data-cursor="hover"
              >
                Start a Project
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}
