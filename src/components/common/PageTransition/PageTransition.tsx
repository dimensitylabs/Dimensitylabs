'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const transition = {
  type: 'tween' as const,
  ease: [0.76, 0, 0.24, 1] as const,
  duration: 0.6,
}

const panelVariants = {
  initial: { y: '100%' },
  animate: { y: '0%', transition },
  exit: { y: '-100%', transition },
}

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    // Skip on initial load (LoadingScreen handles that)
    const hasLoaded = sessionStorage.getItem('dl-loaded')
    if (!hasLoaded) {
      setDisplayChildren(children)
      return
    }

    // Start transition
    setIsTransitioning(true)

    // After panels cover screen, swap content
    const swapTimer = setTimeout(() => {
      setDisplayChildren(children)
    }, 600)

    // After transition completes, hide panels
    const completeTimer = setTimeout(() => {
      setIsTransitioning(false)
    }, 1200)

    return () => {
      clearTimeout(swapTimer)
      clearTimeout(completeTimer)
    }
  }, [pathname, children])

  return (
    <>
      {displayChildren}

      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Layer 2 - Olive Drab (delayed) */}
            <motion.div
              className="fixed inset-0 z-[9998]"
              style={{ backgroundColor: 'var(--olive-drab)' }}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ ...transition, delay: 0.1 }}
            />

            {/* Layer 1 - Smoky Black */}
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center"
              style={{ backgroundColor: 'var(--smoky-black)' }}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
            >
              {/* Wordmark - fades in/out during transition */}
              <motion.div
                className="flex items-baseline gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <span
                  className="font-cormorant font-light text-[32px] leading-none"
                  style={{ color: 'var(--floral-white)' }}
                >
                  Dimensity
                </span>
                <span
                  className="font-cormorant font-light italic text-[32px] leading-none"
                  style={{ color: 'var(--bone)' }}
                >
                  labs
                </span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
