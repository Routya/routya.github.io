import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Routya - High-Performance Message Dispatching for .NET',
  description: 'Fast, lightweight CQRS message dispatching library built for .NET applications. Competitive with MediatR while offering more flexibility.',
  generator: 'v0.app',
  icons: {
    icon: '/routya-logo.png',
    apple: '/routya-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
