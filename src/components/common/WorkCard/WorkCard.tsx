'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { type Work } from '@/types/work'
import { Badge } from '@/components/ui/Badge/Badge'
import { cn } from '@/lib/cn'

interface WorkCardProps {
  work: Work
  index?: number
  className?: string
}

function WorkCard({ work, index = 0, className }: WorkCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className={cn('group', className)}
    >
      <Link href={`/works/${work.slug}`} className="block" data-cursor="view">
        {/* Cover placeholder with hover effects */}
        <div
          className="relative aspect-[4/3] rounded overflow-hidden mb-lg transition-all duration-200 ease-out group-hover:ring-1 group-hover:ring-olive-drab"
        >
          {/* Background color block with scale on hover */}
          <div
            className="absolute inset-0 transition-transform duration-200 ease-out group-hover:scale-[1.04]"
            style={{ backgroundColor: work.coverColor }}
          />

          {/* Category badge - slides up from bottom on hover */}
          <div className="absolute bottom-lg left-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 ease-out">
            <Badge variant="ghost-light">{work.category}</Badge>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-sm">
          <div className="flex items-center justify-between">
            <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              {work.type}
            </span>
            <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
              {work.year}
            </span>
          </div>
          <h3 className="font-cormorant text-h3 text-[var(--color-text-primary)] group-hover:text-olive-drab transition-colors duration-slow">
            {work.title}
          </h3>
          <p className="font-syne text-body text-[var(--color-text-secondary)] line-clamp-2">
            {work.shortDesc}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}

export { WorkCard }
