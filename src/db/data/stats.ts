"use server"

import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import prisma from "@/db"

export const getBalanceStats = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id
  const totol = await prisma.transaction.groupBy({
    by: ["type"],
    where: {
      userId,
    },
    _sum: {
      amount: true,
    },
  })
  const data = {
    expense: totol.find((item) => item.type === "expense")?._sum.amount || 0,
    income: totol.find((item) => item.type === "income")?._sum.amount || 0,
  }
  return data
}

export const getCategoryStats = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id
  const data = await prisma.transaction.groupBy({
    by: ["type", "category", "categoryIcon"],
    where: {
      userId,
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
