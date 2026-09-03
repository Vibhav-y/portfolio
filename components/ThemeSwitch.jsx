'use client'

import { useEffect, useState } from 'react'
import { MoonMark, SunMark } from './SiteIcons'
import styles from './ThemeSwitch.module.css'

// Namespaced so a v1 build served from the same origin can't read or clobber
// this value — the two versions keep independent theme preferences.
export const THEME_STORAGE_KEY = 'vy_theme_v2'

export default function ThemeSwitch() {
  const [theme, setTheme] = useState('light')

  // Two switches can be mounted at once (header + open mobile drawer), so both
  // mirror the attribute rather than holding independent state.
  useEffect(() => {
    const sync = () => setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const next = (root.getAttribute('data-theme') || theme) === 'dark' ? 'light' : 'dark'
    // Flip the attribute directly — the palette morphs via the CSS transitions
    // already on the surfaces. No wipe, no re-render of the page.
    root.setAttribute('data-theme', next)
    root.setAttribute('data-theme-source', 'saved')

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
    setTheme(next)
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={styles.switch}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      onClick={toggleTheme}
    >
      <span className={styles.track}>
        <span className={styles.knob} aria-hidden="true" />
        <SunMark size={13} className={`${styles.icon} ${styles.iconSun}`} />
        <MoonMark size={13} className={`${styles.icon} ${styles.iconMoon}`} />
      </span>
    </button>
  )
}
