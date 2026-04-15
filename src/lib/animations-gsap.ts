'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugin
gsap.registerPlugin(ScrollTrigger)

// ========================================
// 7.1 Headline Reveal (Line Mask)
// ========================================
// Wrap each line in overflow-hidden div
// Animate: translateY(110%) → translateY(0%), 0.85s expo-out
// Stagger: 0.07s per line
// Trigger: when element enters viewport (start: "top 85%")

export function createHeadlineReveal(
  element: HTMLElement,
  options: {
    duration?: number
    stagger?: number
    ease?: gsap.TweenVars['ease']
    start?: string
  } = {}
): ScrollTrigger {
  const {
    duration = 0.85,
    stagger = 0.07,
    ease = 'expo.out',
    start = 'top 85%',
  } = options

  // Split text into lines (assume each line is wrapped in a span)
  const lines = element.querySelectorAll('.line')

  // Set initial state
  gsap.set(lines, { y: '110%' })

  // Create animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: 'play none none none',
    },
  })

  tl.to(lines, {
    y: '0%',
    duration,
    stagger,
    ease,
  })

  return tl.scrollTrigger as ScrollTrigger
}

// ========================================
// 7.2 Body Text Reveal (Fade Up)
// ========================================
// opacity: 0 → 1, translateY: 20px → 0
// Duration: 0.6s ease-out
// Trigger: ScrollTrigger start: "top 88%"

export function createBodyTextReveal(
  element: HTMLElement,
  options: {
    duration?: number
    y?: number
    ease?: string
    start?: string
  } = {}
): ScrollTrigger {
  const {
    duration = 0.6,
    y = 20,
    ease = 'power2.out',
    start = 'top 88%',
  } = options

  gsap.set(element, { opacity: 0, y })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: 'play none none none',
    },
  })

  tl.to(element, {
    opacity: 1,
    y: 0,
    duration,
    ease,
  })

  return tl.scrollTrigger as ScrollTrigger
}

// ========================================
// 7.3 Section Label (Slide In)
// ========================================
// translateX(-20px) + opacity 0 → translateX(0) + opacity 1
// Duration: 0.5s ease-out
// The left accent border grows from height 0 → 100% simultaneously

export function createSectionLabelReveal(
  element: HTMLElement,
  options: {
    duration?: number
    x?: number
    ease?: string
    start?: string
  } = {}
): ScrollTrigger {
  const {
    duration = 0.5,
    x = -20,
    ease = 'power2.out',
    start = 'top 85%',
  } = options

  const border = element.querySelector('.accent-border')

  gsap.set(element, { opacity: 0, x })
  if (border) gsap.set(border, { scaleY: 0, transformOrigin: 'top' })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: 'play none none none',
    },
  })

  tl.to(element, {
    opacity: 1,
    x: 0,
    duration,
    ease,
  })

  if (border) {
    tl.to(
      border,
      {
        scaleY: 1,
        duration: duration * 0.8,
        ease,
      },
      0
    )
  }

  return tl.scrollTrigger as ScrollTrigger
}

// ========================================
// 7.4 Character Stagger (Special Headlines)
// ========================================
// Use splitting library to split text into characters
// Each char: opacity 0 → 1, translateY(30px) → 0
// Stagger: 0.025s per character
// Duration: 0.6s ease-out per character

export function createCharacterStagger(
  element: HTMLElement,
  options: {
    duration?: number
    stagger?: number
    y?: number
    ease?: string
    start?: string
  } = {}
): ScrollTrigger {
  const {
    duration = 0.6,
    stagger = 0.025,
    y = 30,
    ease = 'power2.out',
    start = 'top 85%',
  } = options

  // Assume chars are wrapped in spans with class 'char'
  const chars = element.querySelectorAll('.char')

  gsap.set(chars, { opacity: 0, y })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: 'play none none none',
    },
  })

  tl.to(chars, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease,
  })

  return tl.scrollTrigger as ScrollTrigger
}

// ========================================
// Section Reveal Patterns (from §12)
// ========================================

// Pattern A — Fade Up Block (default for most sections)
export function createFadeUpReveal(
  element: HTMLElement,
  start: string = 'top 80%'
): ScrollTrigger {
  gsap.set(element, { opacity: 0, y: 40 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start,
      toggleActions: 'play none none none',
    },
  })

  tl.to(element, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
  })

  return tl.scrollTrigger as ScrollTrigger
}

// Pattern B — Horizontal Slide (for two-column layouts)
export function createHorizontalSlideReveal(
  leftEl: HTMLElement,
  rightEl: HTMLElement,
  start: string = 'top 80%'
): ScrollTrigger {
  gsap.set(leftEl, { opacity: 0, x: -40 })
  gsap.set(rightEl, { opacity: 0, x: 40 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: leftEl.parentElement,
      start,
      toggleActions: 'play none none none',
    },
  })

  tl.to(
    [leftEl, rightEl],
    {
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power2.out',
    },
    0
  )

  return tl.scrollTrigger as ScrollTrigger
}

// Pattern C — Stagger Grid (for card grids)
export function createStaggerGridReveal(
  elements: HTMLElement[],
  start: string = 'top 80%'
): ScrollTrigger {
  gsap.set(elements, { opacity: 0, y: 30 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elements[0]?.parentElement,
      start,
      toggleActions: 'play none none none',
    },
  })

  tl.to(elements, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  })

  return tl.scrollTrigger as ScrollTrigger
}

// Pattern D — Scale Reveal (for CTA band)
export function createScaleReveal(
  bgEl: HTMLElement,
  contentEl: HTMLElement,
  start: string = 'top 80%'
): ScrollTrigger {
  gsap.set(bgEl, { scaleX: 0, transformOrigin: 'left' })
  gsap.set(contentEl, { opacity: 0 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: bgEl,
      start,
      toggleActions: 'play none none none',
    },
  })

  tl.to(bgEl, {
    scaleX: 1,
    duration: 0.7,
    ease: 'power2.out',
  }).to(
    contentEl,
    {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    },
    0.3
  )

  return tl.scrollTrigger as ScrollTrigger
}

// ========================================
// Kill all ScrollTrigger instances
// ========================================
export function killAllScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}
