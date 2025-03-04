"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"

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

export const BalanceCard = ({ data: { income, expense } }: Props) => {
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
          <Card className="bg-emerald-500/5 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-400/10 p-2">
                <ArrowUpRight className="size-5 text-emerald-500" />
              </div>
              <div>
                <p className="mb-1 text-sm font-medium">Income</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">{income}</h3>
                </div>
              </div>
            </div>
          </Card>
          <Card className="bg-destructive/5 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-destructive/10 p-2">
                <ArrowDownRight className="size-5 text-destructive" />
              </div>
              <div>
                <p className="mb-1 text-sm font-medium">Expends</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold">{expense}</h3>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
