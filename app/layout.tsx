import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Focus Dash - Customer Success Command Centre',
  description: 'Vertical customer success command centre for Tech, Healthcare, and Manufacturing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
