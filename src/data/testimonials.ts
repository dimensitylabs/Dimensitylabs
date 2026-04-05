import { type Testimonial } from '@/types/testimonial'

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      'Dimensity Labs delivered more than we expected — fast, clear, and honest throughout.',
    name: 'Arjun Mehta',
    role: 'Founder & CEO',
    company: 'ScaleUp Inc.',
    initials: 'AM',
  },
  {
    quote:
      'They understood our vision from day one. The final product exceeded every benchmark we set.',
    name: 'Priya Sharma',
    role: 'Head of Product',
    company: 'FinFlow',
    initials: 'PS',
  },
  {
    quote:
      'Working with Dimensity felt like having a senior tech team in-house. Strategic, fast, no fluff.',
    name: 'Rohan Kapoor',
    role: 'CTO',
    company: 'NovaByte',
    initials: 'RK',
  },
] as const
