'use client'

import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { SectionLabel } from '@/components/ui/SectionLabel/SectionLabel'
import { Accordion } from '@/components/common/Accordion/Accordion'
import { faqs } from '@/data/faqs'

function FAQSection() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl">
          {/* Left */}
          <div className="flex flex-col gap-md">
            <SectionLabel accent>FAQ</SectionLabel>
            <h2 className="font-cormorant text-h2 text-[var(--color-text-primary)]">
              Common questions, honest answers
            </h2>
            <p className="font-syne text-body text-[var(--color-text-secondary)] max-w-[440px]">
              If your question is not here, reach out — we are always happy to talk.
            </p>
          </div>

          {/* Right */}
          <Accordion items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
        </div>
      </Container>
    </Section>
  )
}

export { FAQSection }
