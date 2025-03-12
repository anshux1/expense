"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { authClient } from "@/lib/auth.config"
import { useEdgeStore } from "@/lib/edgestore"
import { SessionUser } from "@/lib/types"
import { cn } from "@/lib/utils"
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
import { InputField } from "@/components/FormFields"
import { updateUserSchema } from "@/actions/auth/schema"
import { InputTypeUpdateUser } from "@/actions/auth/types"

export default function AccountInfo({ user }: { user: SessionUser }) {
  const { edgestore } = useEdgeStore()
  const [image, setImage] = useState<string | undefined | null>(user.image)
  const [disabled, setDisabled] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const form = useForm<InputTypeUpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      image: user.image || "",
    },
  })

  const { getValues } = form
  useEffect(() => {
    setDisabled(
      getValues("email") === user.email &&
        getValues("name") === user.name &&
        getValues("image") === user.image,
    )
  }, [getValues(), user.email, user.name, user.image])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("File size exceeds 4MB limit")
        return
      }
      const res = await edgestore.publicFiles.upload({
        file,
      })
      setImage(res.url)
      form.setValue("image", res.url)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const onSubmit = async (values: InputTypeUpdateUser) => {
    if (
      values.image === user.image &&
      values.name === user.name &&
      values.email === user.email
    ) {
      return
    }
    const updated = { image: false, name: false, email: false }
    if (values.email === user.email) {
      await authClient.changeEmail(
        {
          newEmail: values.email,
        },
        {
          onSuccess: () => {
            updated.email = true
          },
        },
      )
    }
    if (values.name === user.name || values.image === user.image) {
      await authClient.updateUser(
        {
          name: values.name,
          image: values.image,
        },
        {
          onSuccess: () => {
            updated.name = true
          },
        },
      )
    }
    if (updated.email || updated.name) {
      toast.success("Account updated successfully")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Update your account details here.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "relative flex size-24 items-center justify-center overflow-hidden rounded-full",
                    user.image ? "bg-transparent" : "bg-pink-500",
                  )}
                >
                  <Image
                    src={
                      image ||
                      `https://d1nbslm0j6pual.cloudfront.net/?text=${user.name.charAt(0)}&size=195&bg=ffffff`
                    }
                    alt="Uploaded photo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={triggerFileInput}
                  >
                    {image ? "Change Photo" : "Upload Photo"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    id="photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <InputField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter your name"
            />
            <InputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
          </CardContent>
          <CardFooter>
            <Button disabled={disabled} type="submit">
              Update
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
