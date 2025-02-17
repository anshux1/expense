"use client"

import { timeRange } from "@/store/timeRange"
import { differenceInDays } from "date-fns"
import { useAtom } from "jotai"
import { toast } from "sonner"

import { MAX_DATE_RANGE_DAYS } from "@/lib/constants"
import { DateRangePicker } from "./ui/date-range-picker"

export const RangePicker = () => {
  const [dateRange, setDateRange] = useAtom(timeRange)

  return (
    <DateRangePicker
      initialDateFrom={dateRange.from}
      initialDateTo={dateRange.to}
      showCompare={false}
      onUpdate={(values) => {
        const { from, to } = values.range
        // We update the date range only if both dates are set

        if (!from || !to) return
        if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
          toast.error(
            `The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`,
          )
          return
        }

        setDateRange({ from, to })
      }}
    />
  )
}
