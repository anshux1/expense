"use server"

import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import prisma from "@/db"
import { InputTypeGetCategories } from "@/db/types"

export const getCategories = async (values: InputTypeGetCategories) => {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user.id
  const result = await prisma.category.findMany({
    where: {
      type: values.type,
      OR: [{ userId }, { public: true }],
    },
    orderBy: {
      name: "asc",
    },
  })
  return result
}
