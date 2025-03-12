import z from "zod"

import { User } from "@prisma/client"
import { ActionState } from "@/lib/create-action"
import {
  signinSchema,
  signupSchema,
  updatePasswordSchema,
  updateUserSchema,
} from "./schema"

export type InputTypeSignIn = z.infer<typeof signinSchema>
export type ReturnTypeSignIn = ActionState<InputTypeSignIn, boolean>

export type InputTypeSignUp = z.infer<typeof signupSchema>

export type InputTypeUpdateUser = z.infer<typeof updateUserSchema>

export type InputTypeUpdatePassword = z.infer<typeof updatePasswordSchema>
export type ReturnTypeUpdatePassword = ActionState<
  InputTypeUpdatePassword,
  User
>
