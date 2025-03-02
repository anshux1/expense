import React from "react"

import BudgetDetails from "@/components/budget/BudgetDetails"
import { getBudgetDetails } from "@/db/data/budget"

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const budgetDetails = await getBudgetDetails(id)
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="container flex flex-wrap items-center justify-between gap-6">
        {budgetDetails ? (
          <BudgetDetails
            id={budgetDetails.budgetDetails.id}
            title={budgetDetails.budgetDetails.budgetName}
            period={budgetDetails.budgetDetails.period}
            currentPeriod={budgetDetails.budgetDetails}
            transactions={budgetDetails.transactions}
            previousPeriods={budgetDetails.previousBudgets}
          />
        ) : (
          <div>No budget details found</div>
        )}
      </div>
    </div>
  )
}
