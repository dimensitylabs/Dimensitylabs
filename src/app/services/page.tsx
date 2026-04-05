import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { SectionLabel } from '@/components/ui/SectionLabel/SectionLabel'
import { ServiceCard } from '@/components/common/ServiceCard/ServiceCard'
import { services } from '@/data/services'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'End-to-end digital services — web development, mobile apps, AI solutions, automation, branding, and consulting.',
}

export default function ServicesPage() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-2xl">
          {/* Header */}
          <div className="flex flex-col gap-md max-w-[540px]">
            <SectionLabel accent>What We Do</SectionLabel>
            <h1 className="font-cormorant text-h1 text-[var(--color-text-primary)]">
              End-to-end digital services
            </h1>
            <p className="font-syne text-body text-[var(--color-text-secondary)]">
              From strategy to execution — we handle every stage of your digital product lifecycle.
            </p>
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
