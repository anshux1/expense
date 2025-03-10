import z from "zod"

export const signinSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

export const signupSchema = signinSchema.extend({
  name: z.string().min(1, { message: "Name is required" }),
})

export const updateUserSchema = z.object({
  image: z.string().url({ message: "Invalid image url" }).optional(),
  name: z.string({ message: "Invalid name" }).optional(),
  email: z.string({ message: "Invalid email" }).optional(),
})
