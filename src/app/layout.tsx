import type { Metadata } from 'next'
import { cormorant, syne } from '@/fonts'
import { Navbar } from '@/components/layout/Navbar/Navbar'
import { Footer } from '@/components/layout/Footer/Footer'
import { SmoothScroll } from '@/components/common/SmoothScroll/SmoothScroll'
import { ScrollProgress } from '@/components/common/ScrollProgress/ScrollProgress'
import { LoadingScreen } from '@/components/common/LoadingScreen/LoadingScreen'
import { CustomCursor } from '@/components/common/CustomCursor/CustomCursor'
import '@/app/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://dimensitylabs.dev'),
  title: { default: 'Dimensity Labs', template: '%s — Dimensity Labs' },
  description:
    'Mumbai-based digital product studio. We build websites, mobile apps, and AI-powered systems.',
  keywords: [
    'digital studio',
    'web development',
    'mobile apps',
    'AI solutions',
    'Mumbai',
    'Next.js',
  ],
  authors: [{ name: 'Dimensity Labs' }],
  creator: 'Dimensity Labs',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://dimensitylabs.dev',
    siteName: 'Dimensity Labs',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', creator: '@dimensitylabs' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${syne.variable} font-syne bg-[var(--color-bg)] text-[var(--color-text-primary)]`}
      >
        <LoadingScreen />
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
