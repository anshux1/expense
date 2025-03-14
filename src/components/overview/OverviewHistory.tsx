"use client"

import { useEffect, useState } from "react"
import CountUp from "react-countup"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getHistoryStats } from "@/db/data/stats"
import { HistoryData, Timeframe } from "@/db/types"
import { OverviewHistorySelector } from "./OverviewHistorySelector"

export const OverviewHistory = () => {
  const [history, setHistory] = useState<HistoryData[]>([])
  const [timeFrame, setTimeFrame] = useState<Timeframe>("month")
  const [period, setPeriod] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistoryStats({ timeframe: timeFrame, ...period })
      if (data) {
        setHistory(data)
      }
    }
    fetchData()
  }, [timeFrame, period])
  return (
    <div className="max-w-7xl">
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
            <OverviewHistorySelector
              period={period}
              setPeriod={setPeriod}
              timeFrame={timeFrame}
              setTimeFrame={setTimeFrame}
            />

            <div className="flex h-10 gap-2">
              <Badge
                variant={"outline"}
                className="flex items-center gap-2 rounded-none border-none text-sm"
              >
                <div className="size-3.5 rounded-full bg-emerald-500"></div>
                Income
              </Badge>
              <Badge
                variant={"outline"}
                className="flex items-center gap-2 border-none text-sm"
              >
                <div className="size-3.5 rounded-full bg-red-500"></div>
                Expense
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history && (
            <OverviewHistoryChart
              data={history}
              timeFrame={timeFrame}
              height={300}
            />
          )}
          {!history && (
            <Card className="flex h-[300px] flex-col items-center justify-center bg-background">
              No data for the selected period
              <p className="text-sm text-muted-foreground">
                Try selecting a different period or adding new transactions
              </p>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export const OverviewHistoryChart = ({
  data,
  timeFrame,
  height,
}: {
  data: HistoryData[]
  timeFrame: Timeframe
  height: number
}) => {
  return (
    <ResponsiveContainer width={"100%"} height={height}>
      <BarChart height={300} data={data} barCategoryGap={5}>
        <defs>
          <linearGradient id="incomeBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset={"0"} stopColor="#10b981" stopOpacity={"1"} />
            <stop offset={"1"} stopColor="#10b981" stopOpacity={"0"} />
          </linearGradient>

          <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset={"0"} stopColor="#ef4444" stopOpacity={"1"} />
            <stop offset={"1"} stopColor="#ef4444" stopOpacity={"0"} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="5 5"
          strokeOpacity={"0.2"}
          vertical={false}
        />
        <XAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          padding={{ left: 5, right: 5 }}
          dataKey={(data) => {
            const { year, month, day } = data
            const date = new Date(year, month, day || 1)
            if (timeFrame === "year") {
              return date.toLocaleDateString("default", {
                month: "short",
              })
            }
            return date.toLocaleDateString("default", {
              day: "2-digit",
            })
          }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey={"income"}
          label="Income"
          fill="url(#incomeBar)"
          radius={4}
          className="cursor-pointer"
        />
        <Bar
          dataKey={"expense"}
          label="Expense"
          fill="url(#expenseBar)"
          radius={4}
          className="cursor-pointer"
        />
        <Tooltip
          cursor={{ opacity: 0.1 }}
          content={(props) => <CustomTooltip {...props} />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null

  const data = payload[0].payload
  const { expense, income } = data

  return (
    <div className="min-w-[200px] rounded border bg-background p-3">
      <TooltipRow
        label="Expense"
        value={expense}
        bgColor="bg-red-500"
        textColor="text-red-500"
      />
      <TooltipRow
        label="Income"
        value={income}
        bgColor="bg-emerald-500"
        textColor="text-emerald-500"
      />
      <TooltipRow
        label="Balance"
        value={income - expense}
        bgColor="bg-gray-400"
        textColor="text-foreground"
      />
    </div>
  )
}

function TooltipRow({
  label,
  value,
  bgColor,
  textColor,
}: {
  label: string
  textColor: string
  bgColor: string
  value: number
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("size-3", bgColor)} />
      <div className="flex w-full justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn("text-sm font-bold", textColor)}>
          <CountUp
            duration={0.5}
            preserveValue
            end={value}
            decimals={0}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  )
}
