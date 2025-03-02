"use server"

import { headers } from "next/headers"

import { Budget, Transaction } from "@prisma/client"
import { auth } from "@/lib/auth"
import prisma from "@/db"

export const getBudgets = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id
  const result = await prisma.budget.findMany({
    where: {
      userId,
      isActive: true,
    },
    orderBy: {
      beginningDate: "asc",
    },
  })
  return result
}

export const getBudgetDetails = async (id: string) => {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id
  const budgetDetails = await prisma.budget.findUnique({
    where: {
      id,
    },
    include: {
      transactions: true,
    },
  })

  const previousBudgets = await prisma.budget.findMany({
    where: {
      budgetName: budgetDetails?.budgetName,
      isActive: false,
      userId,
    },
    orderBy: {
      beginningDate: "asc",
    },
  })
  if (budgetDetails) {
    const result: {
      budgetDetails: Budget
      transactions: Transaction[]
      previousBudgets: Budget[]
    } = {
      budgetDetails: {
        id: budgetDetails.id,
        budgetName: budgetDetails.budgetName,
        amount: budgetDetails.amount,
        beginningDate: budgetDetails.beginningDate,
        isActive: budgetDetails.isActive,
        period: budgetDetails.period,
        remaining: budgetDetails.remaining,
        userId: budgetDetails.userId,
        endDate: budgetDetails.endDate,
      },
      transactions: budgetDetails?.transactions,
      previousBudgets,
    }
    return result
  }
}
