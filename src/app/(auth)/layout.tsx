import Link from "next/link"
import { Wallet } from "lucide-react"

import { cn } from "@/lib/utils"

export default function LoginPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 self-center text-lg font-semibold"
        >
          <div className="flex size-8 items-center justify-center rounded-md text-primary">
            <Wallet className="size-6" />
          </div>
          ExpenseVault
        </Link>
        <div className={cn("flex flex-col gap-6")}>
          {children}
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  )
}
