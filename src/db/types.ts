import { getBalanceStats, getCategoryStats } from "./data/stats"
import { getAllTransactions } from "./data/transactions"

export type InputTypeGetCategories = {
  type: "expense" | "income"
}

export type ReturnTypeBalanceStats = Awaited<ReturnType<typeof getBalanceStats>>
export type ReturnTypeCategoryStats = Awaited<
  ReturnType<typeof getCategoryStats>
>

export type ReturnTypeGetTransactions = Awaited<
  ReturnType<typeof getAllTransactions>
>
