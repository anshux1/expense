"use client"

import { useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { DollarSign } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ModalClose } from "@/components/ui/modal"
import { DateField, InputField, RadioGroupField } from "@/components/FormFields"
import { createBudget } from "@/actions/budget"
import { createBudgetSchema } from "@/actions/budget/schema"
import { InputTypeCreateBudget } from "@/actions/budget/types"

export default function BudgetAddForm() {
  const date = new Date()
  const [currentPeriod, setCurrentPeriod] = useState<{ from: Date; to: Date }>()
  const form = useForm<InputTypeCreateBudget>({
    resolver: zodResolver(createBudgetSchema),
    defaultValues: {
      name: "",
      beginningDate: new Date(date.getUTCFullYear(), date.getUTCMonth(), 1),
      period: "monthly",
    },
  })

  const selectedPeriod = form.watch("period")
  const selectedBeginningDate = form.watch("beginningDate")
  useMemo(() => {
    const periodMap = {
      daily: { days: 1, months: 0, years: 0 },
      weekly: { days: 7, months: 0, years: 0 },
      monthly: { days: 0, months: 1, years: 0 },
      yearly: { days: 0, months: 0, years: 1 },
    }

    const { days, months, years } = periodMap[selectedPeriod] || {}
    if (days !== undefined) {
      setCurrentPeriod({
        from: selectedBeginningDate,
        to: new Date(
          selectedBeginningDate.getUTCFullYear() + years,
          selectedBeginningDate.getUTCMonth() + months,
          selectedBeginningDate.getUTCDate() + days,
        ),
      })
    }
  }, [selectedPeriod, selectedBeginningDate])

  const { execute, isLoading } = useAction(createBudget, {
    onSuccess: () => {
      form.reset()
      toast.success("Budget created successfully")
    },
    onError: (error) => {
      toast.error(error)
    },
  })
  const onSubmit = (values: InputTypeCreateBudget) => {
    console.log(values)
    execute(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col space-y-5"
      >
        <InputField
          label="Budget Name"
          className="w-full"
          control={form.control}
          placeholder="Food, Education, etc."
          name="name"
          type="text"
        />
        <RadioGroupField
          control={form.control}
          label="Period"
          name="period"
          options={["daily", "weekly", "monthly", "yearly"]}
        />
        <div className="grid grid-cols-2 items-center gap-3">
          <div className="relative">
            <InputField
              control={form.control}
              label="Amount"
              name="amount"
              className="pe-9"
              placeholder="Amount"
              type="number"
            />
            <DollarSign
              className="absolute inset-y-3 end-2 flex h-full w-4 items-center justify-center rounded-e-lg text-muted-foreground/80"
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
          <DateField
            label="Beginning"
            control={form.control}
            name="beginningDate"
          />
        </div>
        {
          <div>
            Current Period:{" "}
            {currentPeriod?.from.toLocaleString("en-Us", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}{" "}
            to{" "}
            {currentPeriod?.to.toLocaleString("en-Us", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </div>
        }
        <div className="flex gap-2 self-end">
          <ModalClose asChild>
            <Button
              size="sm"
              variant="secondary"
              type="submit"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </ModalClose>
          <Button
            size="sm"
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
