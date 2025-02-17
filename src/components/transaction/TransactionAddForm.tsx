"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { DollarSign, Mail, TrendingDown, TrendingUp } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Category } from "@prisma/client"
import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import FluidTabs from "@/components/ui/fluid-tabs"
import { Form } from "@/components/ui/form"
import { DateField, InputField, SelectField } from "@/components/FormFields"
import { getCategories } from "@/actions/category"
import { createTransaction } from "@/actions/transactions"
import { createTransactionSchema } from "@/actions/transactions/schema"
import { InputTypeCreateTransaction } from "@/actions/transactions/types"
import { ModalClose } from "../ui/modal"

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
  const [categories, setCategories] = useState<Category[]>([])
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

  const type = form.getValues("type")
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories({ type })
      if (categories) {
        setCategories(categories)
      }
    }
    fetchCategories()
  }, [type])

  const { execute, isLoading } = useAction(createTransaction, {
    onSuccess: () => {
      form.reset()
      toast.success("Transaction added successfully")
    },
    onError: (error) => {
      toast.error(error)
    },
  })
  const onSubmit = (values: InputTypeCreateTransaction) => execute(values)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
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
          <SelectField
            control={form.control}
            name="categoryName"
            label="Category"
            placeholder="Select category"
            options={categories.map((item) => ({
              label: `${item.icon} ${item.name}`,
              value: item.name,
            }))}
          />
        </div>
        <div className="flex gap-2 self-end">
          <ModalClose asChild>
            <Button
              variant="secondary"
              type="submit"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </ModalClose>
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Please wait ..." : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
