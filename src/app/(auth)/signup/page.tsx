import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Auth0 } from "@/components/auth/Auth0"
import { SignupForm } from "@/components/auth/SignupForm"

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Sign in with your Apple or Google account
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-5">
        <Auth0 />
        <SignupForm />
        <div className="mt-3 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline underline-offset-4">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
