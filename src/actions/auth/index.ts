"use server"

import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { createAction } from "@/lib/create-action"
import { setPasswordSchema } from "./schema"
import { InputTypeSetPassword, ReturnTypeSetPassword } from "./types"

const setPasswordHandler = async (
  values: InputTypeSetPassword,
): Promise<ReturnTypeSetPassword> => {
  try {
    const result = await auth.api.setPassword({
      body: { newPassword: values.newPassword },
      headers: await headers(),
    })
    console.log(result)
    return { data: "Success" }
  } catch (error) {
    console.error(error)
    return { error: "Failed to set password" }
  }
}

export const setPassword = createAction(setPasswordSchema, setPasswordHandler)
