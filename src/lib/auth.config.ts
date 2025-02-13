import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import authConfig from "@/lib/auth"
import prisma from "@/db"

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub
      }
      await prisma.user.findUnique({
        where: { id: token.sub },
        select: {
          onBoarded: true,
        },
      })
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
