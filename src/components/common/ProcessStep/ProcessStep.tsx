'use client'

import { motion } from 'framer-motion'
import { type ProcessPhase } from '@/types/process'
import { cn } from '@/lib/cn'

interface ProcessStepProps {
  phase: ProcessPhase
  index?: number
  className?: string
}

function ProcessStep({ phase, index = 0, className }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className={cn('flex flex-col gap-lg', className)}
    >
      {/* Header */}
      <div className="flex items-center gap-md">
        <span className="font-syne text-ui uppercase tracking-[0.18em] text-olive-drab">
          {phase.number}
        </span>
        <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
          {phase.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-cormorant text-h3 text-[var(--color-text-primary)]">
        {phase.title}
      </h3>

      {/* Description */}
      <p className="font-syne text-body text-[var(--color-text-secondary)]">
        {phase.description}
      </p>

      {/* Deliverables */}
      <div className="flex flex-col gap-sm">
        <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
          Deliverables
        </span>
        <ul className="flex flex-col gap-xs">
          {phase.deliverables.map((d) => (
            <li
              key={d}
              className="font-syne text-[13px] text-[var(--color-text-secondary)] flex items-start gap-sm"
            >
              <span className="text-olive-drab mt-[6px] text-[8px]">●</span>
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Duration */}
      <span className="font-syne text-cap text-[var(--color-text-muted)]">
        Duration: {phase.duration}
      </span>
    </motion.div>
  )
}

export { ProcessStep }
