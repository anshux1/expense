import z from "zod"

const passwordSchema = z.string().min(6, { message: "Min 6 chars." })

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

export const setPasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
    revokeSessions: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
