'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { SectionLabel } from '@/components/ui/SectionLabel/SectionLabel'
import { AnimatedCounter } from '@/components/common/AnimatedCounter/AnimatedCounter'

const stats = [
  { value: '25+', label: 'Projects Delivered' },
  { value: '15+', label: 'Happy Clients' },
  { value: '3+', label: 'Years in Business' },
]

function AboutIntro() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-2xl">
          {/* Header */}
          <div className="flex flex-col gap-md max-w-[640px]">
            <SectionLabel accent>About Us</SectionLabel>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="font-cormorant text-h2 text-[var(--color-text-primary)]"
            >
              We are Dimensity Labs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              className="font-syne text-body text-[var(--color-text-secondary)]"
            >
              A Mumbai-based digital product studio. We help startups and growing businesses build websites, mobile apps, and AI-powered systems that work as good as they look. No bloat, no jargon, no wasted time — just honest work that delivers results.
            </motion.p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-xl py-xl border-t border-half border-[var(--color-border)]">
            {stats.map((stat) => (
              <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { AboutIntro }
