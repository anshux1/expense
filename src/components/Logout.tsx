"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { authClient } from "@/lib/auth.config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export const Logout = ({
  varient,
  className,
}: {
  varient: "nav" | "button"
  className?: string
}) => {
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
  return varient === "nav" ? (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut />
      <span>Log out</span>
    </DropdownMenuItem>
  ) : (
    <div className="mt-6">
      <Button
        variant="outline"
        className={cn("w-full", className)}
        onClick={handleLogout}
      >
        <LogOut className="mr-2 size-4" />
        Log Out
      </Button>
    </div>
  )
}
