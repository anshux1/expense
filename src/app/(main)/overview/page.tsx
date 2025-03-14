import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OverviewBalanceCard } from "@/components/overview/OverviewBalanceCard"
import { CategoriesCard } from "@/components/overview/OverviewCategoryCard"
import { OverviewHistory } from "@/components/overview/OverviewHistory"
import { RecentTransactions } from "@/components/overview/OverviewRecentTransactions"
import TransactionAddModal from "@/components/transaction/TransactionAddModal"
import { getBalanceStats, getCategoryStats } from "@/db/data/stats"
import { getAllTransactions } from "@/db/data/transactions"

export default async function page() {
  const [transactions, balanceStats, categoryStats] = await Promise.all([
    getAllTransactions(),
    getBalanceStats(),
    getCategoryStats(),
  ])
  return (
    <div className="mx-auto max-w-7xl p-3 sm:px-4 lg:px-6">
      <Card className="mx-auto flex w-full items-end justify-between">
        <CardHeader className="p-5 sm:pb-5">
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Track and Anaylze Your Finantial Performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionAddModal />
        </CardContent>
      </Card>
      <div className="mx-auto my-2 max-w-7xl shrink-0 grid-cols-6 gap-2 space-y-2 transition-[width,height] ease-linear lg:grid lg:space-y-0">
        <div className="col-span-4 flex flex-col gap-2">
          <OverviewBalanceCard data={balanceStats} />
          <RecentTransactions transactions={transactions} />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <div className="w-full space-y-2">
            <CategoriesCard type="income" data={categoryStats || []} />
            <CategoriesCard type="expense" data={categoryStats || []} />
          </div>
        </div>
      </div>
      <OverviewHistory />
    </div>
  )
}
