"use client"

import Image from "next/image"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

export const Auth0 = () => {
  const handleAuth = (provider: "google" | "github" | "twitter") => {
    signIn(provider, {
      redirectTo: "/dashboard",
    })
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          variant="outline"
          className="w-full"
          onClick={() => handleAuth("google")}
        >
          <Image src="/google.svg" alt="Google logo" width={20} height={20} />
          Login with Google
        </Button>
        <Button
          type="submit"
          variant="outline"
          className="w-full"
          onClick={() => handleAuth("twitter")}
        >
          <Image src="/twitter.svg" alt="Google logo" width={20} height={20} />
          Login with X
        </Button>
        <Button
          type="submit"
          variant="outline"
          className="w-full"
          onClick={() => handleAuth("github")}
        >
          <Image src="/github.svg" alt="Google logo" width={20} height={20} />
          Login with Github
        </Button>
      </div>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
  )
}
