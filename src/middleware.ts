import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth"

import { authRoutes, DEFAULT_REDIRECT, publicRoutes } from "@/lib/auth.routes"

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const isLoggedIn = getSessionCookie(request)

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  if (isAuthRoute || isPublicRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(
        new URL(DEFAULT_REDIRECT, nextUrl).toString(),
      )
    }
    return NextResponse.next()
  }

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", nextUrl))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}
