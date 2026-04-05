import { type FAQ } from '@/types/faq'

export const faqs: readonly FAQ[] = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Most projects take between 4 and 8 weeks from kickoff to launch. Timelines depend on scope — a marketing website ships faster than a full-stack web app. We give you a clear timeline during the scoping call and stick to it.',
  },
  {
    question: 'What is your minimum project budget?',
    answer:
      'Our minimum project cost is ₹15,000. Most projects fall between ₹25,000 and ₹2,00,000 depending on complexity. International clients are welcome — we invoice in USD as well.',
  },
  {
    question: 'Do you work with startups or only established businesses?',
    answer:
      'Both. We work with early-stage startups building their first product and growing businesses scaling their digital presence. What matters is that you are serious about the work and ready to invest in quality.',
  },
  {
    question: 'What happens after the project launches?',
    answer:
      'We do not disappear after launch. Every project includes 30 days of post-launch support for bug fixes and minor adjustments. After that, we offer ongoing maintenance and retainer packages if you need continued development.',
  },
] as const
