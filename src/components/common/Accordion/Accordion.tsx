'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border-b border-half border-[var(--color-border)]"
        >
          <button
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
            className={cn(
              'w-full flex items-center justify-between',
              'py-lg text-left',
              'min-h-[44px]',
              'transition-colors duration-slow'
            )}
          >
            <span className="font-cormorant text-h4 text-[var(--color-text-primary)] pr-md">
              {item.question}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              className={cn(
                'text-[var(--color-text-secondary)] shrink-0',
                'transition-transform duration-slow',
                openIndex === index && 'rotate-45'
              )}
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <p className="font-syne text-body text-[var(--color-text-secondary)] pb-lg">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export { Accordion }
