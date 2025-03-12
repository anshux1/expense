"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { authClient } from "@/lib/auth.config"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { CheckboxField, PasswordField } from "@/components/FormFields"
import { updatePasswordSchema } from "@/actions/auth/schema"
import { InputTypeUpdatePassword } from "@/actions/auth/types"

export function ProfileUpdatePassword() {
  const form = useForm<InputTypeUpdatePassword>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      revokeSessions: false,
    },
  })

  const onSubmit = async (data: InputTypeUpdatePassword) => {
    try {
      const result = await authClient.changePassword({
        newPassword: data.newPassword,
        currentPassword: data.oldPassword,
        revokeOtherSessions: data.revokeSessions,
      })
      if (result.data) toast.success("Password updated successfully")
    } finally {
      form.reset()
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your password and security preferences.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-1">
            <PasswordField
              control={form.control}
              name="oldPassword"
              label="Old Password"
              placeholder="Old password"
            />
            <PasswordField
              control={form.control}
              name="newPassword"
              label="New Password"
              placeholder="Enter your new password"
            />
            <PasswordField
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Enter password again"
            />
            <CheckboxField
              control={form.control}
              name="revokeSessions"
              label="Revoke other sessions"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Update</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
