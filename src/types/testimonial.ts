import { z } from 'zod'

export const testimonialSchema = z.object({
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  company: z.string(),
  initials: z.string(),
})

export type Testimonial = z.infer<typeof testimonialSchema>
