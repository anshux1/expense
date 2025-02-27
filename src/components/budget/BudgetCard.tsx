import Link from "next/link"
import { Calendar, Clock, Info, Trash2, TrendingUp } from "lucide-react"

import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface BudgetCardProps {
  id: string
  title: string
  amount: number
  period: string
  remainingAmount: number
  beginningDate: Date
  totalPeriods?: number
  currentPeriod?: number
}

export default function BudgetCard({
  id,
  title,
  amount,
  period,
  remainingAmount,
  beginningDate,
  currentPeriod = 1,
}: BudgetCardProps) {
  const percentRemaining = (remainingAmount / amount) * 100

  // Calculate daily budget
  const getDailyBudget = () => {
    let daysInPeriod = 30 // Default for monthly

    if (period === "daily") {
      daysInPeriod = 1
    } else if (period === "weekly") {
      daysInPeriod = 7
    } else if (period === "yearly") {
      daysInPeriod = 365
    }

    return amount / daysInPeriod
  }

  // Calculate next renewal date
  const getNextRenewalDate = () => {
    const date = new Date(beginningDate)

    if (period === "monthly") {
      date.setMonth(date.getMonth() + currentPeriod)
    } else if (period === "weekly") {
      date.setDate(date.getDate() + currentPeriod * 7)
    } else if (period === "yearly") {
      date.setFullYear(date.getFullYear() + currentPeriod)
    } else if (period === "quarterly") {
      date.setMonth(date.getMonth() + currentPeriod * 3)
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="bg-gradient-to-l from-primary/5 to-primary/0 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <div className="mt-1 flex gap-2">
              <Badge variant="outline" className="capitalize">
                {period}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">{formatCurrency(amount)}</span>
            <p className="text-xs text-muted-foreground">Total Budget</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="size-3.5" />
                Start Date
              </p>
              <p className="font-medium">{formatDate(beginningDate)}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="size-3.5" />
                Next Renewal
              </p>
              <p className="font-medium">{getNextRenewalDate()}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-lg font-semibold">
                {formatCurrency(remainingAmount)}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <TrendingUp className="size-3.5" />
                Per Day
              </p>
              <p className="text-lg font-semibold">
                {formatCurrency(getDailyBudget())}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="mb-1 flex justify-between text-xs">
              <span>{Math.round(percentRemaining)}% remaining</span>
              <span>
                {formatCurrency(remainingAmount)} / {formatCurrency(amount)}
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted">
              <div
                className={`h-2.5 rounded-full ${percentRemaining > 30 ? "bg-primary" : "bg-destructive"}`}
                style={{ width: `${percentRemaining}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pb-3 pt-2">
        <Link href={`/budget/${id}`}>
          <Button variant="outline" size="sm">
            <Info className="mr-1 size-4" />
            Details
          </Button>
        </Link>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-1 size-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}
