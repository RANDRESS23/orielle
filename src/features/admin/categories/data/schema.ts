import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const categorySchema = z.object({
  categoryId: z.number(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Category = z.infer<typeof categorySchema>
