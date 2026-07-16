'use client'

import { useEffect, useState } from 'react'

const DISMISS_KEY = 'vy_theme_notice_dismissed'

function readTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light'
}

function readSource() {
  return document.documentElement.getAttribute('data-theme-source') || 'device'
}

export default function ThemeOnboarding() {
  const [theme, setTheme] = useState('light')
  const [source, setSource] = useState('device')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const sync = () => {
      setTheme(readTheme())
      setSource(readSource())
    }

    sync()
    const userAgent = navigator.userAgent || ''
    const isCrawler = /bot|crawl|spider|slurp|mediapartners|lighthouse|headlesschrome|prerender|facebookexternalhit|embedly|quora|whatsapp|telegram|discord|slackbot|bingpreview|pinterest|applebot|yandex|baidu|duckduckbot/i.test(userAgent)
    if (!isCrawler) {
      try {
        setOpen(sessionStorage.getItem(DISMISS_KEY) !== '1')
      } catch {
        setOpen(true)
      }
    }

    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-theme-source'],
    })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') dismiss()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      observer.disconnect()
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {}
  }

  const toggleTheme = (event) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const radius = Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y),
    )
    const applyTheme = () => {
      root.setAttribute('data-theme', next)
      root.setAttribute('data-theme-source', 'saved')
    }

    root.style.setProperty('--theme-x', `${x}px`)
    root.style.setProperty('--theme-y', `${y}px`)
    root.style.setProperty('--theme-radius', `${radius}px`)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduceMotion && document.startViewTransition) {
      document.startViewTransition(applyTheme)
    } else {
      applyTheme()
    }

    try {
      localStorage.setItem('vy_theme', next)
    } catch {}
    setTheme(next)
    setSource('saved')
  }

  if (!open) return null

  const isDark = theme === 'dark'
  const sourceCopy = source === 'device'
    ? 'Matched to your device preference.'
    : 'Using the theme you selected earlier.'

  return (
    <aside className="theme-notice" aria-label="Theme preference">
      <div className="theme-notice-copy">
        <span className="theme-notice-kicker">Appearance</span>
        <p>
          Viewing in <strong>{isDark ? 'dark' : 'light'} mode</strong>.
          <span>{sourceCopy}</span>
        </p>
      </div>

      <div className="theme-notice-actions">
        <button
          type="button"
          className="theme-notice-switch"
          role="switch"
          aria-checked={isDark}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          onClick={toggleTheme}
        >
          <span className="theme-notice-switch-icon theme-notice-switch-icon--sun" aria-hidden="true">☀</span>
          <span className="theme-notice-switch-icon theme-notice-switch-icon--moon" aria-hidden="true">☾</span>
          <span className="theme-notice-switch-orb" aria-hidden="true" />
        </button>
        <button type="button" className="theme-notice-close" onClick={dismiss}>
          Close
        </button>
      </div>
    </aside>
  )
}
