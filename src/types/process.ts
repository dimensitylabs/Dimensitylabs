import { z } from 'zod'

export const processPhaseSchema = z.object({
  number: z.string(),
  label: z.string(),
  title: z.string(),
  description: z.string(),
  deliverables: z.array(z.string()),
  duration: z.string(),
})

export type ProcessPhase = z.infer<typeof processPhaseSchema>
