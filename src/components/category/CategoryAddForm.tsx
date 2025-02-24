"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import EmojiPicker, { Theme } from "emoji-picker-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { TransactionType } from "@/lib/types"
import { useAction } from "@/hooks/useAction"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { createCategory } from "@/actions/category"
import { createCategorySchema } from "@/actions/category/schema"
import { InputTypeCreateCategory } from "@/actions/category/types"
import { InputField } from "../FormFields"

export const CategoryAddForm = ({ type }: { type: TransactionType }) => {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<InputTypeCreateCategory>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      type: type,
      icon: "",
      name: "",
    },
  })
  const { execute, isLoading } = useAction(createCategory, {
    onSuccess: () => {
      form.reset()
      toast.success("Category added successfully")
    },
    onError: (error) => {
      toast.error(error)
    },
  })
  const onSubmit = (data: InputTypeCreateCategory) => execute(data)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="text-center text-7xl">{form.getValues("icon")}</div>
        <InputField
          control={form.control}
          name="name"
          label="Category Name"
          placeholder="Food, Education, Salary, etc."
        />
        <Button
          className="h-20 w-full cursor-pointer rounded-xl border py-2 text-center"
          variant="outline"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          Select icon
        </Button>
        <EmojiPicker
          className="w-full"
          open={isOpen}
          lazyLoadEmojis={false}
          onEmojiClick={(emoji) => {
            form.setValue("icon", emoji.emoji)
            setIsOpen(false)
          }}
          searchDisabled
          theme={Theme.LIGHT}
        />
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={() => onSubmit(form.getValues())}
        >
          {isLoading ? "Adding..." : "Add Category"}
        </Button>
      </form>
    </Form>
  )
}
