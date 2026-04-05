'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Check if already loaded (client-side only)
const getHasLoaded = () => {
  if (typeof window === 'undefined') return true
  return sessionStorage.getItem('dl-loaded') === 'true'
}

export function LoadingScreen() {
  // Use lazy state initialization to avoid setState in effect
  const [isLoading, setIsLoading] = useState(() => !getHasLoaded())
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (!isLoading) return

    // Sequence timing (matches ANIMATIONS.md §5):
    // 1.2s - start content fade out
    // 1.5s - panel slides up
    // 1.8s - complete, unmount

    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 1200)

    const completeTimer = setTimeout(() => {
      sessionStorage.setItem('dl-loaded', 'true')
      setIsLoading(false)
    }, 1800)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'var(--smoky-black)' }}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{
            y: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
          }}
        >
          {/* Content Container */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Logo Text */}
            <div className="flex items-baseline gap-1">
              {/* "Dimensity" - fades in at 0.2s */}
              <motion.span
                className="font-cormorant font-light text-[48px] leading-none"
                style={{ color: 'var(--floral-white)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Dimensity
              </motion.span>

              {/* "labs" - appears at 0.5s in Bone, italic */}
              <motion.span
                className="font-cormorant font-light italic text-[48px] leading-none"
                style={{ color: 'var(--bone)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                labs
              </motion.span>
            </div>

            {/* Tagline - letter by letter at 0.8s */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.1 }}
            >
              <TaglineLetters text="DIGITAL PRODUCT STUDIO" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TaglineLetters({ text }: { text: string }) {
  return (
    <span className="font-syne text-[9px] uppercase tracking-[0.3em] flex">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ color: 'var(--bone)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.8 + i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}
