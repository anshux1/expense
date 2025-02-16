"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { DollarSign, Mail, TrendingDown, TrendingUp } from "lucide-react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import FluidTabs from "@/components/ui/fluid-tabs"
import { Form } from "@/components/ui/form"
import { DateField, InputField } from "@/components/FormFields"
import { createTransaction } from "@/actions/transactions"
import { createTransactionSchema } from "@/actions/transactions/schema"
import { InputTypeCreateTransaction } from "@/actions/transactions/types"

export const TransactionsTabs = [
  {
    id: "income",
    label: "Income",
    icon: <TrendingUp size={18} className="text-green-500" />,
  },
  {
    id: "expense",
    label: "Expense",
    icon: <TrendingDown className="text-red-500" size={18} />,
  },
]

export default function TransactionAddForm() {
  const form = useForm<InputTypeCreateTransaction>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: "income",
      amount: 0,
      description: "",
      date: new Date(Date.now()),
    },
  })
  const activeTab = form.getValues("type")
  const onSubmit = (values: InputTypeCreateTransaction) =>
    createTransaction(values)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex w-full items-center text-center text-4xl">
          <DollarSign size={40} />
          <InputField
            className="w-full border-none p-0 text-center text-4xl font-bold shadow-none focus:outline-none focus-visible:ring-0 md:text-4xl"
            control={form.control}
            name="amount"
            type="number"
          />
        </div>

        <FluidTabs
          activeTab={activeTab}
          setActiveTabAction={(value: string) =>
            form.setValue("type", value === "income" ? "income" : "expense")
          }
          tabs={TransactionsTabs}
        />
        <div className="relative">
          <InputField
            control={form.control}
            name="description"
            className="pe-9"
            placeholder="Description"
            type="text"
          />
          <Mail
            className="absolute inset-y-0 end-2 flex h-full w-4 items-center justify-center rounded-e-lg text-muted-foreground/80"
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
        <div className="grid grid-cols-2 items-center gap-3">
          <DateField
            label="Transaction date"
            control={form.control}
            name="date"
          />
        </div>
        <Button
          type="submit"
          className="z-[200] w-full rounded-full"
          disabled={true}
        >
          {true ? "Adding..." : "Add Transaction"}
        </Button>
      </form>
    </Form>
  )
}
