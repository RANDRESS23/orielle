import { z } from 'zod'

export const categorySchema = z.object({
  categoryId: z.number(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Category = z.infer<typeof categorySchema>
