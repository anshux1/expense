"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { authClient } from "@/lib/auth.config"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InputField, PasswordField } from "@/components/FormFields"
import { signupSchema } from "@/actions/auth/schema"
import { InputTypeSignUp } from "@/actions/auth/types"

export const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<InputTypeSignUp>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: InputTypeSignUp) => {
    setIsSubmitting(true)
    try {
      await authClient.signUp.email(
        {
          name: values.name,
          email: values.email,
          password: values.password,
          callbackURL: "/overview",
        },
        {
          onSuccess: () => {
            toast.success("Sign up successfully")
          },
          onError: (error) => {
            toast.error(error.error.message)
          },
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 space-y-3">
        <InputField
          className="bg-transparent dark:bg-transparent"
          control={form.control}
          name="name"
          label="Firstname"
          placeholder="Firstname"
        />
        <InputField
          className="bg-transparent dark:bg-transparent"
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@gmail.com"
        />
        <PasswordField
          className="bg-transparent dark:bg-transparent"
          control={form.control}
          name="password"
          label="Password"
          placeholder="Password"
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Please Wait" : "Sign Up"}
        </Button>
      </form>
    </Form>
  )
}
