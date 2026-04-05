import { z } from 'zod'

export const valueSchema = z.object({
  symbol: z.string(),
  title: z.string(),
  description: z.string(),
})

export type Value = z.infer<typeof valueSchema>
