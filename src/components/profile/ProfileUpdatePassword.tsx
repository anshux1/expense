import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAccountDetails } from "@/db/data/account"
import {
  SetPasswordForm,
  UpdatePasswordForm,
} from "./ProfileUpdatePasswordForm"

export async function ProfileUpdatePassword() {
  const accountDetails = await getAccountDetails()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your password and security preferences.
        </CardDescription>
      </CardHeader>
      {!accountDetails?.password ? <SetPasswordForm /> : <UpdatePasswordForm />}
    </Card>
  )
}
