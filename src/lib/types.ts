import { authClient } from "./auth.config"

export type TransactionType = "income" | "expense"
export type SessionUser = typeof authClient.$Infer.Session.user
