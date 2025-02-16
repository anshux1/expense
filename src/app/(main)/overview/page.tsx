import React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BalanceCard } from "@/components/overview/OverviewBalanceCard"
import { CategoryCard } from "@/components/overview/OverviewCategoryCard"
import { RecentTransactions } from "@/components/overview/OverviewRecentTransactions"
import { RangePicker } from "@/components/range-picker"

export default function page() {
  return (
    <div className="mx-auto max-w-7xl p-3 sm:px-4 lg:px-6">
      <Card className="mx-auto w-full items-end justify-between sm:flex">
        <CardHeader className="p-5 pb-2 sm:pb-5">
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            Track and Anaylze Your Finantial Performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RangePicker />
        </CardContent>
      </Card>
      <div className="mx-auto my-2 max-w-7xl shrink-0 grid-cols-6 gap-4 transition-[width,height] ease-linear lg:grid">
        <div className="col-span-4 flex flex-col gap-4">
          <BalanceCard />
          <RecentTransactions />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <CategoryCard />
        </div>
      </div>
    </div>
  )
}
