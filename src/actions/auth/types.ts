import z from "zod"

import { ActionState } from "@/lib/create-action"
import { signinSchema, signupSchema, updateUserSchema } from "./schema"

export type InputTypeSignIn = z.infer<typeof signinSchema>
export type ReturnTypeSignIn = ActionState<InputTypeSignIn, boolean>

export type InputTypeSignUp = z.infer<typeof signupSchema>

export type InputTypeUpdateUser = z.infer<typeof updateUserSchema>
