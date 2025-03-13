import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import prisma from "@/db"

export const getAccountDetails = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return await prisma.account.findFirst({
    where: { userId: session?.user.id, providerId: "credential" },
  })
}
