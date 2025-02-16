import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { TransactionsTable } from "@/components/transaction/TransactionRecentTable"

export const RecentTransactions = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <CardTitle className="p-5">Recent Transactions</CardTitle>
        <Button variant="ghost" size="icon" className="mr-5">
          <MoreHorizontal className="size-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <TransactionsTable />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
