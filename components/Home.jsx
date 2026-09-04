'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion'
import { ArrowMark, CodeMark, MailMark, PinMark, PlusMark } from './SiteIcons'
import ProjectModal from './ProjectModal'
import Navbar from './Navbar'
import { FEATURED_PROJECTS } from '../lib/projects'
import styles from './Home.module.css'

const ease = [0.22, 1, 0.36, 1]

const chapters = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Selected work' },
  { id: 'about', label: 'About' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
]

const training = {
  period: 'Jun — Jul 2025',
  title: 'Full-Stack & DSA Training',
  org: 'W3Grads',
  body: 'Intensive modern web development and data-structures training, applied through end-to-end products and real-world system design.',
}

const stack = [
  ['Languages', 'TypeScript, JavaScript, Python, Java, SQL'],
  ['Frontend', 'Next.js, React, Tailwind CSS, Framer Motion'],
  ['Backend', 'Node.js, Express, Firebase, REST APIs'],
  ['Data & tools', 'PostgreSQL, MongoDB, Redis, Git, Docker, AWS'],
]

const credentials = [
  { year: '2026', title: 'Oracle Data Platform Foundations', issuer: 'Oracle', image: '/Certificates/image copy 3.webp' },
  { year: '2025', title: 'Cloud Computing', issuer: 'NPTEL · IIT Kharagpur', image: '/Certificates/cloud-computing.webp' },
  { year: '2025', title: 'Python (Basic)', issuer: 'HackerRank', image: '/Certificates/python-basic.webp' },
  { year: '2025', title: 'Frontend Developer (React)', issuer: 'HackerRank', image: '/Certificates/frontend-react.webp' },
]

// useLayoutEffect on the client, useEffect on the server: the hidden state has
// to be applied before the browser paints, or above-the-fold blocks flash in
// at full opacity and then jump back down to animate.
const useArmEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

// Scroll reveals are armed from JS but performed in CSS. The markup ships
// visible, so a failed bundle, a disabled script or a paused background tab can
// never leave the page blank -- the previous framer-motion version passed
// initial={false}, which made every reveal on the page a no-op.
function useReveal(delay = 0) {
  const ref = useRef(null)

  useArmEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.dataset.reveal = 'idle'
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.reveal = 'in'
        observer.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return ref
}

function Reveal({ children, className = '', delay = 0, as: Tag = 'div', ...rest }) {
  return <Tag ref={useReveal(delay)} className={className} {...rest}>{children}</Tag>
}

function SectionHeader({ number, label, title, description, count }) {
  return (
    <Reveal className={styles.sectionHeader}>
      <div className={styles.sectionHeadingGroup}>
        <p className={styles.kicker}>{number} · {label}</p>
        <h2>{title}</h2>
      </div>
      <div className={styles.sectionHeaderMeta}>
        <p>{description}</p>
        <span>{count}</span>
      </div>
    </Reveal>
  )
}

function WorkHeader() {
  return (
    <Reveal className={styles.workHeader}>
      <div className={styles.workTitleBlock}>
        <p className={styles.kicker}>02 · Selected work</p>
        <h2>Projects I’ve learned by building.</h2>
      </div>
      <div className={styles.workManifesto}>
        <p>Three hands-on builds where I explored collaboration, developer tools, and AI-powered experiences.</p>
        <span>03 case studies</span>
      </div>
    </Reveal>
  )
}

function MagneticLink({ href, children, className = '', external = false }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 240, damping: 20, mass: 0.5 })

  const onMove = (event) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * 0.12)
    y.set((event.clientY - rect.top - rect.height / 2) * 0.16)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${styles.textLink} ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      <span>{children}</span>
      <ArrowMark size={15} />
    </motion.a>
  )
}

