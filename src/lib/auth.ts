import { compare } from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"

import { createAccount } from "@/actions/auth"
import { signinSchema, signupSchema } from "@/actions/auth/schema"
import { getUserByEmail } from "@/db/data/user"

export default {
  providers: [
    Google,
    Twitter,
    Github,
    CredentialsProvider({
      id: "signin",
      name: "credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", placeholder: "Email", type: "email" },
        password: {
          label: "Password",
          placeholder: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const { success, data } = signinSchema.safeParse(credentials)
        if (!success) return null
        const isUserExist = await getUserByEmail(data.email)
        if (!isUserExist) {
          return null
        }

        if (
          isUserExist.password &&
          !compare(data.password, isUserExist.password)
        ) {
          return null
        }
        return isUserExist
      },
    }),
    CredentialsProvider({
      id: "signup",
      name: "signup",
      type: "credentials",
      credentials: {
        name: { label: "Name", placeholder: "Name", type: "text" },
        username: {
          label: "Email",
          placeholder: "example@gmail.com",
          type: "text",
        },
        password: {
          label: "Password",
          placeholder: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        console.log("Inside Signup credentials: ", credentials)
        if (!credentials) throw new Error("No credentials provided")
        const { success, error, data } = signupSchema.safeParse(credentials)
        if (!success) {
          throw new Error(error.errors[0]?.message)
        }
        const userExist = await getUserByEmail(data.email)
        if (userExist) {
          throw new Error("User with username already exist")
        }
        const newUser = createAccount(data)
        return newUser
      },
    }),
  ],
} satisfies NextAuthConfig
