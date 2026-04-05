import Link from 'next/link'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { Button } from '@/components/ui/Button/Button'

export default function NotFoundPage() {
  return (
    <Section className="min-h-[60vh] flex items-center">
      <Container>
        <div className="flex flex-col items-center text-center gap-xl max-w-[480px] mx-auto">
          <span className="font-cormorant font-light italic text-[96px] leading-none text-olive-drab">
            404
          </span>
          <h1 className="font-cormorant text-h2 text-[var(--color-text-primary)]">
            Page not found
          </h1>
          <p className="font-syne text-body text-[var(--color-text-secondary)]">
            The page you are looking for does not exist. It might have been moved or deleted.
          </p>
          <Link href="/">
            <Button variant="primary">Return Home</Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
