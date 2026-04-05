'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { type ContactFormData, contactFormSchema } from '@/types/contact'
import { Container } from '@/components/layout/Container/Container'
import { Section } from '@/components/layout/Section/Section'
import { AnimatedSectionLabel } from '@/components/common/AnimatedSectionLabel/AnimatedSectionLabel'
import { AnimatedHeadline } from '@/components/common/AnimatedHeadline/AnimatedHeadline'
import { Input } from '@/components/ui/Input/Input'
import { Textarea } from '@/components/ui/Textarea/Textarea'
import { Select } from '@/components/ui/Select/Select'
import { Button } from '@/components/ui/Button/Button'

const serviceOptions = [
  { value: 'Web', label: 'Web Design & Development' },
  { value: 'Mobile', label: 'Mobile App Development' },
  { value: 'AI', label: 'AI Solutions' },
  { value: 'Automation', label: 'AI Automation' },
  { value: 'Branding', label: 'Digital Branding' },
  { value: 'Strategy', label: 'Consulting & Strategy' },
  { value: 'Not sure yet', label: 'Not sure yet' },
]

const budgetOptions = [
  { value: 'Under ₹25K', label: 'Under ₹25K' },
  { value: '₹25K–₹75K', label: '₹25K – ₹75K' },
  { value: '₹75K–₹2L', label: '₹75K – ₹2L' },
  { value: 'Above ₹2L', label: 'Above ₹2L' },
  { value: 'International', label: 'International (USD)' },
]

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to send message')

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl">
          {/* Left: Info */}
          <div className="flex flex-col gap-xl">
            <div className="flex flex-col gap-md">
              <AnimatedSectionLabel accent>Get in Touch</AnimatedSectionLabel>
              <AnimatedHeadline as="h2">Tell us about your project</AnimatedHeadline>
              <p className="font-syne text-body text-[var(--color-text-secondary)] max-w-[440px]">
                Fill out the form and we will get back to you within 24 hours. Or reach us directly at{' '}
                <a
                  href="mailto:hello@dimensitylabs.dev"
                  className="underline underline-offset-4 hover:text-[var(--color-text-primary)] transition-colors duration-slow"
                >
                  hello@dimensitylabs.dev
                </a>
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <Input
                label="Name"
                placeholder="Your name"
                error={errors.name?.message}
                {...register('name')}
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <Input
              label="Company"
              placeholder="Company name (optional)"
              {...register('company')}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <Select
                label="Service"
                options={serviceOptions}
                placeholder="Select a service"
                error={errors.service?.message}
                {...register('service')}
              />
              <Select
                label="Budget"
                options={budgetOptions}
                placeholder="Select budget range"
                {...register('budget')}
              />
            </div>

            <Textarea
              label="Message"
              placeholder="Tell us about your project, goals, and timeline..."
              rows={5}
              error={errors.message?.message}
              {...register('message')}
            />

            <Button
              type="submit"
              variant="primary"
              disabled={status === 'submitting'}
              className="self-start"
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </Button>

            <AnimatePresence mode="wait">
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-center gap-sm overflow-hidden"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3A6B4A" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <p className="font-syne text-[13px] text-[#3A6B4A]">
                    Message sent successfully. We will be in touch within 24 hours.
                  </p>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, x: 0 }}
                  animate={{ opacity: 1, y: 0, x: [0, -4, 4, -4, 4, 0] }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    y: { duration: 0.2 },
                    x: { duration: 0.4, delay: 0.1 },
                  }}
                  className="flex items-center gap-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B3A3A" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  <p className="font-syne text-[13px] text-[#8B3A3A]">
                    Something went wrong. Please try again or email us directly.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </Container>
    </Section>
  )
}

export { ContactForm }
