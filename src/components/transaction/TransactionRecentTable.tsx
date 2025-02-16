import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const transactions = [
  {
    merchant: "iCloud Monthly",
    category: "Premium",
    date: "08 Dec 2024",
    amount: -1000.0,
    status: "Pending",
  },
  {
    merchant: "Shopping",
    category: "Shopping",
    date: "07 Dec 2024",
    amount: -1000.0,
    status: "Complete",
  },
  {
    merchant: "Design Logo",
    category: "Freelance",
    date: "06 Dec 2024",
    amount: 2000.0,
    status: "Complete",
  },
  {
    merchant: "Coffee",
    category: "Eat",
    date: "05 Dec 2024",
    amount: -2000.0,
    status: "Complete",
  },
]

export function TransactionsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Merchant Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.merchant}>
            <TableCell>
              <div className="flex items-center gap-3">
                {transaction.merchant}
              </div>
            </TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{transaction.date}</TableCell>
            <TableCell
              className={
                transaction.amount > 0 ? "text-emerald-600" : "text-red-600"
              }
            >
              {transaction.amount > 0 ? "+" : "-"}$
              {Math.abs(transaction.amount).toFixed(2)}
            </TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={
                  transaction.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-emerald-100 text-emerald-700"
                }
              >
                {transaction.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
