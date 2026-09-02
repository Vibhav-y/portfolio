'use client'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { ArrowMark } from '../../components/SiteIcons'
import Navbar from '../../components/Navbar'
import { ALL_PROJECTS } from '../../lib/projects'
import styles from './projects.module.css'

const ease = [0.22, 1, 0.36, 1]

function Project({ project, index }) {
  const reduceMotion = useReducedMotion()
  const links = [
    project.link && { href: project.link, label: 'Visit live' },
    project.github && { href: project.github, label: 'View code' },
  ].filter(Boolean)

  return (
    <motion.article className={styles.project} initial={reduceMotion ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.75, ease }}>
      <div className={styles.projectHeader}>
        <span className={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</span>
        <p className={styles.kicker}>{project.label}</p>
        <p className={styles.projectYear}>{project.year} · {project.status}</p>
      </div>
      <div className={styles.projectTitle}><h2>{project.name}</h2><p>{project.summary}</p></div>
      <div className={styles.projectImage}><img src={project.image} alt={`${project.name} interface`} loading={index === 0 ? 'eager' : 'lazy'} /></div>
      <div className={styles.projectFooter}>
        <div className={styles.tagList}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className={styles.links}>{links.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={styles.textLink}>{link.label}<ArrowMark size={15} /></a>)}</div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailContent}>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.detailBlock}><p className={styles.detailLabel}>What it does</p><ul className={styles.featureList}>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
          <div className={styles.detailBlock}><p className={styles.detailLabel}>Build notes</p><ul className={styles.noteList}>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>
          <div className={styles.metaGrid}>{project.stats.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
        </div>
      </div>
    </motion.article>
  )
}

export default function ProjectsIndex() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 28, mass: 0.35 })
  return (
    <div className={`${styles.page} editorial-page`}>
      <motion.div className={styles.scrollProgress} style={{ scaleX: progress }} aria-hidden="true" />
      <Navbar />
      <main>
        <section className={`${styles.hero} editorial-hero`}>
          <div><motion.p className={styles.kicker} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>01 · Project archive</motion.p><motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease }}>The work,<br />in full.</motion.h1></div>
          <motion.div className={styles.heroNote} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22, ease }}><p>Hands-on products where I explore the systems behind collaboration, developer workflows, and practical AI.</p><span>{String(ALL_PROJECTS.length).padStart(2, '0')} detailed case studies</span></motion.div>
        </section>
        <section className={styles.archive} aria-label="Project case studies"><div className={styles.archiveHeading}><span>Selected case studies</span><span>Scroll to read ↓</span></div>{ALL_PROJECTS.map((project, index) => <Project key={project.id} project={project} index={index} />)}</section>
        <section className={styles.contact}><p className={styles.kicker}>Next project</p><h2>Have something<br />worth building?</h2><a href="mailto:vibhavydm@gmail.com" className={styles.contactLink}>Start a conversation <ArrowMark size={17} /></a></section>
      </main>
    </div>
  )
}
