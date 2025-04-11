import { z } from 'zod'
import { categorySchema } from '../../categories/data/schema'

export const productSchema = z.object({
  productId: z.number(),
  name: z.string(),
  description: z.string(),
  quantity: z.number(),
  price: z.number(),
  image: z.string(),
  category: categorySchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Product = z.infer<typeof productSchema>
