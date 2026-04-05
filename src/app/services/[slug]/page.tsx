import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { Breadcrumb } from '@/components/common/Breadcrumb/Breadcrumb'
import { WorkCard } from '@/components/common/WorkCard/WorkCard'
import { services } from '@/data/services'
import { works } from '@/data/works'

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return { title: 'Not Found' }
  return {
    title: service.title,
    description: service.description,
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  const relatedWorks = works.filter((w) =>
    service.relatedWorks.some((r) => w.slug === r)
  )

  return (
    <>
      <Section className="pb-0">
        <Container>
          <div className="flex flex-col gap-xl max-w-[720px]">
            <Breadcrumb
              items={[
                { label: 'Services', href: '/services' },
                { label: service.title },
              ]}
            />

            <span className="font-syne text-ui uppercase tracking-[0.18em] text-olive-drab">
              {service.number}
            </span>

            <h1 className="font-cormorant text-h1 text-[var(--color-text-primary)]">
              {service.title}
            </h1>

            <p className="font-syne text-body text-[var(--color-text-secondary)]">
              {service.description}
            </p>
          </div>
        </Container>
      </Section>

      {/* Scope */}
      <Section className="bg-[var(--color-surface-alt)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl">
            <div className="flex flex-col gap-md">
              <h2 className="font-cormorant text-h3 text-[var(--color-text-primary)]">
                What We Do
              </h2>
              <ul className="flex flex-col gap-sm">
                {service.scope.map((item) => (
                  <li
                    key={item}
                    className="font-syne text-body text-[var(--color-text-secondary)] flex items-start gap-sm"
                  >
                    <span className="text-olive-drab mt-[8px] text-[6px]">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-md">
              <h2 className="font-cormorant text-h3 text-[var(--color-text-primary)]">
                Technology
              </h2>
              <div className="flex flex-wrap gap-sm">
                {service.tech.map((t) => (
                  <span
                    key={t}
                    className="font-syne text-[10px] uppercase tracking-[0.12em] px-[12px] py-[5px] rounded-pill bg-bone text-smoky-black"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h2 className="font-cormorant text-h3 text-[var(--color-text-primary)] mt-lg">
                Deliverables
              </h2>
              <ul className="flex flex-col gap-sm">
                {(service.deliverables ?? service.scope).map((d: string) => (
                  <li
                    key={d}
                    className="font-syne text-body text-[var(--color-text-secondary)] flex items-start gap-sm"
                  >
                    <span className="text-olive-drab mt-[8px] text-[6px]">●</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Work */}
      {relatedWorks.length > 0 && (
        <Section>
          <Container>
            <div className="flex flex-col gap-2xl">
              <h2 className="font-cormorant text-h3 text-[var(--color-text-primary)]">
                Related Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
                {relatedWorks.map((work, index) => (
                  <WorkCard key={work.slug} work={work} index={index} />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section className="bg-smoky-black text-floral-white">
        <Container>
          <div className="flex flex-col items-center text-center gap-xl max-w-[640px] mx-auto">
            <h2 className="font-cormorant text-h3 text-floral-white">
              Ready to get started?
            </h2>
            <Link href="/contact">
              <Button variant="ghost-dark" size="lg">
                Start a Project
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}

import { Button } from '@/components/ui/Button/Button'
