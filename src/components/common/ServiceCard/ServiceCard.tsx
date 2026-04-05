'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { type Service } from '@/types/service'
import { cn } from '@/lib/cn'

interface ServiceCardProps {
  service: Service
  index?: number
  className?: string
}

function ServiceCard({ service, index = 0, className }: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className={cn(
        'group relative rounded p-xl overflow-hidden',
        'border-half border-[var(--color-border)]',
        'hover:border-olive-drab transition-colors duration-200',
        className
      )}
      data-cursor="hover"
    >
      {/* Large decorative number - scales on hover */}
      <span
        className="absolute -right-4 -top-8 font-cormorant font-light text-[120px] leading-none pointer-events-none select-none transition-all duration-200 ease-out transform scale-90 opacity-[0.15] group-hover:scale-110 group-hover:opacity-[0.25]"
        style={{ color: 'var(--bone)' }}
        aria-hidden="true"
      >
        {service.number}
      </span>

      {/* Left border accent - grows on hover */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-olive-drab transform scale-y-0 group-hover:scale-y-100 transition-transform duration-200 ease-out origin-top"
        aria-hidden="true"
      />

      <Link href={`/services/${service.slug}`} className="relative z-10 flex flex-col gap-md h-full">
        {/* Number + Icon + Arrow */}
        <div className="flex items-center justify-between">
          <span className="font-syne text-ui uppercase tracking-[0.18em] text-[var(--color-text-muted)] transition-transform duration-200 ease-out group-hover:translate-x-2">
            {service.number}
          </span>
          <div className="flex items-center gap-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--color-text-secondary)]"
            >
              <path d={service.icon} />
            </svg>
            {/* Arrow icon - slides in on hover */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-olive-drab transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200 ease-out"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Title - shifts right on hover */}
        <h3 className="font-cormorant text-h3 text-[var(--color-text-primary)] group-hover:text-olive-drab transition-all duration-200 ease-out group-hover:translate-x-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="font-syne text-body text-[var(--color-text-secondary)] line-clamp-3 flex-1">
          {service.description}
        </p>

        {/* Tech tags - staggered fade in on hover */}
        <div className="flex flex-wrap gap-sm mt-auto pt-md">
          {service.tech.slice(0, 3).map((t, i) => (
            <span
              key={t}
              className="font-syne text-[10px] uppercase tracking-[0.12em] px-[10px] py-[4px] rounded-pill bg-bone text-smoky-black opacity-80 group-hover:opacity-100 transition-all duration-200"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {t}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  )
}

export { ServiceCard }
