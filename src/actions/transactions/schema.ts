import z from "zod"

export const createTransactionSchema = z.object({
  amount: z.coerce.number().positive().multipleOf(0.01),
  description: z.string().optional(),
  date: z.coerce.date(),
  categoryName: z.string(),
  type: z.union([z.literal("income"), z.literal("expense")]),
})

export const deleteTransactionSchema = z.object({
  id: z.string(),
})
