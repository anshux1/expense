"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Transaction } from "@prisma/client"
import { Badge } from "../ui/badge"

export interface Transactions {
  id: string
  amount: number
  date: Date
  description: string
  type: string
  category: {
    name: string
  }
  userId: string
  createdAt: Date
}

export const Columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div
        className="flex cursor-pointer items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 size-2" />
      </div>
    ),
    cell: ({ row }) => {
      const data = row.original
      return (
        <>
          <Badge
            variant="secondary"
            className={
              data.type === "expense"
                ? "bg-rose-100 text-rose-700"
                : "bg-emerald-100 text-emerald-700"
            }
          >
            {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
          </Badge>
        </>
      )
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="ml-5">Description</div>,
    cell: ({ row }) => (
      <div className="ml-5 text-nowrap">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div
        className="flex cursor-pointer items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="ml-2 size-2" />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formattedAmount = new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "INR",
      }).format(amount)
      return <div className="font-medium">{formattedAmount}</div>
    },
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className={`text-nowrap font-medium`}>
          {data.categoryIcon} {data.category}
        </div>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <div
        className="flex cursor-pointer items-center text-nowrap"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Transaction Date
        <ArrowUpDown className="ml-2 size-2" />
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("date")
      const formatedDate = new Date(date as string).toLocaleString("en-Us", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
      return <div className="font-medium">{formatedDate}</div>
    },
  },
]
