import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logout } from "./Logout"

const items = {
  links: ["Overview", "Budget", "Transactions", "Categories"],
  profile: ["Profile", "Settings"],
}

export async function AccountDropdown() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-md">
            {session?.user && (
              <Image
                src={
                  session.user.image ||
                  "https://prepmedics.blob.core.windows.net/prepmedics/IMG-20210730-WA0004.jpg"
                }
                className="size-5 rounded-full"
                alt="Profile"
                width={18}
                height={18}
              />
            )}
          </div>
          <span className="truncate font-semibold">
            {session?.user.name.split(" ").at(0)}
          </span>
          <ChevronDown className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {items.links.map((item) => (
            <Link
              key={item}
              href={`/${item.at(0)?.toLowerCase() + item.slice(1)}`}
            >
              <DropdownMenuItem>
                <Image
                  src={`/links/${item}.svg`}
                  className="size-4"
                  alt={item}
                  width={18}
                  height={18}
                />
                <span>{item}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {items.profile.map((item) => (
            <Link
              key={item}
              href={`/${item.at(0)?.toLowerCase() + item.slice(1)}`}
            >
              <DropdownMenuItem>
                <Image
                  src={`/links/${item}.svg`}
                  className="size-4"
                  alt={item}
                  width={18}
                  height={18}
                />
                <span>{item}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Logout varient="nav" />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
