"use client"

import { endOfMonth } from "date-fns"
import { Calendar, IndianRupee, TrendingUp } from "lucide-react"

import { Budget, Transaction } from "@prisma/client"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTable } from "../transaction/TransactionTable"
import { Columns } from "../transaction/TransactionTableColumn"

interface BudgetDetailsProps {
  id: string
  title: string
  period: string
  currentPeriod: Budget
  transactions: Transaction[]
  previousPeriods: Budget[]
}

export default function BudgetDetails({
  title,
  period,
  transactions,
  currentPeriod,
  previousPeriods,
}: BudgetDetailsProps) {
  return (
    <div className="container mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Badge variant="outline" className="capitalize">
          {period}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Period (#{previousPeriods.length + 1})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center space-x-4">
              <Calendar className="size-10 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Date Range</p>
                <p className="text-nowrap text-xl font-bold">
                  {formatDate(currentPeriod.beginningDate)} -{" "}
                  {formatDate(currentPeriod.endDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <IndianRupee className="size-10 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Budget Amount</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(currentPeriod.amount)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <TrendingUp className="size-10 text-primary" />
              <div>
                <p className="text-sm font-medium">Remaining Amount</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(currentPeriod.remaining)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Budget transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={Columns} data={transactions || []} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Previous Periods</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Budget Amount</TableHead>
                <TableHead>Remaining Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previousPeriods.length ? (
                previousPeriods.map((period, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index}</TableCell>
                    <TableCell>
                      {formatDate(period.beginningDate)} -{" "}
                      {formatDate(endOfMonth(period.beginningDate))}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(period.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(period.remaining)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-14 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
