"use server"

import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import prisma from "@/db"

export const getBudgets = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id
  const result = await prisma.budget.findMany({
    where: {
      userId,
      isActive: true,
    },
    orderBy: {
      beginningDate: "asc",
    },
  })
  return result
}
