"use server"

import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import prisma from "@/db"

export const getAllTransactions = async () => {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id
  const data = await prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  })
  return data
}
