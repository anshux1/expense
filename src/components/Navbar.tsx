import Link from "next/link"
import { Wallet } from "lucide-react"

import { AccountDropdown } from "./AccountDropdown"

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col justify-center">
        <header className="flex h-16 w-full items-center justify-between pl-4 pr-1 sm:px-4 lg:px-6">
          <Link className="flex items-center justify-center" href="/">
            <Wallet className="size-6" />
            <span className="ml-2 text-lg font-bold">ExpenseVault</span>
          </Link>
          <AccountDropdown />
        </header>
      </div>
    </div>
  )
}
