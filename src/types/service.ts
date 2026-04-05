import { z } from 'zod'

export const serviceSchema = z.object({
  slug: z.string(),
  number: z.string(),
  title: z.string(),
  description: z.string(),
  longDescription: z.string(),
  tech: z.array(z.string()),
  scope: z.array(z.string()),
  deliverables: z.array(z.string()).optional(),
  icon: z.string(),
  relatedWorks: z.array(z.string()),
})

export type Service = z.infer<typeof serviceSchema>
