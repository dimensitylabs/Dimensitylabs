import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { SectionLabel } from '@/components/ui/SectionLabel/SectionLabel'
import { AboutIntro } from '@/components/sections/AboutIntro/AboutIntro'
import { Timeline } from '@/components/sections/Timeline/Timeline'
import { Testimonials } from '@/components/sections/Testimonials/Testimonials'
import { CTA } from '@/components/sections/CTA/CTA'
import { values } from '@/data/values'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Dimensity Labs is a Mumbai-based digital product studio. We build websites, mobile apps, and AI-powered systems.',
}

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <Timeline />

      {/* Values */}
      <Section className="bg-[var(--color-surface-alt)]">
        <Container>
          <div className="flex flex-col gap-2xl">
            <div className="flex flex-col gap-md max-w-[540px]">
              <SectionLabel accent>Our Values</SectionLabel>
              <h2 className="font-cormorant text-h2 text-[var(--color-text-primary)]">
                What we believe in
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
              {values.map((value, i) => (
                <div key={value.title} className="group flex flex-col gap-md">
                  <span
                    className={`text-olive-drab text-[20px] inline-block transition-all duration-300 ease-out group-hover:scale-[1.4] origin-center ${i % 2 === 0 ? 'group-hover:rotate-[5deg]' : 'group-hover:rotate-[-5deg]'}`}
                  >
                    {value.symbol}
                  </span>
                  <h3 className="font-cormorant text-h3 text-[var(--color-text-primary)]">
                    {value.title}
                  </h3>
                  <p className="font-syne text-body text-[var(--color-text-secondary)]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Testimonials />
      <CTA />
    </>
  )
}
