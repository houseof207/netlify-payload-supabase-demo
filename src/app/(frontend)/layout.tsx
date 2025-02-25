import React from 'react'
import { Open_Sans, Oswald } from 'next/font/google'
import { Header } from '@/Header/Component'
import { Footer } from '@/Footer/Component'
import './globals.css'

const openSans = Open_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-open-sans' })
const oswald = Oswald({ subsets: ['latin'], display: 'swap', variable: '--font-oswald' })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${openSans.variable} ${oswald.variable}`} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="antialiased lg:text-lg xl:text-xl">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
