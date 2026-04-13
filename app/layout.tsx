import './globals.css'
import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: false,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aetheris — Global Intelligence Nexus',
  description: 'Stay informed with curated news on Technology, AI, Markets, Science, and Global Affairs. Beautifully organized, always current.',
  keywords: ['news', 'aggregator', 'AI', 'technology', 'markets', 'UPSC'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body className="font-body bg-primary text-text-primary antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}
