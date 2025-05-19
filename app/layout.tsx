import type React from "react"
import "@/app/globals.css"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Portfolio - Aaron Christian Arenas",
  description: "A modern, interactive portfolio showcasing my work and skills",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
