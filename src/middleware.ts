import { NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth"

import { DEFAULT_REDIRECT, route } from "@/lib/auth.routes"

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const isLoggedIn = getSessionCookie(request)

  const isApiAuthRoute = nextUrl.pathname.startsWith(route.apiAuthPrefix)
  const isPublicRoute = route.publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = route.authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return NextResponse.next()

  if (isAuthRoute || isPublicRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
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
