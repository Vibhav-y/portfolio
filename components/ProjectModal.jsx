'use client'

import { useEffect, useId, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowMark, CloseMark, CodeMark } from './SiteIcons'
import styles from './ProjectModal.module.css'

function CaseLabel({ children }) {
  return <p className={styles.label}>{children}</p>
}

export default function ProjectModal({ project, onClose, immediate = false }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div className={styles.overlay} initial={immediate ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.24 }} onClick={onClose}>
      <motion.article ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={titleId} initial={immediate ? false : { y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }} onClick={(event) => event.stopPropagation()} style={{ '--project-accent': project.accent }}>
        <button ref={closeRef} className={styles.close} type="button" onClick={onClose} aria-label="Close case study"><CloseMark size={19} /></button>

        <div className={styles.scroll}>
          <header className={styles.header}>
            <div><CaseLabel>{project.label}</CaseLabel><h2 id={titleId}>{project.name}</h2></div>
            <div className={styles.intro}><p>{project.summary}</p><span>{project.year} · {project.status}</span></div>
          </header>

          <div className={styles.story}>
            <figure className={styles.figure}>
              <img src={project.image} alt={`${project.name} interface`} />
              <figcaption>Product interface · {project.year}</figcaption>
            </figure>

            <section><CaseLabel>The project</CaseLabel><p className={styles.lead}>{project.description}</p></section>

            {project.features?.length > 0 && <section><CaseLabel>What I built</CaseLabel><ul className={styles.list}>{project.features.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}</ul></section>}

            {project.highlights?.length > 0 && (
              <section className={styles.wide}><CaseLabel>Key technical decisions</CaseLabel><div className={styles.decisions}>{project.highlights.map((highlight, index) => <div key={highlight}><span>{String(index + 1).padStart(2, '0')}</span><p>{highlight}</p></div>)}</div></section>
            )}

            <section className={`${styles.wide} ${styles.stack}`}><CaseLabel>Built with</CaseLabel><p>{project.tags?.join(' · ')}</p></section>
          </div>
        </div>

        {(project.link || project.github) && <footer className={styles.footer}><span>Explore the project</span><div>{project.github && <a href={project.github} target="_blank" rel="noreferrer"><CodeMark size={16} /> View code</a>}{project.link && <a href={project.link} target="_blank" rel="noreferrer">Visit live <ArrowMark size={16} /></a>}</div></footer>}
      </motion.article>
    </motion.div>
  )
}
