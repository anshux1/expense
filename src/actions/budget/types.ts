import z from "zod"

import { Budget } from "@prisma/client"
import { ActionState } from "@/lib/create-action"
import { createBudgetSchema } from "./schema"

export type InputTypeCreateBudget = z.infer<typeof createBudgetSchema>
export type ReturnTypeCreateBudget = ActionState<InputTypeCreateBudget, Budget>
