'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import ProjectModal from '../../components/ProjectModal'
import { ArrowUpRight } from 'lucide-react'
import { ALL_PROJECTS } from '../../lib/projects'
import BrandMark from '../../components/BrandMark'
import theme from '../../components/Playground.module.css'
import s from './projects.module.css'

function ProjectCard({ project, index, onOpen }) {
  const [imageBroken, setImageBroken] = useState(false)
  const Preview = project.placeholder ? 'div' : 'button'
  return (
    <article className={s.card}>
      <div className={s.meta}><span>{String(index + 1).padStart(2, '0')} / {project.label}</span><span>{project.placeholder ? 'Coming soon' : project.status}</span></div>
      <Preview className={s.preview} {...(!project.placeholder && { type: 'button', onClick: () => onOpen(project), 'aria-label': `Read about ${project.name}`, 'aria-haspopup': 'dialog' })}>
        {project.image && !imageBroken ? <img src={project.image} alt={`${project.name} application preview`} loading="lazy" onError={() => setImageBroken(true)} /> : <div className={s.placeholder}><span aria-hidden="true">↗</span>{project.name}</div>}
      </Preview>
      <div className={s.story}>
        <span className={s.year}>{project.year}</span>
        <h2>{project.name}</h2>
        <p className={s.summary}>{project.summary}</p>
        {project.tags?.length > 0 && <div className={s.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
        {!project.placeholder && <details className={s.details}>
          <summary>Explore the build <span aria-hidden="true">+</span></summary>
          {project.description && <p>{project.description}</p>}
          {project.features?.length > 0 && <><h3>Key features</h3><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></>}
          {project.highlights?.length > 0 && <><h3>Technical highlights</h3><ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></>}
          {project.stats?.length > 0 && <dl className={s.stats}>{project.stats.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
        </details>}
        {(!project.placeholder || project.link || project.github) && <div className={s.links}>
          {!project.placeholder && <button type="button" onClick={() => onOpen(project)} aria-haspopup="dialog">Project details <ArrowUpRight size={15}/></button>}
          {project.link && <a href={project.link} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={15}/></a>}
          {project.github && <a href={project.github} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={15}/></a>}
        </div>}
      </div>
    </article>
  )
}

export default function ProjectsIndex() {
  const [detailProject, setDetailProject] = useState(null)
  return (
    <div className={`${theme.page} ${s.page}`} data-palette="0">
      <a className={theme.skip} href="#main">Skip to content</a>
      <header className={theme.nav}>
        <Link href="/" className={theme.logo} aria-label="Vibhav home"><BrandMark className={theme.brandMark}/><span className={theme.brandName}>Vibhav Yadav</span></Link>
        <nav aria-label="Main navigation"><Link href="/projects" aria-current="page">Work</Link><Link href="/#about">About</Link><Link href="/blog">Notes</Link></nav>
        <Link href="/#contact" className={theme.navCta}>Let’s talk</Link>
      </header>
      <main id="main" className={s.main}>
        <header className={s.heading}>
          <span className={theme.eyebrow}>THE FULL INDEX / {String(ALL_PROJECTS.length).padStart(2, '0')} PROJECTS</span>
          <h1>Things built.<br/><em>Ideas taking shape.</em></h1>
          <p>Shipped products, work in progress, and what’s next. Explore the interfaces and the systems behind them.</p>
        </header>
        <div className={s.grid}>{ALL_PROJECTS.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={setDetailProject}/>)}</div>
        <footer className={s.footer}><div><span className={theme.eyebrow}>HAVE SOMETHING IN MIND?</span><h2>Let’s build what’s next.</h2></div><Link href="/#contact">Let’s talk <ArrowUpRight size={18}/></Link></footer>
      </main>
      {detailProject && createPortal(<ProjectModal key={detailProject.id} project={detailProject} onClose={() => setDetailProject(null)}/>, document.body)}
    </div>
  )
}
