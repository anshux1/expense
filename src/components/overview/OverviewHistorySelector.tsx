import { useEffect, useState } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getHistoryPeriods } from "@/db/data/periods"
import { Period, Timeframe } from "@/db/types"

interface Props {
  period: Period
  setPeriod: (period: Period) => void
  timeFrame: Timeframe
  setTimeFrame: (timeFrame: Timeframe) => void
}

export const OverviewHistorySelector = ({
  period,
  setPeriod,
  setTimeFrame,
  timeFrame,
}: Props) => {
  const [years, setYears] = useState<number[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const years = await getHistoryPeriods()
      setYears(years)
    }
    fetchData()
  }, [])
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tabs
        value={timeFrame}
        onValueChange={(value) => setTimeFrame(value as Timeframe)}
      >
        <TabsList>
          <TabsTrigger value="year">Year</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-wrap items-center gap-2">
        <YearSelector period={period} setPeriod={setPeriod} years={years} />
        {timeFrame === "month" && (
          <MonthSelector period={period} setPeriod={setPeriod} />
        )}
      </div>
    </div>
  )
}

interface YearSelectorProps {
  period: Period
  setPeriod: (period: Period) => void
  years: number[]
}

const YearSelector = ({ period, setPeriod, years }: YearSelectorProps) => {
  return (
    <Select
      value={period.year.toString()}
      onValueChange={(value) => {
        setPeriod({ ...period, year: parseInt(value) })
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

interface MonthSelectorProps {
  period: Period
  setPeriod: (period: Period) => void
}

const MonthSelector = ({ period, setPeriod }: MonthSelectorProps) => {
  return (
    <Select
      value={period.month.toString()}
      onValueChange={(value) => {
        setPeriod({ ...period, month: parseInt(value) })
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
          const monthName = new Date(period.year, month, 1).toLocaleString(
            "default",
            { month: "long" },
          )
          return (
            <SelectItem key={month} value={month.toString()}>
              {monthName}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
