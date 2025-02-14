"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { authClient } from "@/lib/auth.config"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export const Logout = () => {
  const router = useRouter()
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
      },
    })
  }
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      <span>Log out</span>
    </DropdownMenuItem>
  )
}
