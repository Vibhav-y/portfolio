import { Geist } from 'next/font/google'
import './globals.css'

const SITE_URL = 'https://vibhavy.dev'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Vibhav Yadav — Full-Stack Developer',
  description: 'Full-stack developer crafting performant products with stunning UI & real-world impact.',
  keywords: ['Vibhav Yadav', 'Full-Stack Developer', 'Portfolio', 'React', 'Next.js', 'Web Developer'],
  authors: [{ name: 'Vibhav Yadav', url: SITE_URL }],
  creator: 'Vibhav Yadav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Vibhav Yadav',
    title: 'Vibhav Yadav — Full-Stack Developer',
    description: 'Full-stack developer crafting performant products with stunning UI & real-world impact.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibhav Yadav — Full-Stack Developer',
    description: 'Full-stack developer crafting performant products with stunning UI & real-world impact.',
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  )
}
