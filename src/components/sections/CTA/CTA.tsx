'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { Button } from '@/components/ui/Button/Button'

function CTA() {
  return (
    <Section className="bg-smoky-black text-floral-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center text-center gap-xl max-w-[640px] mx-auto"
        >
          <h2 className="font-cormorant text-h2 text-floral-white">
            Ready to build something that lasts?
          </h2>
          <p className="font-syne text-body text-bone opacity-80">
            Tell us about your project. We will get back to you within 24 hours with a clear next step.
          </p>
          <Link href="/contact">
            <Button variant="ghost-dark" size="lg">Start a Project</Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}

export { CTA }
