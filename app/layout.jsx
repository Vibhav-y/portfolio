import './globals.css'
import './editorial.css'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set the saved theme before first paint to prevent a light-mode flash.
            Key is namespaced (vy_theme_v2) so v1 on the same origin can't clobber it.
            Must stay in sync with THEME_STORAGE_KEY in components/ThemeSwitch.jsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vy_theme_v2'),s='saved';if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';s='device';}document.documentElement.setAttribute('data-theme',t);document.documentElement.setAttribute('data-theme-source',s);}catch(e){document.documentElement.setAttribute('data-theme','light');document.documentElement.setAttribute('data-theme-source','device');}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
