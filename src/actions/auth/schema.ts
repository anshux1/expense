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

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, { message: "Min 6 chars." }),
    newPassword: z.string().min(6, { message: "Min 6 chars." }),
    confirmPassword: z.string().min(6, { message: "Min 6 chars." }),
    revokeSessions: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
