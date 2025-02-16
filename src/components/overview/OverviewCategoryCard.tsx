"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const incomeChartConfig = {
  visitors: {
    label: "Incomes",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-income-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-income-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-income-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-income-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-income-5))",
  },
} satisfies ChartConfig

const chartConfig = {
  visitors: {
    label: "Incomes",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-expense-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-expense-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-expense-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-expense-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-expense-5))",
  },
} satisfies ChartConfig

export function CategoryCard() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 py-5 pb-0">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Incomes By Category
        </h2>
        <ChartContainer
          config={incomeChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Expenses By Category
        </h2>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
