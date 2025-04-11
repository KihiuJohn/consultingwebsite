import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SiteFooter from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
// Import the new header component
import SiteHeaderWithDropdown from "@/components/site-header-with-dropdown"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Expro MS Training & Consulting Ltd",
  description: "Your trusted partner in corporate training and consulting.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            {/* Replace the existing SiteHeader with SiteHeaderWithDropdown in the layout */}
            <SiteHeaderWithDropdown />
            {children}
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'