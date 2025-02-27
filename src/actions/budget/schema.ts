import z from "zod"

export const createBudgetSchema = z.object({
  name: z.string().min(2, { message: "Name is to short" }),
  period: z.union([
    z.literal("daily"),
    z.literal("weekly"),
    z.literal("monthly"),
    z.literal("yearly"),
  ]),
  amount: z.coerce.number().positive().multipleOf(0.01),
  beginningDate: z.date({ message: "Invalid Date" }),
})
