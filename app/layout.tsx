import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'

export const metadata: Metadata = {
  title: 'Abdulazez Zeinu',
  description: 'Full Stack Developer | Optimization Addict | AI Enthusiast',
  generator: 'abzaeko@gmail.com',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-PRMYJQGP5Z" />
    </html>
  )
}
