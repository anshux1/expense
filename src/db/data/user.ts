import prisma from "@/db"

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}
