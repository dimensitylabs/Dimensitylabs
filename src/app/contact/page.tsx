import type { Metadata } from 'next'
import { ContactForm } from '@/components/sections/ContactForm/ContactForm'
import { FAQSection } from '@/components/sections/FAQSection/FAQSection'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Dimensity Labs. Tell us about your project and we will respond within 24 hours.',
}

export default function ContactPage() {
  return (
    <>
      <ContactForm />
      <FAQSection />
    </>
  )
}
