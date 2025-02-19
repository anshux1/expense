"use server"

import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import prisma from "@/db"

export const getHistoryPeriods = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id

  const result = await prisma.monthHistory.findMany({
    where: {
      userId,
    },
    select: {
      year: true,
    },
    distinct: ["year"],
    orderBy: [
      {
        year: "asc",
      },
    ],
  })

  const years = result.map((item) => item.year)
  if (years.length === 0) {
    return [new Date().getFullYear()]
  }

  return years
}
