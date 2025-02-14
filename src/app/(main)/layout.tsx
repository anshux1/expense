import React, { ReactNode } from "react"

import Navbar from "@/components/Navbar"

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
