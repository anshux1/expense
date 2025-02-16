import z from "zod"

import { Transaction } from "@prisma/client"
import { ActionState } from "@/lib/create-action"
import { createTransactionSchema, deleteTransactionSchema } from "./schema"

export type InputTypeCreateTransaction = z.infer<typeof createTransactionSchema>
export type ReturnTypeCreateTransaction = ActionState<
  InputTypeCreateTransaction,
  Transaction
>

export type InputTypeDeleteTransaction = z.infer<typeof deleteTransactionSchema>
export type ReturnTypeDeleteTransaction = ActionState<
  InputTypeDeleteTransaction,
  Transaction
>
