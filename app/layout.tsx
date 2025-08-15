import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'A.I. Fixxer - AI Code Security & Performance Analysis',
  description: 'Secure your AI-generated code with A.I. Fixxer. Detect vulnerabilities, optimize performance, and ensure code quality with our AI-powered analysis platform.',
  keywords: ['code security', 'AI code analysis', 'vulnerability scanner', 'performance optimization', 'code quality'],
  authors: [{ name: 'A.I. Fixxer Clone' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/logo.svg',
  },
  openGraph: {
    title: 'A.I. Fixxer - AI Code Security & Performance Analysis',
    description: 'Secure your AI-generated code with A.I. Fixxer. Detect vulnerabilities, optimize performance, and ensure code quality.',
    type: 'website',
    locale: 'en_US',
    images: [{
      url: '/images/logo.svg',
      width: 200,
      height: 200,
      alt: 'A.I. Fixxer Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A.I. Fixxer - AI Code Security & Performance Analysis',
    description: 'Secure your AI-generated code with A.I. Fixxer. Detect vulnerabilities, optimize performance, and ensure code quality.',
    images: ['/images/logo.svg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} h-full antialiased`}>
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  )
}