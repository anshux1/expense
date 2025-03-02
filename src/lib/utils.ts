import { clsx, type ClassValue } from "clsx"
import { addDays, addMonths, addWeeks, addYears } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function DateToUTCDate(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ),
  )
}

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const getEndDate = ({
  beginningDate,
  period,
}: {
  beginningDate: Date
  period: string
}) => {
  const periodMapping: Record<string, (date: Date) => Date> = {
    daily: (date) => date,
    weekly: (date) => addDays(date, 6),
    monthly: (date) => addDays(addMonths(date, 1), -1),
    yearly: (date) => addDays(addYears(date, 1), -1),
  }

  return periodMapping[period](beginningDate)
}

export const periodNextStartMapping: Record<string, (date: Date) => Date> = {
  daily: (date) => addDays(date, 1),
  weekly: (date) => addWeeks(date, 1),
  monthly: (date) => addMonths(date, 1),
  yearly: (date) => addYears(date, 1),
}
