'use client'

import { useRef, useEffect } from 'react'

export function useMagnetic(strength = 0.4) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`
    }

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0px, 0px)'
      el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
    }

    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.1s linear'
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    el.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      el.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [strength])

  return ref
}
