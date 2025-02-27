import React from "react"

import BudgetAddModal from "@/components/budget/BudgetAddModel"
import BudgetCard from "@/components/budget/BudgetCard"
import { getBudgets } from "@/db/data/budget"

export default async function page() {
  const budget = await getBudgets()
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="container flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-3xl font-bold">Budget</p>
          <p className="text-muted-foreground">Create and manage your budget</p>
        </div>
        <BudgetAddModal />
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {budget.map((item, index) => (
          <BudgetCard
            key={index}
            id={item.id}
            amount={item.amount}
            beginningDate={item.beginningDate}
            title={item.budgetName}
            remainingAmount={item.remaining}
            period={item.period}
          />
        ))}
      </div>
    </div>
  )
}
