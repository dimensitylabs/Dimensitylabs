import type { Metadata } from 'next'
import { ProcessOverview } from '@/components/sections/ProcessOverview/ProcessOverview'
import { CTA } from '@/components/sections/CTA/CTA'

export const metadata: Metadata = {
  title: 'Process',
  description:
    'How we work at Dimensity Labs — a structured four-phase process from discovery to delivery.',
}

export default function ProcessPage() {
  return (
    <>
      <ProcessOverview />
      <CTA />
    </>
  )
}
