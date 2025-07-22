import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { BlogProvider } from "@/contexts/blog-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OctoHealth ERP - Africa's Leading Health Insurance Platform",
  description:
    "Transform your HMO operations with OctoHealth ERP - the comprehensive health insurance management platform built for African healthcare organizations.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <BlogProvider>{children}</BlogProvider>
      </body>
    </html>
  )
}
