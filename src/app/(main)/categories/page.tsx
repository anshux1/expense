import React from "react"
import { Separator } from "@radix-ui/react-select"
import { TrendingDown, TrendingUp } from "lucide-react"

import { Category } from "@prisma/client"
import { TransactionType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import CategoryAddModal from "@/components/category/CategoryAddModal"
import { getCategories } from "@/db/data/category"

export default function page() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-4 sm:p-6">
      <div className="container flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-3xl font-bold">Categories</p>
          <p className="text-muted-foreground">
            Create and manage your categories
          </p>
        </div>
      </div>
      <div className="container flex flex-col gap-4">
        <CategoryList type="income" />
        <CategoryList type="expense" />
      </div>
    </div>
  )
}

async function CategoryList({ type }: { type: TransactionType }) {
  const categories = await getCategories({ type })
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {type === "expense" ? (
              <TrendingDown className="size-12 items-center rounded-lg bg-red-400/10 p-2 text-red-500" />
            ) : (
              <TrendingUp className="size-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
            )}
            <div>
              {type === "income" ? "Incomes" : "Expenses"} categories
              <div className="text-sm text-muted-foreground">
                Sorted by name
              </div>
            </div>
          </div>
          {type === "income" ? (
            <CategoryAddModal type="income" />
          ) : (
            <CategoryAddModal type="expense" />
          )}
        </CardTitle>
      </CardHeader>
      <Separator />
      {!categories && (
        <div className="flex h-40 w-full flex-col items-center justify-center">
          <p>
            No
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500",
              )}
            >
              {type}
            </span>
            categories yet
          </p>

          <p className="text-sm text-muted-foreground">
            Create one to get started
          </p>
        </div>
      )}
      {categories && (
        <div className="grid grid-flow-row grid-cols-2 gap-2 p-2 sm:grid-flow-row sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((category: Category) => (
            <CategoryCard category={category} key={category.name} />
          ))}
        </div>
      )}
    </Card>
  )
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex border-separate flex-col justify-between rounded-md border shadow-sm shadow-black/[0.1] transition-all duration-100 hover:border-primary dark:shadow-white/[0.1]">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
    </div>
  )
}
