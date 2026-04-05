import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  service: z.enum(
    [
      'Web',
      'Mobile',
      'AI',
      'Automation',
      'Branding',
      'Strategy',
      'Not sure yet',
    ],
    { message: 'Please select a service' }
  ),
  budget: z
    .enum([
      'Under ₹25K',
      '₹25K–₹75K',
      '₹75K–₹2L',
      'Above ₹2L',
      'International',
    ])
    .optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
