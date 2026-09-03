'use client'

import { useEffect, useState } from 'react'

/* The sun/moon orb slider from the theme onboarding card, extracted so it can
   live anywhere (navbar, drawer, onboarding). Flips data-theme — the page
   morphs via CSS transitions — and persists the choice to localStorage. */
export default function ThemeSwitch() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const preferred = () => {
      try {
        const saved = localStorage.getItem('vy_theme')
        if (saved === 'dark' || saved === 'light') return saved
      } catch {}
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    // The pre-paint script in the root layout owns the initial value. If it is
    // ever missing, something removed it after the fact — older React versions
    // strip attributes they don't own off <html> while hydrating — so put it
    // back instead of silently rendering the wrong palette. The observer fires
    // on a microtask, so the restore lands before the next paint.
    const sync = () => {
      const root = document.documentElement
      let current = root.getAttribute('data-theme')
      if (current !== 'dark' && current !== 'light') {
        current = preferred()
        root.setAttribute('data-theme', current)
        root.setAttribute('data-theme-source', 'restored')
      }
      setTheme(current)
    }

    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const current = root.getAttribute('data-theme') || theme
    const next = current === 'dark' ? 'light' : 'dark'
    // Flip the attribute directly — the theme morphs via the CSS transitions on
    // the glass surfaces and the shaders easing their palette. No wipe.
    root.setAttribute('data-theme', next)
    root.setAttribute('data-theme-source', 'saved')

    try {
      localStorage.setItem('vy_theme', next)
    } catch {}
    setTheme(next)
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-notice-switch--editorial"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggleTheme}
    >
      <span>{isDark ? 'Light' : 'Dark'}</span>
      <span className="theme-notice-switch-editorial-rocker" aria-hidden="true">
        <span className="theme-notice-switch-editorial-face">
          <span className="theme-notice-switch-editorial-indicator" />
        </span>
      </span>
    </button>
  )
}
