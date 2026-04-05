'use client'

import { useEffect, useRef, useState } from 'react'

interface CursorState {
  isHovering: boolean
  cursorType: 'default' | 'hover' | 'text' | 'view'
  isDark: boolean
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    cursorType: 'default',
    isDark: false,
  })

  // Mouse position refs for smooth animation
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number | undefined>(undefined)

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    // Add cursor-none to html
    document.documentElement.classList.add('cursor-none')

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)

      // Update dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }

      // Check for cursor type from data attribute
      const target = e.target as HTMLElement
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorState['cursorType'] | null

      // Check for dark background
      const isDark = target.closest('[data-cursor-dark]') !== null

      setCursorState((prev) => ({
        ...prev,
        isHovering: !!cursorType && cursorType !== 'default',
        cursorType: cursorType || 'default',
        isDark,
      }))
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    // Animation loop for ring lerp
    const animate = () => {
      if (ringRef.current) {
        // Lerp: ring follows mouse with delay
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12

        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    // Start animation loop
    rafId.current = requestAnimationFrame(animate)

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.documentElement.classList.remove('cursor-none')
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  const { isHovering, cursorType, isDark } = cursorState
  const baseColor = isDark ? 'var(--floral-white)' : 'var(--smoky-black)'
  const ringColor = isDark ? 'var(--floral-white)' : 'var(--olive-drab)'

  return (
    <>
      {/* Global cursor-none style */}
      <style jsx global>{`
        html.cursor-none,
        html.cursor-none * {
          cursor: none !important;
        }
      `}</style>

      {/* Dot - follows immediately */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: baseColor,
          opacity: isVisible && !isHovering ? 1 : 0,
          transition: 'opacity 0.2s ease, width 0.2s ease, height 0.2s ease',
        }}
      />

      {/* Ring - follows with lag */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          width: cursorType === 'hover' ? 64 : cursorType === 'text' ? 48 : 40,
          height: cursorType === 'hover' ? 64 : cursorType === 'text' ? 2 : 40,
          borderRadius: cursorType === 'text' ? 0 : '50%',
          border: cursorType === 'view' ? 'none' : `1px solid ${ringColor}`,
          backgroundColor: cursorType === 'view' ? ringColor : 'transparent',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, border-radius 0.2s ease, opacity 0.2s ease',
        }}
      >
        {/* VIEW text for view cursor type */}
        {cursorType === 'view' && (
          <span
            className="font-syne text-[10px] uppercase tracking-[0.2em]"
            style={{ color: isDark ? 'var(--smoky-black)' : 'var(--floral-white)' }}
          >
            VIEW
          </span>
        )}
      </div>
    </>
  )
}
