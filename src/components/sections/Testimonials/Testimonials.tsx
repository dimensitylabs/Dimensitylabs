'use client'

import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { SectionLabel } from '@/components/ui/SectionLabel/SectionLabel'
import { TestimonialCard } from '@/components/common/TestimonialCard/TestimonialCard'
import { testimonials } from '@/data/testimonials'

function Testimonials() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-2xl">
          <div className="flex flex-col gap-md max-w-[540px]">
            <SectionLabel accent>Client Words</SectionLabel>
            <h2 className="font-cormorant text-h2 text-[var(--color-text-primary)]">
              Trust is built through delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { Testimonials }
