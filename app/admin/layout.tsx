import type React from "react"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="relative flex min-h-screen flex-col">{children}</div>
}

