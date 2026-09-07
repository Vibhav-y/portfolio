'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'
import ProjectModal from './ProjectModal'
import { ArrowDown, ArrowUp, Shuffle, Copy, Check, GitBranch, Sparkles, Code2, Braces, MousePointer2, Coffee, MoveUpRight } from 'lucide-react'
import { FEATURED_PROJECTS } from '../lib/projects'
import s from './Playground.module.css'
import DotMatrixSignature from './DotMatrixSignature'
import BrandMark from './BrandMark'
import ToolOrbit from './ToolOrbit'
import CertificateFolder from './CertificateFolder'
import HeroAtmosphere from './HeroAtmosphere'

const tools = { Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], Backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Supabase'], 'Beyond the browser': ['Git', 'Electron', 'Python', 'Java', 'Data structures'] }

const certs = [['Oracle', 'Data Platform Foundations', 'image copy 3.webp'], ['NPTEL', 'Cloud Computing', 'image.webp'], ['HackerRank', 'Python (Basic)', 'image copy.webp'], ['HackerRank', 'Frontend Developer (React)', 'image copy 2.webp']]

export default function Playground() {
  const [expandedProjects, setExpandedProjects] = useState(() => new Set([0]))
  const projectHeaders = useRef([])
  const manuallyToggledProjects = useRef(new Set())
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const entering = entries.filter(entry => entry.isIntersecting).map(entry => Number(entry.target.dataset.projectIndex)).filter(index => !manuallyToggledProjects.current.has(index))
      if (!entering.length) return
      setExpandedProjects(previous => {
        if (entering.every(index => previous.has(index))) return previous
        return new Set([...previous, ...entering])
      })
    }, { rootMargin: '0px 0px -25% 0px', threshold: 0.6 })
    projectHeaders.current.forEach(header => { if (header) observer.observe(header) })
    return () => observer.disconnect()
  }, [])
  function toggleProject(index) {
    manuallyToggledProjects.current.add(index)
    setExpandedProjects(previous => {
      const next = new Set(previous)
      if (next.has(index)) next.delete(index); else next.add(index)
      return next
    })
  }
  const [detailProject, setDetailProject] = useState(null)
  const [category, setCategory] = useState('Frontend')
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('vibhavydm@gmail.com')
      setCopied(true); setCopyError(false)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2500)
    } catch { setCopyError(true) }
  }
  return (
    <div className={s.page} data-palette="0">
      <a className={s.skip} href="#main">Skip to content</a>
      <header className={s.nav}>
        <a href="#" className={s.logo} aria-label="Vibhav home"><BrandMark className={s.brandMark}/><span className={s.brandName}>Vibhav Yadav</span></a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><Link href="/blog">Notes</Link></nav>
        <a href="#contact" className={s.navCta}>Let’s talk</a>
      </header>
      <main id="main">
        <section className={s.atmosphereHero} aria-labelledby="hero-title">
          <HeroAtmosphere />
          <div className={s.atmosphereCopy}>
            <span className={s.atmosphereIntro}>VIBHAV YADAV <span>— DEVELOPER & BUILDER</span></span>
            <h1 id="hero-title">Full-stack.<br/><em>Fully considered.</em></h1>
            <p>I build thoughtful interfaces and the systems behind them. From real-time workspaces to tools that make a developer’s day easier.</p>
            <div className={s.atmosphereActions}><a href="#work">Explore my work</a><a href="#contact">Let’s talk</a></div>
          </div>
          <a href="#about" className={s.atmospherePortrait} aria-label="More about Vibhav Yadav"><img src="/profile-glacier-v4.png" alt="Illustrated portrait of Vibhav Yadav" fetchPriority="high"/><span>THE PERSON BEHIND THE WORK</span><svg className={s.portraitSeal} viewBox="0 0 120 120" aria-hidden="true"><defs><path id="portrait-seal-ring" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs><g className={s.portraitSealRing}><text><textPath href="#portrait-seal-ring" textLength="282.7" lengthAdjust="spacing">VIBHAV YADAV · FULL-STACK · </textPath></text></g><path className={s.portraitSealStar} d="M60 50 Q62 58 70 60 Q62 62 60 70 Q58 62 50 60 Q58 58 60 50Z"/></svg></a>
          <div className={s.atmosphereFoot}><span>BASED IN INDIA / BUILDING FOR THE WEB</span><a href="/resume/general%20cv.pdf" target="_blank" rel="noreferrer">View résumé</a></div>
        </section>
        <div className={s.disciplineStrip}><span>FROM THE INTERFACE TO THE INFRASTRUCTURE</span><div><span>Product interfaces</span><i/><span>Reliable systems</span><i/><span>Considered details</span></div></div>
        <section id="about" className={`${s.section} ${s.about}`}>
          <div className={s.aboutIntro}><span className={s.eyebrow}>01 / PERSPECTIVE</span><h2>Curiosity is<br/>the <span className={s.purpleText}>constant.</span></h2><p>I’m a Computer Science Engineering student at Lovely Professional University. I like robust backends, interfaces with personality, and understanding how things work under the hood.</p><p>My favorite part? That moment when a messy idea becomes something you can actually use.</p><a href="https://github.com/Vibhav-y" target="_blank" rel="noreferrer" className={s.textLink}><GitBranch size={19}/> Find me in the commits</a></div>
          <div className={s.noteBoard}><article className={s.note}><span className={s.tape}/><Coffee size={28}/><h3>A few operating principles</h3><p>01. Make it work. Then make it feel good.</p><p>02. Stay a beginner at something.</p><p>03. Small details are a big deal.</p><span className={s.noteSignature}>always a work in progress</span></article><div className={s.miniNote}><Braces size={26}/><span>Systems thinker.<br/>Pixel enjoyer.</span><span aria-hidden="true">✦</span></div></div>
          <div className={s.process}><span className={s.eyebrow}>HOW I APPROACH A BUILD</span><ol className={s.buildSteps}>{[
            ['Understand', 'Start with the problem.', 'Map the user journey, name the constraints, and decide what a useful first version should do.'],
            ['Build', 'Make the system tangible.', 'Connect the interface, data, and business logic in a working slice. Test the assumptions with something real.'],
            ['Refine', 'Care for the last mile.', 'Review the edge cases, performance, and interaction details. Keep simplifying until the experience feels natural.'],
          ].map(([label, title, description], i) => <li key={label}><div className={s.buildStepHeader}><span className={s.buildStepNumber} aria-hidden="true">0{i + 1}</span><span className={s.buildStepLabel}>{label}</span></div><h3>{title}</h3><p>{description}</p></li>)}</ol></div>
        </section>
        <section id="work" className={`${s.section} ${s.projectIndex}`}>
          <div className={s.sectionHead}><div><span className={s.eyebrow}>02 / SELECTED WORK</span><h2>Things built<br/><span className={s.purpleText}>along the way.</span></h2></div><Link href="/projects" className={s.textLink}>All projects</Link></div>
          <div className={s.indexRows}>{FEATURED_PROJECTS.map((project, i) => <article key={project.id} className={s.indexRow} data-open={expandedProjects.has(i)}>
            <button ref={element => { projectHeaders.current[i] = element }} data-project-index={i} className={s.indexTrigger} aria-expanded={expandedProjects.has(i)} aria-controls={`index-panel-${project.id}`} onClick={() => toggleProject(i)}>
              <span className={s.indexNumber}>0{i + 1}</span><span className={s.indexName}>{project.name}</span><span className={s.indexCategory}>{project.label}</span><span className={s.indexToggle} aria-hidden="true">{expandedProjects.has(i) ? '−' : '+'}</span>
            </button>
            <div className={s.indexReveal} id={`index-panel-${project.id}`} inert={!expandedProjects.has(i)}><div className={s.indexRevealInner}>
              <div className={s.indexStory}><span className={s.eyebrow}>{project.status === 'Live' ? 'LIVE PROJECT' : 'IN DEVELOPMENT'}</span><p>{project.summary}</p><ul className={s.indexFeatures}>{project.features.slice(0, 3).map(feature => <li key={feature}>{feature}</li>)}</ul><div className={s.indexTags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className={s.indexLinks}>{project.link && <a href={project.link} target="_blank" rel="noreferrer">Visit project</a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer">Source code</a>}<button type="button" onClick={() => setDetailProject(project)}>Project details</button></div></div>
              <button type="button" onClick={() => setDetailProject(project)} className={s.indexImage} aria-label={`Read about ${project.name}`}><img src={project.image} alt={`${project.name} application preview`} loading="lazy"/></button>
              <div className={s.indexNotes}>{project.highlights.map((highlight,j) => <p key={highlight}><span>0{j + 1}</span>{highlight}</p>)}</div>
            </div></div>
          </article>)}</div>
        </section>
        <section id="skills" className={`${s.section} ${s.lab}`}>
          <div className={s.sectionHead}><div><span className={s.eyebrow}>03 / TOOLKIT</span><h2>A few tools.<br/><span className={s.purpleText}>Many possibilities.</span></h2></div><span className={s.smallNote}>Explore the technologies behind the work.</span></div>
          <div className={s.labGrid}><ToolOrbit />
          </div>
        </section>
        <section id="experience" className={s.section}><div className={s.sectionHead}><div><span className={s.eyebrow}>04 / EXPERIENCE & LEARNING</span><h2>Learning. Doing. <span className={s.purpleText}>Repeating.</span></h2></div></div><div className={s.journey}><div><span className={s.eyebrow}>JUN — JUL 2025</span><h3>Full-Stack & DSA Training</h3><span className={s.trainingBadge}>W3Grads</span></div><p>Built end-to-end applications with React, Node.js, Express, and MongoDB. Strengthened the foundations in algorithms, databases, and networks — with 5-star HackerRank ratings in Java and Python along the way.</p></div><CertificateFolder certificates={certs}/></section>
        <hr className={s.sectionDivider} aria-hidden="true"/><section id="now" className={`${s.section} ${s.now}`}><span className={s.nowIcon} aria-hidden="true">↳</span><div><span className={s.eyebrow}>ON MY WORKBENCH</span><h3>GitTool, AI systems, and the next rabbit hole.</h3><p>Exploring RAG pipelines and retrieval quality, building better developer tools, and keeping the DSA muscles moving.</p></div><Link href="/blog" className={s.textLink}>Read my notes <MoveUpRight size={18}/></Link></section>
        <section id="contact" className={s.contact}><div className={s.contactTop}><span className={s.eyebrow}>HAVE SOMETHING IN MIND?</span><span aria-hidden="true">✳</span></div><h2>What are you<br/><em>working on?</em></h2><div className={s.contactActions}><a href="mailto:vibhavydm@gmail.com" className={s.button}>Say hello</a><button onClick={copyEmail} className={s.copyButton}>{copied ? <Check size={17}/> : <Copy size={17}/>}<span aria-live="polite">{copied ? 'Email copied!' : 'vibhavydm@gmail.com'}</span></button></div>{copyError && <p role="status">Copy isn’t available here. Email me at vibhavydm@gmail.com.</p>}<div className={s.dotMatrixWrap}><DotMatrixSignature /></div><footer className={s.footer}><span>© {new Date().getFullYear()} Vibhav Yadav<br/><small>A little logic. A lot of heart.</small></span><div><a href="https://github.com/Vibhav-y" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/vibhav-yadav/" target="_blank" rel="noreferrer">LinkedIn</a><Link href="/blog">Notes</Link></div><a href="#" className={s.backTop} aria-label="Back to top"><ArrowUp size={20}/></a></footer></section>
      </main>
      {typeof document !== 'undefined' && createPortal(<AnimatePresence>{detailProject && <ProjectModal key={detailProject.id} project={detailProject} onClose={() => setDetailProject(null)}/>}</AnimatePresence>, document.body)}
    </div>
  )
}
