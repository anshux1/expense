"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { createAction } from "@/lib/create-action"
import prisma from "@/db"
import { createTransactionSchema, deleteTransactionSchema } from "./schema"
import {
  InputTypeCreateTransaction,
  InputTypeDeleteTransaction,
  ReturnTypeCreateTransaction,
  ReturnTypeDeleteTransaction,
} from "./types"

const createTransactionHandler = async (
  values: InputTypeCreateTransaction,
): Promise<ReturnTypeCreateTransaction> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.session || !session.user) {
      return { error: "Unauthorized" }
    }
    const userId = session.user.id
    const { type, amount, categoryName, date, description } = values
    const category = await prisma.category.findFirst({
      where: {
        name: categoryName,
        OR: [{ userId }, { public: true }],
      },
    })

    if (!category) {
      return { error: "Category not found" }
    }
    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          userId,
          amount,
          description: description || "",
          date,
          type,
          category: category.name,
          categoryIcon: category.icon,
          budgetId: values.type === "income" ? undefined : values.budget,
        },
      })

      await tx.monthHistory.upsert({
        where: {
          day_month_year_userId: {
            day: date.getUTCDate(),
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
            userId,
          },
        },
        create: {
          userId,
          day: date.getUTCDate(),
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
          income: type === "income" ? amount : 0,
          expense: type === "expense" ? amount : 0,
        },
        update: {
          expense: {
            increment: type === "expense" ? amount : 0,
          },
          income: {
            increment: type === "income" ? amount : 0,
          },
        },
      })

      await tx.yearHistory.upsert({
        where: {
          month_year_userId: {
            userId,
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
          },
        },
        create: {
          userId,
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
          expense: type === "expense" ? amount : 0,
          income: type === "income" ? amount : 0,
        },
        update: {
          expense: {
            increment: values.type === "expense" ? values.amount : 0,
          },
          income: {
            increment: values.type === "income" ? values.amount : 0,
          },
        },
      })
      if (values.budget?.length) {
        await prisma.budget.update({
          where: {
            id: values.budget,
          },
          data: {
            remaining: {
              decrement: values.amount,
            },
          },
        })
      }
      return transaction
    })
    revalidatePath("/overview")
    return { data: result }
  } catch (error) {
    console.log(error)
    return { error: "Error creating transaction!" }
  }
}

const deleteTransactionHandler = async (
  values: InputTypeDeleteTransaction,
): Promise<ReturnTypeDeleteTransaction> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.session || !session.user) {
      return { error: "Unauthorized" }
    }
    const userId = session.user.id
    const transaction = await prisma.transaction.findFirst({
      where: {
        userId,
        id: values.id,
      },
    })

    if (!transaction) {
      return { error: "Transaction not found" }
    }

    await prisma.$transaction(async (tx) => {
      tx.transaction.delete({
        where: { id: values.id, userId: "" },
      })

      tx.monthHistory.update({
        where: {
          day_month_year_userId: {
            userId: "",
            day: transaction.date.getUTCDate(),
            month: transaction.date.getUTCMonth(),
            year: transaction.date.getUTCFullYear(),
          },
        },
        data: {
          income: {
            decrement: transaction.type === "income" ? transaction.amount : 0,
          },
          expense: {
            decrement: transaction.type === "expense" ? transaction.amount : 0,
          },
        },
      })

      tx.yearHistory.update({
        where: {
          month_year_userId: {
            userId: "",
            month: transaction.date.getUTCMonth(),
            year: transaction.date.getUTCFullYear(),
          },
        },
        data: {
          income: {
            decrement: transaction.type === "income" ? transaction.amount : 0,
          },
          expense: {
            decrement: transaction.type === "expense" ? transaction.amount : 0,
          },
        },
      })
    })

    revalidatePath("/transactions")
    return { data: transaction }
  } catch {
    return { error: "Error deleting transaction" }
  }
}

export const createTransaction = createAction(
  createTransactionSchema,
  createTransactionHandler,
)

export const deleteTransaction = createAction(
  deleteTransactionSchema,
  deleteTransactionHandler,
)
