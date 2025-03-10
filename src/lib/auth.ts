import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { openAPI } from "better-auth/plugins"

import prisma from "@/db"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    changeEmail: {
      enabled: true,
    },
  },
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    twitter: {
      clientId: process.env.TWITTER_CLIENT_ID || "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    },
  },
})
