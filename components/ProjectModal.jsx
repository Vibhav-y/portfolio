'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import s from './ProjectModal.module.css'

export default function ProjectModal({ project, onClose }) {
  const dialog = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current.showModal()
    return () => { document.body.style.overflow = overflow; previous?.focus?.() }
  }, [])
  return <dialog ref={dialog} className={s.dialog} aria-labelledby="project-modal-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <header className={s.header}><span>PROJECT / {project.label}</span><button onClick={onClose} aria-label="Close project details" autoFocus><X size={20}/></button></header>
    <div className={s.content}>
      <div className={s.visual}><img src={project.image} alt={`${project.name} application preview`}/><div className={s.meta}><span>{project.year}</span><span>{project.status}</span></div><div className={s.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className={s.links}>{project.link && <a href={project.link} target="_blank" rel="noreferrer">Visit project</a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer">Source code</a>}</div></div>
      <div className={s.story}><h2 id="project-modal-title">{project.name}</h2><p className={s.summary}>{project.summary}</p><section><h3>Overview</h3><p>{project.description}</p></section>{project.features?.length > 0 && <section><h3>Key features</h3><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>}{project.highlights?.length > 0 && <section><h3>Technical highlights</h3><ul>{project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></section>}</div>
    </div>
  </dialog>
}
