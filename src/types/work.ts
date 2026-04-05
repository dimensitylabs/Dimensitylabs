import { z } from 'zod'

export const workCategorySchema = z.enum([
  'web',
  'mobile',
  'ai',
  'branding',
  'automation',
])

export type WorkCategory = z.infer<typeof workCategorySchema>

export const workSchema = z.object({
  slug: z.string(),
  title: z.string(),
  type: z.string(),
  category: workCategorySchema,
  year: z.number(),
  coverColor: z.string(),
  tags: z.array(z.string()),
  shortDesc: z.string(),
  overview: z.string().optional(),
  description: z.string().optional(),
  challenge: z.string(),
  solution: z.string(),
  outcome: z.string(),
  outcomes: z.array(z.string()).optional(),
  services: z.array(z.string()),
  techStack: z.array(z.string()),
  tech: z.array(z.string()).optional(),
  testimonial: z
    .object({
      quote: z.string(),
      name: z.string(),
      role: z.string(),
    })
    .optional(),
})

export type Work = z.infer<typeof workSchema>
