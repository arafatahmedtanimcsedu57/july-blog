import type { Metadata } from 'next'

import React from 'react'

import { AdminBar } from './_components/AdminBar'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import './_css/app.scss'
import { Providers } from './_providers'
import { InitTheme } from './_providers/Theme/InitTheme'
import { mergeOpenGraph } from './_utilities/mergeOpenGraph'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

const server_url = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}:${process.env.NEXT_PUBLIC_SERVER_PORT}`
export const metadata: Metadata = {
  metadataBase: new URL(server_url || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
