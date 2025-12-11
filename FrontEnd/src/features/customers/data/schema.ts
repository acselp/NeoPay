import { z } from 'zod'

// ============================================================================
// Customer Status Schema
// ============================================================================

export const customerStatusSchema = z.enum(['active', 'inactive', 'pending'])
export type CustomerStatus = z.infer<typeof customerStatusSchema>

// ============================================================================
// Customer Schema
// ============================================================================

export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  country: z.string(),
  status: customerStatusSchema,
  totalOrders: z.number().int().nonnegative(),
  totalSpent: z.number().nonnegative(),
  createdAt: z.coerce.date(),
})

export type Customer = z.infer<typeof customerSchema>

// ============================================================================
// Customer List Schema
// ============================================================================

export const customerListSchema = z.array(customerSchema)
