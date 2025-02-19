"use server"

import { headers } from "next/headers"
import { getDaysInMonth } from "date-fns"

import { auth } from "@/lib/auth"
import prisma from "@/db"
import { HistoryData, InputTypeGetHistoryStats } from "@/db/types"

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

export const getHistoryStats = async (values: InputTypeGetHistoryStats) => {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id

  if (!userId) {
    return []
  }

  switch (values.timeframe) {
    case "month":
      return await getMonthlyStats(userId, values.year, values.month)
    case "year":
      return await getYearlyStats(userId, values.year)
  }
}

const getMonthlyStats = async (userId: string, year: number, month: number) => {
  const data = await prisma.monthHistory.groupBy({
    by: ["day"],
    where: {
      userId,
      year: year,
      month: month,
    },
    _sum: {
      expense: true,
      income: true,
    },
    orderBy: [{ day: "asc" }],
  })

  const result: HistoryData[] = []
  const daysInMonth = getDaysInMonth(new Date(year, month, 0))
  for (let i = 1; i <= daysInMonth; i++) {
    let expense = 0
    let income = 0
    const day = data.find((item) => item.day === i)
    if (day) {
      expense = day._sum.expense || 0
      income = day._sum.income || 0
    }

    result.push({
      expense,
      income,
      year,
      month,
      day: i,
    })
  }

  return result
}

const getYearlyStats = async (userId: string, year: number) => {
  const data = await prisma.yearHistory.groupBy({
    by: ["month"],
    where: {
      userId,
      year,
    },
    _sum: {
      expense: true,
      income: true,
    },
    orderBy: [
      {
        month: "asc",
      },
    ],
  })
  const result: HistoryData[] = []

  for (let i = 0; i <= 11; i++) {
    let expense = 0
    let income = 0
    const month = data.find((item) => item.month === i)
    if (month) {
      expense = month._sum.expense || 0
      income = month._sum.income || 0
    }
    result.push({
      expense,
      income,
      year,
      month: i,
    })
  }
  return result
}
