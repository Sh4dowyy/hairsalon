import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Na'Kris Stuudio",
  description: "Laia valiku teenustega professionaalne ilusalong",
  metadataBase: new URL('https://nakrisstuudio.ee'),
  openGraph: {
    type: "website",
    locale: "et",
    url: "https://nakrisstuudio.ee",
    title: "Na'Kris Stuudio",
    description: "Laia valiku teenustega professionaalne ilusalong",
    siteName: "Na'Kris Stuudio",
    images: [
      {
        url: "/og-image.jpg", // We'll create this image
        width: 1200,
        height: 630,
        alt: "Na'Kris Stuudio - Professionaalne ilusalong"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Na'Kris Stuudio",
    description: "Laia valiku teenustega professionaalne ilusalong",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="et" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

