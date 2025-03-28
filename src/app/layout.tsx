import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import "@/styles/globals.css"

import RootProvider from "@/components/RootProvider"

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ExpenseVault",
  description: "A finance management app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
