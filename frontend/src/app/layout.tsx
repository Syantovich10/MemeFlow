import type { Metadata } from "next"

import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "ShortFinder",
  description: "Find memorable short videos by meaning, context, and creator.",
}

export default function RootLayout({
                                     children,
                                   }: LayoutProps<"/">) {
  return (
      <html lang="en" className="h-full">
      <body className="min-h-full">
      <Providers>
        {children}
      </Providers>
      </body>
      </html>
  )
}