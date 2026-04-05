'use client'

import Link from 'next/link'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { SectionLabel } from '@/components/ui/SectionLabel/SectionLabel'
import { Button } from '@/components/ui/Button/Button'
import { WorkCard } from '@/components/common/WorkCard/WorkCard'
import { works } from '@/data/works'

function FeaturedWorks() {
  const featured = works.slice(0, 3)

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-2xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg">
            <div className="flex flex-col gap-md">
              <SectionLabel accent>Selected Work</SectionLabel>
              <h2 className="font-cormorant text-h2 text-[var(--color-text-primary)]">
                Projects that speak for themselves
              </h2>
            </div>
            <Link href="/works">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {featured.map((work, index) => (
              <WorkCard key={work.slug} work={work} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { FeaturedWorks }
