import {
  BadgePlus,
  CalendarDays,
  ChartColumnBig,
  ChartNoAxesColumn,
  HandCoins,
  RefreshCw,
} from "lucide-react"

import { HistoryData } from "@/db/types"

export const MAX_DATE_RANGE_DAYS = 90

export const historyData: HistoryData[] = [
  { expense: 340, income: 450, year: 2024, month: 0, day: 1 },
  { expense: 50, income: 100, year: 2024, month: 2, day: 2 },
  { expense: 250, income: 600, year: 2024, month: 2, day: 3 },
  { expense: 800, income: 700, year: 2024, month: 3, day: 4 },
  { expense: 300, income: 500, year: 2024, month: 4, day: 5 },
  { expense: 450, income: 800, year: 2024, month: 5, day: 6 },
  { expense: 700, income: 300, year: 2024, month: 6, day: 7 },
  { expense: 450, income: 750, year: 2024, month: 7, day: 8 },
  { expense: 200, income: 900, year: 2024, month: 8, day: 9 },
  { expense: 600, income: 300, year: 2024, month: 9, day: 10 },
  { expense: 800, income: 400, year: 2024, month: 10, day: 11 },
  { expense: 500, income: 200, year: 2024, month: 11, day: 12 },
]

export const toolsData = [
  {
    icon: RefreshCw,
    heading: "Optimizes workflow with app compatibility",
    description:
      "Integrate effortlessly with various applications to streamline workflows and enhance productivity",
  },
  {
    icon: ChartNoAxesColumn,
    heading: "Automatic tracking for every transaction",
    description:
      "Streamline your financial processes by automating tax calculations on all your transactions",
  },
  {
    icon: CalendarDays,
    heading: "Planing feature for wealth management",
    description:
      "Optimize your financial strategy with advanced planning tools tailored for effective wealth management",
  },
  {
    icon: ChartColumnBig,
    heading: "Monthly and yearly financial reports",
    description:
      "Analyze monthly spending trends to track changes and make informed decisions",
  },
  {
    icon: BadgePlus,
    heading: "Custom Categories",
    description:
      "Create custom categories to personalize tracking and stay on target",
  },
  {
    icon: HandCoins,
    heading: "Manage Your Monthly Budget",
    description:
      "Easily create and manage your monthly budget to track expenses and stay on top of your finances",
  },
]
