"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { createAction } from "@/lib/create-action"
import prisma from "@/db"
import { createBudgetSchema } from "./schema"
import { InputTypeCreateBudget, ReturnTypeCreateBudget } from "./types"

const createBudgetHandler = async (
  values: InputTypeCreateBudget,
): Promise<ReturnTypeCreateBudget> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.session || !session.user) {
      return { error: "Unauthorized" }
    }

    const userId = session.user.id
    const result = await prisma.budget.create({
      data: {
        userId,
        budgetName: values.name,
        amount: values.amount,
        remaining: values.amount,
        beginningDate: values.beginningDate,
        period: values.period,
        isActive: true,
      },
    })
    revalidatePath("/budget")
    return { data: result }
  } catch {
    return { error: "Failed to create budget" }
  }
}

export const createBudget = createAction(
  createBudgetSchema,
  createBudgetHandler,
)