function ProjectIndexRow({ project, index, isOpen, onToggle, onOpenCase, revealDelay = 0 }) {
  const headId = `project-row-${project.id}`
  const panelId = `project-panel-${project.id}`

  return (
    <article ref={useReveal(revealDelay)} className={`${styles.indexRow} ${isOpen ? styles.indexRowOpen : ''}`}>
      <h3 className={styles.indexHeading}>
        <button
          id={headId}
          type="button"
          className={styles.indexHead}
          onClick={() => onToggle(project.id)}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className={styles.indexNumber}>{String(index + 1).padStart(2, '0')}</span>
          <span className={styles.indexName}>{project.name}</span>
          {/* display:contents on desktop so these sit in the header grid; they
              reflow onto their own line together on narrow screens. */}
          <span className={styles.indexMeta}>
            <span className={styles.indexLabel}>{project.label}</span>
            <span className={styles.indexYear}>{project.year} · {project.status}</span>
          </span>
          <span className={styles.indexToggle}><PlusMark size={17} open={isOpen} /></span>
        </button>
      </h3>

      {/* Always rendered, expanded with a CSS grid-row transition rather than an
          animated height: every project's copy stays in the static HTML (the
          point of the section) and the reveal never depends on JS frames. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headId}
        className={styles.indexPanel}
        inert={!isOpen}
      >
        <div className={styles.indexPanelClip}>
          <div className={styles.indexPanelInner}>
            <span className={styles.indexMedia}>
              <img src={project.image} alt={`${project.name} interface`} loading={index === 0 ? 'eager' : 'lazy'} />
            </span>
            <div className={styles.indexCopy}>
              <p className={styles.indexStack}>{project.tags.join(' · ')}</p>
              <p className={styles.indexBrief}>{project.brief ?? project.summary}</p>
              {project.highlights?.length > 0 && (
                <ul className={styles.indexHighlights}>
                  {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              )}
              <div className={styles.indexActions}>
                <button type="button" className={styles.textLink} onClick={() => onOpenCase(project)}>
                  <span>Read case study</span><ArrowMark size={15} />
                </button>
                {project.link && (
                  <a className={styles.textLink} href={project.link} target="_blank" rel="noreferrer">
                    <span>Visit live</span><ArrowMark size={15} />
                  </a>
                )}
                {project.github && (
                  <a className={styles.textLink} href={project.github} target="_blank" rel="noreferrer">
                    <span>View code</span><CodeMark size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function CredentialsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const showcaseRef = useRef(null)

  useEffect(() => {
    let frame = 0

    const updateFromScroll = () => {
      frame = 0
      const showcase = showcaseRef.current
      if (!showcase || window.innerWidth <= 760) return

      const rect = showcase.getBoundingClientRect()
      const pinnedTop = 88
      const availableTravel = Math.max(showcase.offsetHeight - window.innerHeight, 1)
      const travelled = Math.min(Math.max(pinnedTop - rect.top, 0), availableTravel)
      const stepDistance = availableTravel / (credentials.length - 1)
      const nextIndex = Math.min(
        credentials.length - 1,
        Math.floor((travelled + stepDistance * 0.08) / stepDistance),
      )

      setActiveIndex((current) => current === nextIndex ? current : nextIndex)
    }

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateFromScroll)
    }

    updateFromScroll()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  const active = credentials[activeIndex]

  return (
    <div ref={showcaseRef} className={styles.credentialsShowcase}>
      <div className={styles.credentialsStage}>
        <SectionHeader number="04" label="Credentials" title="Proof, made visible." description="Selected certifications that support the systems, tools, and decisions shown above." count="04 certificates" />
        <div className={styles.credentialsBody}>
          <div className={styles.certificatePreview} aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.a
                key={active.image}
                href={active.image}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${active.title} certificate`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease }}
              >
                <img src={active.image} alt={`${active.title} certificate issued by ${active.issuer}`} />
                <span>Open certificate <ArrowMark size={15} /></span>
              </motion.a>
            </AnimatePresence>
          </div>

          <div className={styles.credentialList}>
            {credentials.map((credential, index) => (
              <Reveal
                as="button"
                delay={index * 80}
                type="button"
                className={`${styles.credentialRow} ${index === activeIndex ? styles.credentialRowActive : ''}`}
                key={credential.title}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
              >
                <span className={styles.credentialIndex}>{String(index + 1).padStart(2, '0')}</span>
                <strong>{credential.title}</strong>
                <p>{credential.issuer}</p>
                <time>{credential.year}</time>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

function DotMatrixSignature() {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    const pointer = { x: -10000, y: -10000 }
    let points = []
    let frame = 0
    let visible = true

    const sample = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.min(Math.max(rect.width, 1), 1600)
      const height = Math.min(Math.max(rect.height, 1), 440)
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const source = document.createElement('canvas')
      source.width = Math.round(width)
      source.height = Math.round(height)
      const sourceContext = source.getContext('2d')
      sourceContext.fillStyle = '#fff'
      sourceContext.textAlign = 'center'
      sourceContext.textBaseline = 'alphabetic'
      const verticalInset = Math.max(8, height * 0.03)
      let size = Math.min(380, width / 3.45, height - verticalInset * 2)
      sourceContext.font = `500 ${size}px "Space Grotesk", sans-serif`
      if ('letterSpacing' in sourceContext) sourceContext.letterSpacing = '-0.065em'
      const metrics = sourceContext.measureText('VIBHAV')
      const glyphHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      const baseline = (height - glyphHeight) / 2 + metrics.actualBoundingBoxAscent
      sourceContext.fillText('VIBHAV', width / 2, baseline)

      const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data
      const step = 5
      points = []
      for (let y = 0; y < source.height; y += step) {
        for (let x = 0; x < source.width; x += step) {
          if (pixels[(y * source.width + x) * 4 + 3] > 120) {
            const homeX = x
            const homeY = y
            points.push({ homeX, homeY, x: homeX, y: homeY })
          }
        }
      }
    }

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      context.clearRect(0, 0, width, height)
      context.fillStyle = '#f4f0e9'
      const influence = 92

      points.forEach((point) => {
        let targetX = point.homeX
        let targetY = point.homeY
        if (!reduceMotion) {
          const dx = point.homeX - pointer.x
          const dy = point.homeY - pointer.y
          const distance = Math.hypot(dx, dy) || 1
          if (distance < influence) {
            const force = (1 - distance / influence) * 46
            targetX += (dx / distance) * force
            targetY += (dy / distance) * force
          }
          point.x += (targetX - point.x) * 0.16
          point.y += (targetY - point.y) * 0.16
        }
        context.beginPath()
        context.arc(reduceMotion ? targetX : point.x, reduceMotion ? targetY : point.y, 1.35, 0, Math.PI * 2)
        context.fill()
      })

      if (visible && !reduceMotion) frame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onPointerLeave = () => { pointer.x = -10000; pointer.y = -10000 }
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      sample()
      draw()
    })
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible) draw()
    }, { rootMargin: '120px' })

    sample()
    draw()
    resize.observe(canvas)
    observer.observe(canvas)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)

    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      observer.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reduceMotion])

  return <canvas ref={canvasRef} className={styles.dotMatrix} role="img" aria-label="Vibhav" />
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 })
  const [active, setActive] = useState('home')
  const [selected, setSelected] = useState(null)
  // First project opens by default so a screenshot is on screen without
  // anyone having to interact; clicking an open row closes it again.
  const [openProject, setOpenProject] = useState(FEATURED_PROJECTS[0]?.id ?? null)

  useEffect(() => {
    const targets = chapters.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.2, 0.5] })
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === active))

  return (
    <div className={`${styles.homePage} editorial-page`}>
      <motion.div className={styles.scrollProgress} style={{ scaleX: progress }} aria-hidden="true" />
      <Navbar chapters={chapters} />

      <aside className={styles.chapterRail} aria-label="Page progress">
        <span className={styles.railNumber}>{String(activeIndex + 1).padStart(2, '0')}</span><span className={styles.railDot} /><span className={styles.railLabel}>{chapters[activeIndex]?.label}</span>
      </aside>

      <main>
        {/* The hero entrance is pure CSS (see .hero in Home.module.css): keyframes
            keep running while the tab is backgrounded, so the fold can never be
            left mid-animation and invisible. */}
        <section id="home" className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Full-stack developer · Based in India</p>
            <h1 aria-label="I enjoy building thoughtful digital products.">
              {['I enjoy building', 'thoughtful digital', 'products.'].map((line) => (
                <span className={styles.heroLine} key={line}><span>{line}</span></span>
              ))}
            </h1>
            <p className={styles.heroIntro}>I bring ideas to life through useful web experiences, clean code, and close attention to the details that make a product feel right.</p>
            <p className={styles.availability}><span className={styles.availabilityDot} aria-hidden="true" /> Available for new opportunities</p>
            <div className={styles.heroLinks}><MagneticLink href="#work">View my work</MagneticLink><MagneticLink href="#contact">Get in touch</MagneticLink></div>
          </div>
          <div className={styles.portraitFrame}>
            <img className={styles.portraitLight} src="/profile-light.webp" alt="Vibhav Yadav" /><img className={styles.portraitDark} src="/profile-dark.webp" alt="" aria-hidden="true" /><span className={styles.portraitWash} aria-hidden="true" />
          </div>
          <span className={styles.heroSideNote}>Scroll to explore<span className={styles.heroSideRule} aria-hidden="true" /></span>
        </section>

        <section id="work" className={styles.work}>
          <WorkHeader />
          <div className={styles.projectIndex}>
            {FEATURED_PROJECTS.map((project, index) => (
              <ProjectIndexRow
                key={project.id}
                revealDelay={index * 90}
                project={project}
                index={index}
                isOpen={openProject === project.id}
                onToggle={(id) => setOpenProject((current) => current === id ? null : id)}
                onOpenCase={setSelected}
              />
            ))}
          </div>
        </section>

        <section id="about" className={styles.about}>
          <Reveal className={styles.aboutPortrait}><img src="/profile-light.webp" alt="Vibhav Yadav in profile" loading="lazy" /></Reveal>
          <Reveal className={styles.aboutCopy} delay={0.05}><p className={styles.kicker}>03 · About</p><h2>I care about the invisible details.</h2><p><span className={styles.dropCap}>I</span>’m Vibhav, a full-stack developer and Computer Science Engineering student. I enjoy the point where architecture, interface craft, and real user needs become one coherent product.</p><p>My rule is simple: make complexity earn its place. That means clearer systems, faster interactions, and software people can trust without reading a manual.</p><MagneticLink href="/resume/general%20cv.pdf" external>Read my resume</MagneticLink></Reveal>
          <Reveal className={styles.training} delay={0.1}><p className={styles.kicker}>Training</p><span className={styles.detailDate}>{training.period}</span><h3>{training.title}</h3><strong>{training.org}</strong><p>{training.body}</p></Reveal>
          <Reveal className={styles.stack} delay={0.14}><p className={styles.kicker}>Technical stack</p><div>{stack.map(([label, value]) => <div className={styles.stackRow} key={label}><span>{label}</span><p>{value}</p></div>)}</div></Reveal>
        </section>

        <section id="credentials" className={styles.credentials}>
          <CredentialsShowcase />
        </section>

        <section id="contact" className={styles.contact}>
          <Reveal className={styles.contactStatement}><p className={styles.kicker}>05 · Contact</p><h2>Let’s build something<br />meaningful together.</h2><MagneticLink href="mailto:vibhavydm@gmail.com">Start a conversation</MagneticLink></Reveal>
          <Reveal className={styles.contactDetails} delay={0.08}><a href="mailto:vibhavydm@gmail.com"><MailMark size={17} /> vibhavydm@gmail.com</a><p><PinMark size={17} /> India</p><span>Typically replies within 24 hours</span></Reveal>
          <div className={styles.dotMatrixWrap}>
            <DotMatrixSignature />
          </div>
          <footer className={styles.footer}><span>© {new Date().getFullYear()} Vibhav Yadav</span><div><a href="https://github.com/Vibhav-y" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/vibhav-yadav/" target="_blank" rel="noreferrer">LinkedIn</a><Link href="/blog">Journal</Link></div></footer>
        </section>
      </main>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={() => setSelected(null)} immediate />}
      </AnimatePresence>
    </div>
  )
}
