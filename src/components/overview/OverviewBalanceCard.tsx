"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ReturnTypeBalanceStats } from "@/db/types"

interface Props {
  data: ReturnTypeBalanceStats
}

export const OverviewBalanceCard = ({ data: { income, expense } }: Props) => {
  const balance = income - expense
  return (
    <Card>
      <CardHeader className="flex w-full flex-row justify-between">
        <div>
          <p className="mb-1 text-sm text-muted-foreground">My Balance</p>
          <CardTitle className="inline">{balance}</CardTitle>
          <CardDescription className="mt-1 text-xs text-muted-foreground">
            Your Balance in Month
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2">
          <BalanceCard type="income" data={income} />
          <BalanceCard type="expense" data={expense} />
        </div>
      </CardContent>
    </Card>
  )
}

interface BalanceCardProps {
  type: "income" | "expense"
  data: number
  className?: string
}

export const BalanceCard = ({ data, type, className }: BalanceCardProps) => {
  return (
    <Card
      className={cn(
        `${type === "income" ? "border-emerald-100 bg-emerald-500/10" : "border-destructive/10 bg-destructive/5"} p-4`,
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={`rounded-lg ${type === "income" ? "bg-emerald-500/20" : "bg-destructive/10"} p-2`}
        >
          {type === "income" ? (
            <ArrowUpRight className="size-5 text-emerald-500" />
          ) : (
            <ArrowDownRight className="size-5 text-destructive" />
          )}
        </div>
        <div>
          <p className="mb-1 text-sm font-medium capitalize">{type}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold">{data}</h3>
          </div>
        </div>
      </div>
    </Card>
  )
}
