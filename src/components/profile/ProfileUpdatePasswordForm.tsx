"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { authClient } from "@/lib/auth.config"
import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { CheckboxField, PasswordField } from "@/components/FormFields"
import { setPassword } from "@/actions/auth"
import { changePasswordSchema, setPasswordSchema } from "@/actions/auth/schema"
import {
  InputTypeChangePassword,
  InputTypeSetPassword,
} from "@/actions/auth/types"

export const UpdatePasswordForm = () => {
  const form = useForm<InputTypeChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      revokeSessions: false,
    },
  })

  const onSubmit = async (data: InputTypeChangePassword) => {
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
  )
}

export const SetPasswordForm = () => {
  const form = useForm<InputTypeSetPassword>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })
  const { execute, isLoading } = useAction(setPassword, {
    onSuccess: () => {
      toast.success("Password set successfully")
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const onSubmit = async (data: InputTypeSetPassword) => execute(data)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-1">
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
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading} type="submit">
            Update
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}
