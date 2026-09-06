'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowDown, ArrowUp, Shuffle, Copy, Check, GitBranch, Sparkles, Code2, Braces, MousePointer2, Coffee, MoveUpRight } from 'lucide-react'
import { FEATURED_PROJECTS } from '../lib/projects'
import s from './Playground.module.css'
import DotMatrixSignature from './DotMatrixSignature'
import BrandMark from './BrandMark'
import ToolOrbit from './ToolOrbit'

const tools = { Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], Backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Supabase'], 'Beyond the browser': ['Git', 'Electron', 'Python', 'Java', 'Data structures'] }

const certs = [['Oracle', 'Data Platform Foundations', 'image copy 3.webp'], ['NPTEL', 'Cloud Computing', 'image.webp'], ['HackerRank', 'Python (Basic)', 'image copy.webp'], ['HackerRank', 'Frontend Developer (React)', 'image copy 2.webp']]

export default function Playground() {
  const [activeProject, setActiveProject] = useState(0)
  const selectedProject = FEATURED_PROJECTS[activeProject]
  const [category, setCategory] = useState('Frontend')
  const [palette, setPalette] = useState(0)
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
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
    <div className={s.page} data-palette={palette}>
      <a className={s.skip} href="#main">Skip to content</a>
      <header className={s.nav}>
        <a href="#" className={s.logo} aria-label="Vibhav home"><BrandMark className={s.brandMark}/><span className={s.brandName}>Vibhav Yadav</span></a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><Link href="/blog">Notes <span>↗</span></Link></nav>
        <a href="#contact" className={s.navCta}>Let’s talk <ArrowUpRight size={17}/></a>
      </header>
      <main id="main">
        <section className={s.hero}>
          <div className={s.heroCopy}>
            <h1>A little curiosity.<br/>A lot of <span className={s.serious}>making.</span></h1>
            <p>I build tools, workspaces, and the systems behind them.<br className={s.desktopBreak}/> Useful by design. A little unexpected by choice.</p>
            <div className={s.heroActions}><a href="#work" className={s.button}>Explore my work <ArrowDown size={19}/></a><a href="/resume/general%20cv.pdf" target="_blank" rel="noreferrer" className={s.textLink}>View résumé <ArrowUpRight size={18}/></a></div>
            <div className={s.heroFoot}><span>BASED IN INDIA ↗</span><span>PRODUCT THINKING · ENGINEERING CRAFT</span></div>
          </div>
          <div className={s.collage}>
            <div className={s.portrait}><img src="/profile-charcoal-v3.webp" alt="Illustrated portrait of Vibhav Yadav" fetchPriority="high"/></div>
            
          </div>
        </section>
        <div className={s.disciplineStrip}><span>FROM THE INTERFACE TO THE INFRASTRUCTURE</span><div><span>Product interfaces</span><i/><span>Reliable systems</span><i/><span>Considered details</span></div></div>
        <section id="work" className={`${s.section} ${s.workSection}`}>
          <div className={s.sectionHead}><div><span className={s.eyebrow}>01 / SELECTED WORK</span><h2>Made to be <span className={s.purpleText}>used.</span></h2></div><Link href="/projects" className={s.textLink}>All the details <ArrowUpRight size={20}/></Link></div>
          <div className={s.projectSelector} role="tablist" aria-label="Featured projects">{FEATURED_PROJECTS.map((p, i) => <button key={p.id} role="tab" id={`project-tab-${p.id}`} aria-controls="project-showcase" aria-selected={activeProject === i} tabIndex={activeProject === i ? 0 : -1} onClick={() => setActiveProject(i)} onKeyDown={e => { let next; if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % FEATURED_PROJECTS.length; if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i + FEATURED_PROJECTS.length - 1) % FEATURED_PROJECTS.length; if (e.key === 'Home') next = 0; if (e.key === 'End') next = FEATURED_PROJECTS.length - 1; if (next !== undefined) { e.preventDefault(); setActiveProject(next); document.getElementById(`project-tab-${FEATURED_PROJECTS[next].id}`).focus() } }}><span>0{i + 1}</span>{p.name}<ArrowUpRight size={18}/></button>)}</div>
          <div className={s.showcase} id="project-showcase" role="tabpanel" aria-labelledby={`project-tab-${selectedProject.id}`}>
            <div className={s.showcasePreview}>
              <div className={s.previewBar}><span>{selectedProject.label}</span><span>{selectedProject.status === 'Live' ? '● LIVE' : '◌ IN DEVELOPMENT'}</span></div>
              <Link href="/projects" aria-label={`Read about ${selectedProject.name}`}><img key={selectedProject.image} src={selectedProject.image} alt={`${selectedProject.name} application preview`} loading="lazy"/></Link>
            </div>
            <div className={s.showcaseCopy} key={selectedProject.id}>
              <span className={s.eyebrow}>SELECTED PROJECT / 0{activeProject + 1}</span><h3>{selectedProject.name}</h3><p>{selectedProject.summary}</p>
              <ul>{selectedProject.features.slice(0, 3).map(feature => <li key={feature}>{feature}</li>)}</ul>
              <div className={s.showcaseTags}>{selectedProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className={s.showcaseLinks}>{selectedProject.link && <a href={selectedProject.link} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={17}/></a>}{selectedProject.github && <a href={selectedProject.github} target="_blank" rel="noreferrer">Source <ArrowUpRight size={17}/></a>}<Link href="/projects">Project details <ArrowUpRight size={17}/></Link></div>
            </div>
          </div>
          <div className={s.systemLens}><div><span className={s.eyebrow}>UNDER THE SURFACE</span><p>What makes {selectedProject.name} work.</p></div><div>{selectedProject.highlights.map((highlight, i) => <details key={selectedProject.id + i}><summary><span>0{i + 1}</span>{['Foundation', 'Behavior', 'Detail'][i]}<span>+</span></summary><p>{highlight}</p></details>)}</div></div>
        </section>
        <section id="about" className={`${s.section} ${s.about}`}>
          <div className={s.aboutIntro}><span className={s.eyebrow}>02 / PERSPECTIVE</span><h2>Curiosity is<br/>the <span className={s.purpleText}>constant.</span></h2><p>I’m a Computer Science Engineering student at Lovely Professional University. I like robust backends, interfaces with personality, and understanding how things work under the hood.</p><p>My favorite part? That moment when a messy idea becomes something you can actually use.</p><a href="https://github.com/Vibhav-y" target="_blank" rel="noreferrer" className={s.textLink}><GitBranch size={19}/> Find me in the commits <ArrowUpRight size={18}/></a></div>
          <div className={s.noteBoard}><article className={s.note}><span className={s.tape}/><Coffee size={28}/><h3>A few operating principles</h3><p>01. Make it work. Then make it feel good.</p><p>02. Stay a beginner at something.</p><p>03. Small details are a big deal.</p><span className={s.noteSignature}>always a work in progress ↗</span></article><div className={s.miniNote}><Braces size={26}/><span>Systems thinker.<br/>Pixel enjoyer.</span><span aria-hidden="true">✦</span></div></div>
          <div className={s.process}><span className={s.eyebrow}>HOW I APPROACH A BUILD</span><div className={s.processSteps}>{['Understand', 'Build', 'Refine'].map((step, i) => <button key={step} aria-pressed={activeStep === i} onClick={() => setActiveStep(i)}><span>0{i + 1}</span>{step}</button>)}</div><div key={activeStep} className={s.processBody} aria-live="polite"><span className={s.processNumber}>0{activeStep + 1}</span><h3>{['Start with the problem.', 'Make the system tangible.', 'Care for the last mile.'][activeStep]}</h3><p>{['Map the user journey, name the constraints, and decide what a useful first version should do.', 'Connect the interface, data, and business logic in a working slice. Test the assumptions with something real.', 'Review the edge cases, performance, and interaction details. Keep simplifying until the experience feels natural.'][activeStep]}</p></div></div>
          <div className={s.colorBar}><span>A small personal touch. <b>Accent preference</b></span><div aria-label="Page color mood">{['Citron', 'Apricot', 'Sky'].map((m,i) => <button key={m} aria-label={`${m} color mood`} aria-pressed={palette === i} onClick={() => setPalette(i)} style={{background: ['#c4cba5','#c9ad9e','#aabdc7'][i]}}>{palette === i && <Check size={17}/>}</button>)}</div></div>
        </section>
        <section id="skills" className={`${s.section} ${s.lab}`}>
          <div className={s.sectionHead}><div><span className={s.eyebrow}>03 / TOOLKIT</span><h2>A few tools.<br/><span className={s.purpleText}>Many possibilities.</span></h2></div><span className={s.smallNote}>Explore the technologies behind the work.</span></div>
          <div className={s.labGrid}><ToolOrbit />
          </div>
        </section>
        <section id="experience" className={s.section}><div className={s.sectionHead}><div><span className={s.eyebrow}>04 / EXPERIENCE & LEARNING</span><h2>Learning. Doing. <span className={s.purpleText}>Repeating.</span></h2></div></div><div className={s.journey}><div><span className={s.eyebrow}>JUN — JUL 2025</span><h3>Full-Stack & DSA Training</h3><span className={s.trainingBadge}>↗ W3Grads</span></div><p>Built end-to-end applications with React, Node.js, Express, and MongoDB. Strengthened the foundations in algorithms, databases, and networks — with 5-star HackerRank ratings in Java and Python along the way.</p></div><div className={s.certGrid}>{certs.map(([issuer,title,file], i) => <a key={title} href={`/Certificates/${encodeURIComponent(file)}`} target="_blank" rel="noreferrer"><span className={s.certIcon}>{['✳','✦','⌘','↗'][i]}</span><span><small>{issuer}</small><b>{title}</b></span><ArrowUpRight size={18}/></a>)}</div></section>
        <section id="now" className={`${s.section} ${s.now}`}><span className={s.nowIcon} aria-hidden="true">↳</span><div><span className={s.eyebrow}>ON MY WORKBENCH</span><h3>GitTool, AI systems, and the next rabbit hole.</h3><p>Exploring RAG pipelines and retrieval quality, building better developer tools, and keeping the DSA muscles moving.</p></div><Link href="/blog" className={s.textLink}>Read my notes <MoveUpRight size={18}/></Link></section>
        <section id="contact" className={s.contact}><div className={s.contactTop}><span className={s.eyebrow}>HAVE SOMETHING IN MIND?</span><span aria-hidden="true">✳</span></div><h2>What are you<br/><em>working on?</em></h2><div className={s.contactActions}><a href="mailto:vibhavydm@gmail.com" className={s.button}>Say hello <ArrowUpRight size={20}/></a><button onClick={copyEmail} className={s.copyButton}>{copied ? <Check size={17}/> : <Copy size={17}/>}<span aria-live="polite">{copied ? 'Email copied!' : 'vibhavydm@gmail.com'}</span></button></div>{copyError && <p role="status">Copy isn’t available here. Email me at vibhavydm@gmail.com.</p>}<footer className={s.footer}><span>© {new Date().getFullYear()} Vibhav Yadav<br/><small>A little logic. A lot of heart.</small></span><div><a href="https://github.com/Vibhav-y" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/vibhav-yadav/" target="_blank" rel="noreferrer">LinkedIn ↗</a><Link href="/blog">Notes ↗</Link></div><a href="#" className={s.backTop} aria-label="Back to top"><ArrowUp size={20}/></a></footer><div className={s.dotMatrixWrap}><DotMatrixSignature /></div></section>
      </main>
    </div>
  )
}
