import z from "zod"

import { Category } from "@prisma/client"
import { ActionState } from "@/lib/create-action"
import { createCategorySchema, deleteCategorySchema } from "./schema"

export type InputTypeCreateCategory = z.infer<typeof createCategorySchema>
export type ReturnTypeCreateCategory = ActionState<
  InputTypeCreateCategory,
  Category
>

export type InputTypeDeleteCategory = z.infer<typeof deleteCategorySchema>
export type ReturnTypeDeleteCategory = ActionState<
  InputTypeDeleteCategory,
  Category
>
