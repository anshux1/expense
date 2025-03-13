import z from "zod"

import { User } from "@prisma/client"
import { ActionState } from "@/lib/create-action"
import {
  changePasswordSchema,
  setPasswordSchema,
  signinSchema,
  signupSchema,
  updateUserSchema,
} from "./schema"

export type InputTypeSignIn = z.infer<typeof signinSchema>
export type ReturnTypeSignIn = ActionState<InputTypeSignIn, boolean>

export type InputTypeSignUp = z.infer<typeof signupSchema>

export type InputTypeUpdateUser = z.infer<typeof updateUserSchema>

export type InputTypeChangePassword = z.infer<typeof changePasswordSchema>
export type ReturnTypeChangePassword = ActionState<
  InputTypeChangePassword,
  User
>

export type InputTypeSetPassword = z.infer<typeof setPasswordSchema>
export type ReturnTypeSetPassword = ActionState<InputTypeSetPassword, string>
