"use server"

import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import prisma from "@/db"
import { InputTypeGetStats } from "./types"

export const getBalanceStats = async ({ to, from }: InputTypeGetStats) => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    const userId = session?.user.id
    const totol = await prisma.transaction.groupBy({
      by: ["type"],
      where: {
        userId,
        date: {
          gte: from,
          lte: to,
        },
      },
      _sum: {
        amount: true,
      },
    })
    const data = {
      expense: totol.find((item) => item.type === "expense")?._sum.amount || 0,
      income: totol.find((item) => item.type === "income")?._sum.amount || 0,
    }
    return { data }
  } catch {
    return { error: "Failed to get balance!" }
  }
}

export const getCategoryStats = async ({ from, to }: InputTypeGetStats) => {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id
  const data = await prisma.transaction.groupBy({
    by: ["type", "category", "categoryIcon"],
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  })
  return data
}
