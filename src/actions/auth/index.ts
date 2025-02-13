"use server"

import { hash } from "bcryptjs"

import { User } from "@prisma/client"
import { signIn } from "@/lib/auth.config"
import prisma from "@/db"
import { InputTypeSignUp } from "./types"

export const handleSignIn = async (provider: string) => {
  const result = await signIn(provider)
  console.log(result)
}

export const createAccount = async (values: InputTypeSignUp): Promise<User> => {
  const hashedPassword = await hash(values.password, 10)
  const newUser = await prisma.user.create({
    data: {
      name: values.name,
      email: values.email,
      password: hashedPassword,
    },
  })
  return newUser
}
