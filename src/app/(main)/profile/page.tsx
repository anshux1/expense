import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { SessionUser } from "@/lib/types"
import AccountInfo from "@/components/profile/ProfileAccountInfo"

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return (
    <div className="mx-auto max-w-7xl overflow-x-hidden p-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Account Settings</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <AccountInfo user={session?.user as SessionUser} />
      </div>
    </div>
  )
}
