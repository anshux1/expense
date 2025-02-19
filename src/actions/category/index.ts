"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

import { auth } from "@/lib/auth"
import { createAction } from "@/lib/create-action"
import prisma from "@/db"
import { createCategorySchema, deleteCategorySchema } from "./schema"
import {
  InputTypeCreateCategory,
  InputTypeDeleteCategory,
  ReturnTypeCreateCategory,
  ReturnTypeDeleteCategory,
} from "./types"

const createCategoryHandler = async (
  values: InputTypeCreateCategory,
): Promise<ReturnTypeCreateCategory> => {
  const session = await auth.api.getSession({ headers: await headers() })
  console.log("Session:", session)
  if (!session?.session || !session.user) {
    return { error: "Unauthorized" }
  }
  const userId = session.user.id
  try {
    const result = await prisma.category.create({
      data: {
        userId,
        public: false,
        icon: values.icon,
        name: values.name,
        type: values.type,
      },
    })
    revalidatePath("/dashboard")
    return { data: result }
  } catch (error) {
    console.error(error)
    return { error: "Failed to create Category!" }
  }
}

const deleteCategoryHandler = async (
  values: InputTypeDeleteCategory,
): Promise<ReturnTypeDeleteCategory> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session?.session || !session.user) {
      return { error: "Unauthorized" }
    }
    const userId = session.user.id

    const result = await prisma.category.delete({
      where: {
        name_userId_type: {
          userId,
          name: values.name,
          type: values.type,
        },
      },
    })
    revalidatePath("/categories")
    return { data: result }
  } catch {
    return { error: "Failed to delete Category!" }
  }
}

export const createCategory = createAction(
  createCategorySchema,
  createCategoryHandler,
)
export const deleteCategory = createAction(
  deleteCategorySchema,
  deleteCategoryHandler,
)
