import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReturnTypeGetTransactions } from "@/db/types"
import { DataTable } from "../transaction/TransactionTable"
import { Columns } from "../transaction/TransactionTableColumn"

export const RecentTransactions = ({
  transactions,
}: {
  transactions: ReturnTypeGetTransactions
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <CardTitle className="p-5">Recent Transactions</CardTitle>
        <Link href="/transactions">
          <Button variant="outline" className="mr-5 w-auto">
            View all
            <ArrowUpRight className="size-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="max-h-96 px-5 pb-1.5">
        <DataTable
          showHeader={false}
          pageSize={5}
          columns={Columns}
          data={transactions || []}
        />
      </CardContent>
    </Card>
  )
}
