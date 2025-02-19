import { DataTable } from "@/components/transaction/TransactionTable"
import { Columns } from "@/components/transaction/TransactionTableColumn"
import { getAllTransactions } from "@/db/data/transactions"

export default async function page() {
  const transactions = await getAllTransactions()
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 p-4 sm:p-6">
      <DataTable
        showFooter
        showHeader
        columns={Columns}
        data={transactions || []}
      />
    </div>
  )
}
