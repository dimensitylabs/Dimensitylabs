'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { AnimatedSectionLabel } from '@/components/common/AnimatedSectionLabel/AnimatedSectionLabel'
import { AnimatedHeadline } from '@/components/common/AnimatedHeadline/AnimatedHeadline'
import { AnimatedBodyText } from '@/components/common/AnimatedBodyText/AnimatedBodyText'
import { WorkCard } from '@/components/common/WorkCard/WorkCard'
import { works } from '@/data/works'
import { cn } from '@/lib/cn'

const categories = ['all', 'web', 'mobile', 'ai', 'branding', 'automation'] as const
type Category = (typeof categories)[number]

export default function WorksPage() {
  const [filter, setFilter] = useState<Category>('all')

  const filteredWorks =
    filter === 'all' ? works : works.filter((w) => w.category === filter)

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-2xl">
          {/* Header */}
          <div className="flex flex-col gap-md max-w-[540px]">
            <AnimatedSectionLabel accent>Our Work</AnimatedSectionLabel>
            <AnimatedHeadline as="h1">
              Projects that speak for themselves
            </AnimatedHeadline>
            <AnimatedBodyText>
              A selection of recent work across web, mobile, AI, automation, and
              branding.
            </AnimatedBodyText>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-cursor="hover"
                className={cn(
                  'font-syne text-ui uppercase tracking-[0.12em] px-[16px] py-[8px] rounded transition-all duration-200',
                  filter === cat
                    ? 'bg-olive-drab text-floral-white'
                    : 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                )}
              >
                {cat === 'all' ? 'All Work' : cat}
              </button>
            ))}
          </div>

          {/* Animated Grid with Filter */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredWorks.map((work, index) => (
                <motion.div
                  key={work.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    layout: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      duration: 0.4,
                    },
                    opacity: { duration: 0.2, ease: 'easeOut' },
                    scale: { duration: 0.3, ease: 'easeOut' },
                  }}
                >
                  <WorkCard work={work} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
