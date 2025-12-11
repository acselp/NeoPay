import { z } from 'zod'

// ============================================================================
// Customer Schema (matching backend CustomerModel with PascalCase)
// ============================================================================

export const customerSchema = z.object({
  Id: z.number().int(),
  FirstName: z.string(),
  LastName: z.string(),
  Email: z.string().email().optional().nullable(),
  Phone: z.string().optional().nullable(),
  AccountNr: z.number().int(),
})

export type Customer = z.infer<typeof customerSchema>

// ============================================================================
// Customer List Schema
// ============================================================================

export const customerListSchema = z.array(customerSchema)
