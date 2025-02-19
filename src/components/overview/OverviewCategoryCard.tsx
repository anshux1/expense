"use client"

import { TransactionType } from "@/lib/types"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ReturnTypeCategoryStats } from "@/db/types"

export function CategoriesCard({
  type,
  data,
}: {
  type: TransactionType
  data: ReturnTypeCategoryStats
}) {
  const filteredData = data.filter((el) => el.type === type)
  const total = filteredData.reduce(
    (acc, el) => acc + (el._sum?.amount || 0),
    0,
  )

  return (
    <Card className="col-span-6 h-80 w-full">
      <CardHeader className="p-5">
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          {type === "income" ? "Incomes" : "Expenses"} by category
        </CardTitle>
      </CardHeader>

      <div className="flex items-center justify-between gap-2">
        {filteredData.length === 0 && (
          <div className="flex h-60 w-full flex-col items-center justify-center">
            No data for the selected period
            <p className="text-sm text-muted-foreground">
              Try selecting a different period or try adding new{" "}
              {type === "income" ? "incomes" : "expenses"}
            </p>
          </div>
        )}

        {filteredData.length > 0 && (
          <ScrollArea className="h-60 w-full px-5">
            <div className="flex w-full flex-col gap-3">
              {filteredData.map((item) => {
                const amount = item._sum.amount || 0
                const percentage = (amount * 100) / (total || amount)

                return (
                  <div key={item.category} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-700">
                        {item.categoryIcon} {item.category}
                        <span className="ml-2 text-xs">
                          ({percentage.toFixed(0)}%)
                        </span>
                      </span>
                    </div>
                    <Progress
                      className="h-2 rounded-sm"
                      value={percentage}
                      indicator={
                        type === "income" ? "bg-emerald-500" : "bg-red-500"
                      }
                    />
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  )
}
