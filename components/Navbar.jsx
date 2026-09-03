'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import ThemeSwitch from './ThemeSwitch'
import BrandMark from './BrandMark'
import { ArrowMark, CloseMark, MenuMark } from './SiteIcons'
import styles from './Navbar.module.css'

const defaultChapters = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
]

export default function Navbar({ chapters = defaultChapters }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const onHome = pathname === '/'
  const sectionHref = (id) => (onHome ? `#${id}` : `/#${id}`)
  const mobileLinks = onHome ? chapters.slice(1) : defaultChapters
  const journalNumber = String(mobileLinks.length + 1).padStart(2, '0')

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = previousOverflow }
  }, [menuOpen])

  return <>
    <header className={styles.header}>
      <a className={styles.brand} href={onHome ? '#home' : '/'} aria-label="Vibhav Yadav, home"><BrandMark className={styles.brandMark} /><span className={styles.brandName}>Vibhav Yadav</span></a>
      <nav className={styles.desktopNav} aria-label="Primary navigation"><a href={sectionHref('work')}>Work</a><a href={sectionHref('about')}>About</a><Link href="/blog">Journal</Link><a href="/resume/general%20cv.pdf" target="_blank" rel="noreferrer">Resume <ArrowMark size={13} /></a><ThemeSwitch /></nav>
      <button className={styles.menuButton} type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>{menuOpen ? <CloseMark size={20} /> : <MenuMark size={20} />}</button>
    </header>
    <AnimatePresence>{menuOpen && <motion.nav className={styles.mobileNav} initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} aria-label="Mobile navigation">{mobileLinks.map((chapter, index) => <a key={chapter.id} href={sectionHref(chapter.id)} onClick={() => setMenuOpen(false)}><span>{String(index + 1).padStart(2, '0')}</span>{chapter.label}</a>)}<Link href="/blog" onClick={() => setMenuOpen(false)}><span>{journalNumber}</span>Journal</Link><div><ThemeSwitch /></div></motion.nav>}</AnimatePresence>
  </>
}
