"use  client"

import { ReactNode } from "react"
import { Toaster } from "sonner"

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster richColors position="top-center" />
    </>
  )
}
