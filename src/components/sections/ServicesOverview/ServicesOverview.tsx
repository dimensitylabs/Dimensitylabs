'use client'

import Link from 'next/link'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { SectionLabel } from '@/components/ui/SectionLabel/SectionLabel'
import { Button } from '@/components/ui/Button/Button'
import { ServiceCard } from '@/components/common/ServiceCard/ServiceCard'
import { services } from '@/data/services'

function ServicesOverview() {
  return (
    <Section className="bg-[var(--color-surface-alt)]">
      <Container>
        <div className="flex flex-col gap-2xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg">
            <div className="flex flex-col gap-md">
              <SectionLabel accent>What We Do</SectionLabel>
              <h2 className="font-cormorant text-h2 text-[var(--color-text-primary)]">
                End-to-end digital services
              </h2>
            </div>
            <Link href="/services">
              <Button variant="ghost" size="sm">All Services</Button>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { ServicesOverview }
