import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Auth0 } from "@/components/auth/Auth0"
import { SigninForm } from "@/components/auth/SigninForm"

export default function page() {
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
        <SigninForm />
        <div className="mt-3 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
