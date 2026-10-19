import { Schibsted_Grotesk, Geist_Mono, Caveat } from 'next/font/google'
import './globals.css'
import EclipseReveal from '../components/EclipseReveal'
import TransitionProvider from '../components/PageTransition'

// Type system: Switzer for headlines, reading and controls, plus a mono
// for labels. Self-hosted by next/font, exposed as CSS variables and mapped
// to --font-* tokens in globals.css.
const uiSans = Schibsted_Grotesk({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--ff-sans',
  display: 'swap',
})
const labelMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--ff-mono',
  display: 'swap',
})
const personalHand = Caveat({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--ff-hand',
  display: 'swap',
})

const SITE_URL = 'https://vibhavy.dev'
const CANONICAL_URL = 'https://vibhavy.dev/'

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
    url: CANONICAL_URL,
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
    canonical: CANONICAL_URL,
  },
}

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the head inline script sets data-eclipse on <html>
    // before hydration (theme-flash pattern), so its attributes intentionally
    // differ from the server HTML.
    <html lang="en" data-theme="light" className={`${uiSans.variable} ${labelMono.variable} ${personalHand.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&amp;display=swap" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){var crawler=/bot|crawler|spider|slurp|bingpreview|facebookexternalhit|facebot|twitterbot|linkedinbot|embedly|quora link preview|pinterest|whatsapp|telegrambot|discordbot|applebot|google-inspectiontool|lighthouse|headlesschrome/i.test(navigator.userAgent);var show=!crawler&&location.pathname==='/'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;window.__v3Eclipse=show;document.documentElement.setAttribute('data-eclipse',show?'show':'skip');})();` }} />
        <link rel="icon" href="/favicon.png?v=4" type="image/png" />
      </head>
      <body>
        <EclipseReveal />
        <div className="site-grid-bg" aria-hidden="true" />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  )
}
