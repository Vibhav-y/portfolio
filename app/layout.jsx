import { Geist } from 'next/font/google'
import './globals.css'
import EclipseReveal from '../components/EclipseReveal'
import TransitionProvider from '../components/PageTransition'

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
    // suppressHydrationWarning: the head inline script sets data-intro on <html>
    // before hydration (theme-flash pattern), so its attributes intentionally
    // differ from the server HTML.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var show=location.pathname==='/'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;window.__v3Eclipse=show;document.documentElement.setAttribute('data-eclipse',show?'show':'skip');})();` }} />
        {/* Decides the home-page intro curtain BEFORE first paint, so nothing
            flashes. Show it only on a fresh session-open or a hard refresh;
            skip it for in-session navigations back to "/", crawlers, and no-JS.
            Runs in <head> (synchronously, pre-body-paint); the result drives
            CSS (html[data-intro]) and is read by app/page.jsx via __vyIntro. */}
        {/* Theme decided BEFORE first paint (localStorage, else OS preference)
            so there is no light flash. ThemeSwitch reads/writes the same key. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('vy_theme_v3'),s='saved';if(t!=='dark'&&t!=='light'){t='dark';s='default';}document.documentElement.setAttribute('data-theme',t);document.documentElement.setAttribute('data-theme-source',s);}catch(e){document.documentElement.setAttribute('data-theme','dark');document.documentElement.setAttribute('data-theme-source','device');}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var ua=navigator.userAgent||'';var bot=/bot|crawl|spider|slurp|mediapartners|lighthouse|headlesschrome|prerender|facebookexternalhit|embedly|quora|whatsapp|telegram|discord|slackbot|bingpreview|pinterest|applebot|yandex|baidu|duckduckbot/i.test(ua);var reload=false;try{var n=performance.getEntriesByType('navigation')[0];reload=n?n.type==='reload':(performance.navigation&&performance.navigation.type===1);}catch(e){}var seen=false;try{seen=sessionStorage.getItem('vy_intro_seen')==='1';sessionStorage.setItem('vy_intro_seen','1');}catch(e){}var show=!bot&&(reload||!seen);d.setAttribute('data-intro',show?'show':'skip');window.__vyIntro=show;}catch(e){window.__vyIntro=true;document.documentElement.setAttribute('data-intro','show');}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <EclipseReveal />
        <div className="site-grid-bg" aria-hidden="true" />
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  )
}
