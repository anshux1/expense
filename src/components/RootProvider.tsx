"use  client"

import { ReactNode } from "react"
import { Toaster } from "sonner"

import { EdgeStoreProvider } from "@/lib/edgestore"

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <EdgeStoreProvider>
        {children}
        <Toaster richColors position="top-center" />
      </EdgeStoreProvider>
    </>
  )
}
