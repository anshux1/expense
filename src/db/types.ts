import z from "zod"

import { getBalanceStats, getCategoryStats } from "./data/stats"
import { getAllTransactions } from "./data/transactions"
import { getHistoryStatsSchema } from "./schema"

export type InputTypeGetCategories = {
  type?: "expense" | "income"
}
export type Timeframe = "month" | "year"
export type Period = { year: number; month: number }

export type HistoryData = {
  expense: number
  income: number
  year: number
  month: number
  day?: number
}

export type InputTypeGetHistoryStats = z.infer<typeof getHistoryStatsSchema>

export type ReturnTypeBalanceStats = Awaited<ReturnType<typeof getBalanceStats>>
export type ReturnTypeCategoryStats = Awaited<
  ReturnType<typeof getCategoryStats>
>

export type ReturnTypeGetTransactions = Awaited<
  ReturnType<typeof getAllTransactions>
>
